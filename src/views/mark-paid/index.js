// material-ui
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { AlertUser, FormikInput, Input, RouteBtn } from 'custom-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { axiosInstance } from 'services';
import * as yup from 'yup';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

// Icons
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { Form, Formik } from 'formik';
import { getDate } from 'hooks';

// ==============================|| Mark paid orders ||============================== //

const MarkPaid = () => {
    const { id, item } = useParams();
    const [currentInvoice, setCurrentInvoice] = useState(null);
    const [currentInvocieOrders, setCurrentInvoiceOrders] = useState(null);
    const [isLoading, setLoading] = useState({ open: false, message: '', for: 'loading' });
    const [statusSnackbar, setStatusSnack] = useState({ open: false, message: '', type: 'error' });
    const [countProduct, setCountProduct] = useState(null);

    const productPath = item.split('&');
    useEffect(() => {
        handleSnackLoadingOpen();
        (async () => {
            try {
                const currentInvoiceData = await axiosInstance.get(id);
                const currentInvocieOrdersData = await axiosInstance.get(`${id}/orders`);
                setCurrentInvoice(currentInvoiceData.data.data);
                setCurrentInvoiceOrders(currentInvocieOrdersData.data.data);
            } catch (err) {
                handleSnackStatusOpen(err.message, 'error');
            } finally {
                handleSnackLoadingClose();
            }
        })();
    }, []);
    if (currentInvocieOrders && !countProduct) {
        const {
            debt: invoiceDebt,
            price: invoicePrice,
            sold_amount: invoiceSold_amount,
            remainder_amount: invoiceRemainder_amount,
            returned_amount: invoiceReturned_amount,
        } = currentInvocieOrders?.[productPath[0]];
        setCountProduct({
            price: invoicePrice,
            sold: invoiceSold_amount,
            debt: invoiceDebt,
            remained: invoiceRemainder_amount,
            returned: invoiceReturned_amount,
        });
    }

    const yupValidateShchema = yup.object().shape({
        amount: yup
            .number()
            .typeError('*Enter number!')
            .positive('*Enter positive number')
            .integer('*Enter integer')
            .lessThan(
                currentInvocieOrders?.[productPath[0]]?.remainder_amount + 1,
                `${currentInvocieOrders?.[productPath[0]]?.remainder_amount} is maximum amount`
            ),
    });

    const handleSubmit = (evt) => {
        console.log(evt);
    };

    const handleInputChange = (evt) => {
        const countedDebt =
            (currentInvocieOrders?.[productPath[0]]?.remainder_amount - +evt.target.value) * currentInvocieOrders?.[productPath[0]]?.price;
        setCountProduct({
            price: currentInvocieOrders?.[productPath[0]]?.price,
            sold: currentInvocieOrders?.[productPath[0]]?.sold_amount + +evt.target.value,
            remained: currentInvocieOrders?.[productPath[0]]?.remainder_amount - +evt.target.value,
            returned: currentInvocieOrders?.[productPath[0]]?.returned_amount,
            debt: countedDebt,
        });
    };
    const handleKeyPress = (evt) => {
        console.log(evt.keyCode);
        if (evt.keyCode >= 32 && evt.keyCode <= 42) {
            evt.preventDefault();
        } else if (evt.keyCode >= 65 && evt.keyCode <= 90) {
            evt.preventDefault();
        } else if (evt.keyCode >= 105 && evt.keyCode <= 222) {
            evt.preventDefault();
        } else if (+(evt.target.value + evt.key) > +currentInvocieOrders?.[productPath[0]]?.remainder_amount) {
            evt.preventDefault();
        }
    };

    // Status Snackbar
    const handleSnackStatusClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStatusSnack({ open: false });
    };
    const handleSnackStatusOpen = (message = '', type = 'error') => {
        setStatusSnack({ open: true, message: message, type: type });
    };

    // Loading Snackbar

    const handleSnackLoadingClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoading({ open: false, message: '', for: 'loading' });
    };
    const handleSnackLoadingOpen = () => {
        setLoading({ open: true, message: '', for: 'loading' });
    };

    return (
        <>
            <AlertUser alertInfo={statusSnackbar} onClose={handleSnackStatusClose} />
            <AlertUser onClose={handleSnackLoadingClose} loading={isLoading} />

            <MainCard
                title={
                    currentInvocieOrders ? (
                        <Typography variant="h3">Pay for "{currentInvocieOrders?.[productPath[0]]?.product_name}"</Typography>
                    ) : (
                        <Skeleton variant="text" component="h4" animation="wave" width="50%" />
                    )
                }
            >
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Card
                            raised
                            sx={{
                                bgcolor: '#e3f2fd',
                                boxShadow: 1,
                            }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <RouteBtn
                                            to={`/utils/util-invoices/${id}`}
                                            variant="text"
                                            startIcon={<KeyboardArrowLeftRoundedIcon />}
                                        >
                                            Go back
                                        </RouteBtn>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card
                            raised
                            sx={{
                                bgcolor: '#e3f2fd',
                                boxShadow: 1,
                            }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Grid container spacing={2} direction="column">
                                    <Grid item>
                                        <Card
                                            sx={{
                                                bgcolor: '#F9FAFE',
                                                borderEndEndRadius: 0,
                                                borderEndStartRadius: 0,
                                            }}
                                        >
                                            <CardMedia>
                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Name</TableCell>
                                                                <TableCell align="right">Ordered date</TableCell>
                                                                <TableCell align="right">Last order</TableCell>
                                                                <TableCell align="right">Price</TableCell>
                                                                <TableCell align="right">Remained</TableCell>
                                                                <TableCell align="right">Sold</TableCell>
                                                                <TableCell align="right">Returned</TableCell>
                                                                <TableCell align="right">Debt</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell component="th" scope="row">
                                                                    {currentInvocieOrders?.[productPath[0]].product_name}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {getDate(currentInvocieOrders?.[productPath[0]].created_at)}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {getDate(currentInvocieOrders?.[productPath[0]].updated_at)}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    ${currentInvocieOrders?.[productPath[0]].price}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {currentInvocieOrders?.[productPath[0]].remainder_amount}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {currentInvocieOrders?.[productPath[0]].sold_amount}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {currentInvocieOrders?.[productPath[0]].returned_amount}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    ${currentInvocieOrders?.[productPath[0]].debt}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardMedia>
                                        </Card>

                                        <Card
                                            sx={{
                                                bgcolor: '#e5eff6',
                                                borderRadius: 0,
                                            }}
                                        >
                                            <CardContent>
                                                <Formik
                                                    initialValues={{
                                                        amount: '',
                                                    }}
                                                    validationSchema={yupValidateShchema}
                                                    onSubmit={handleSubmit}
                                                    validateOnChange
                                                >
                                                    <Form>
                                                        <Grid container direction="column" spacing={1}>
                                                            <Grid item mt={1}>
                                                                <Typography>Sold products amount</Typography>
                                                                <FormikInput
                                                                    inputProps={{ autoComplete: 'off' }}
                                                                    onKeyDown={handleKeyPress}
                                                                    onChange={handleInputChange}
                                                                    name="amount"
                                                                    inputText="Enter product amount"
                                                                />
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography>Returned products amount</Typography>
                                                                <FormikInput
                                                                    onKeyDown={handleKeyPress}
                                                                    inputProps={{ autoComplete: 'off' }}
                                                                    onChange={handleInputChange}
                                                                    name="returned"
                                                                    inputText="Enter product amount"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Form>
                                                </Formik>
                                            </CardContent>
                                        </Card>

                                        <Card
                                            sx={{
                                                bgcolor: '#F9FAFE',
                                                borderStartEndRadius: 0,
                                                borderStartStartRadius: 0,
                                            }}
                                        >
                                            <CardMedia>
                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="right">Price</TableCell>
                                                                <TableCell align="right">Returned</TableCell>
                                                                <TableCell align="right">Sold</TableCell>
                                                                <TableCell align="right">Remained</TableCell>
                                                                <TableCell align="right">Debt</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell align="right">${countProduct?.price}</TableCell>
                                                                <TableCell align="right">{countProduct?.returned}</TableCell>
                                                                <TableCell align="right">{countProduct?.sold}</TableCell>
                                                                <TableCell align="right">{countProduct?.remained}</TableCell>
                                                                <TableCell align="right">${countProduct?.debt}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardMedia>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default MarkPaid;
