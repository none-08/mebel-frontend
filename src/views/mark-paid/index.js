// material-ui
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    Skeleton,
    Snackbar,
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
import { useNavigate, useParams } from 'react-router';
import { axiosInstance } from 'services';
import * as yup from 'yup';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

// Icons
import { Form, Formik, useFormikContext } from 'formik';
import { getDate } from 'hooks';
import { IconReceiptOff, IconChevronLeft, IconCalculator, IconTrash } from '@tabler/icons';
import { LoadingButton } from '@mui/lab';

// ==============================|| Mark paid orders ||============================== //

const MarkPaid = () => {
    const navigate = useNavigate();
    const { id, orderID } = useParams();
    const [isLoading, setLoading] = useState({ open: false, message: '', for: 'loading' });
    const [statusSnackbar, setStatusSnack] = useState({ open: false, message: '', type: 'error' });
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [calculateOrder, setCalculate] = useState(null);
    const [isDeleting, setDeleting] = useState(false);
    const [isDeleteSnackbarOpened, setDeleteSnackbarOpen] = useState(false);

    useEffect(() => {
        handleSnackLoadingOpen();
        (async () => {
            try {
                const currentUsersOrder = await axiosInstance.get(`users/${id}/orders/${orderID}`);
                setEditingOrder(currentUsersOrder.data.data);
                setCalculate(currentUsersOrder.data.data);
            } catch (err) {
                handleSnackStatusOpen(err.message);
            } finally {
                handleSnackLoadingClose();
            }
        })();
    }, []);

    const yupValidateShchema = yup.object().shape({
        sold: yup
            .number()
            .typeError('*Enter number!')
            .required("*Can't be empty")
            .moreThan(-1, '*Enter positive number')
            .integer('*Enter integer')
            .lessThan(+editingOrder?.remainder_amount + 1, `${editingOrder?.remainder_amount} is maximum amount`),
        returned: yup
            .number()
            .typeError('*Enter number!')
            .moreThan(-1, '*Enter positive number')
            .integer('*Enter integer')
            .lessThan(+editingOrder?.remainder_amount + 1, `${editingOrder?.remainder_amount} is maximum amount`),
        description: yup.string().typeError('*Enter text!').min(3, '*More than 3 characters').max(30, '*Less than 30 characters'),
    });

    const handleOrdersCount = ({ sold, returned, description }) => {
        if (editingOrder?.remainder_amount < +sold + +returned) {
            handleSnackStatusOpen(
                +editingOrder?.remainder_amount - +sold > 0
                    ? `Sold and Returned orders should't go beyond ${+editingOrder?.remainder_amount}`
                    : 'You entered wrong value',
                'error'
            );
            return;
        }
        console.log(sold);
        const countedDebt = (editingOrder?.remainder_amount - (+sold + +returned)) * editingOrder?.price;
        setCalculate({
            ...editingOrder,
            price: editingOrder?.price,
            sold_amount: editingOrder?.sold_amount + +sold,
            remainder_amount: editingOrder?.remainder_amount - (+sold + +returned),
            returned_amount: editingOrder?.returned_amount + +returned,
            debt: countedDebt,
            description: description,
        });
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

    // Order Dialog funcs
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogSubmit = (evt) => {
        handleSnackLoadingOpen();
        (async () => {
            try {
                await axiosInstance.put(`orders/${orderID}`, calculateOrder);
                navigate(-1);
            } catch (err) {
                handleSnackStatusOpen(err.message);
            } finally {
                handleSnackLoadingClose();
            }
        })();
    };

    // Delete Snackbar
    const handleDeleteSnackOpen = () => {
        setDeleteSnackbarOpen(true);
    };
    const handleDeleteSnackClose = (event, reason) => {
        setDeleteSnackbarOpen(false);
    };
    // Delete order
    const handleInvoiceDelete = () => {
        handleSnackLoadingOpen();
        (async () => {
            try {
                await axiosInstance.delete(`orders/${orderID}`);
                navigate(-1);
            } catch (err) {
                handleSnackStatusOpen(err.message);
            } finally {
                handleSnackLoadingClose();
            }
        })();
    };

    const snackbarContent = (
        <>
            <Button color="secondary" size="small" onClick={handleDeleteSnackClose}>
                UNDO
            </Button>
            <LoadingButton
                loading={isDeleting}
                onClick={handleInvoiceDelete}
                size="small"
                aria-label="close"
                color="inherit"
                startIcon={<IconTrash />}
            />
        </>
    );

    return (
        <>
            <AlertUser alertInfo={statusSnackbar} onClose={handleSnackStatusClose} />
            <AlertUser onClose={handleSnackLoadingClose} loading={isLoading} />
            <Snackbar
                open={isDeleteSnackbarOpened}
                onClose={handleDeleteSnackClose}
                message="Do you want to delete Invoice"
                action={snackbarContent}
            />

            <Dialog open={isDialogOpen} keepMounted onClose={handleDialogClose} aria-describedby="alert-dialog-slide-description">
                <DialogContent>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1} direction="column" minWidth="30vw">
                                <Grid item container direction="row" justifyContent="space-between">
                                    <Grid item>Product name:</Grid>
                                    <Grid item>
                                        <Typography variant="h4">{calculateOrder?.product_name}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" justifyContent="space-between">
                                    <Grid item>Ordered date:</Grid>
                                    <Grid item>
                                        <Typography variant="h4">{getDate(calculateOrder?.created_at)}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid item container direction="row" justifyContent="space-between">
                                    <Grid item>Price:</Grid>
                                    <Grid item>
                                        <Typography variant="h4">${calculateOrder?.price}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" justifyContent="space-between">
                                    <Grid item>Returned:</Grid>
                                    <Grid item>
                                        <Typography variant="h4">{calculateOrder?.returned_amount}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" justifyContent="space-between">
                                    <Grid item>Remained:</Grid>
                                    <Grid item>
                                        <Typography variant="h4">{calculateOrder?.remainder_amount}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" justifyContent="space-between">
                                    <Grid item>Sold:</Grid>
                                    <Grid item>
                                        <Typography variant="h4">{calculateOrder?.sold_amount}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" justifyContent="space-between">
                                    <Grid item>Current debt:</Grid>
                                    <Grid item>
                                        <Typography variant="h4">${calculateOrder?.debt}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                    <Button onClick={handleDialogSubmit}>Pay</Button>
                </DialogActions>
            </Dialog>

            <MainCard
                title={
                    editingOrder ? (
                        <Typography variant="h3">Pay for "{editingOrder?.product_name}"</Typography>
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
                                        <RouteBtn to={'goBack'} variant="text" startIcon={<IconChevronLeft />}>
                                            Go back
                                        </RouteBtn>
                                    </Grid>
                                    <Grid item>
                                        {editingOrder ? (
                                            <Button
                                                onClick={handleDeleteSnackOpen}
                                                variant="contained"
                                                color="error"
                                                startIcon={<IconTrash />}
                                            >
                                                Delete
                                            </Button>
                                        ) : (
                                            <Skeleton
                                                sx={{ bgcolor: 'grrey.900' }}
                                                variant="contained"
                                                animation="wave"
                                                width={90}
                                                height={36}
                                            />
                                        )}
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
                                                            {editingOrder ? (
                                                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                    <TableCell component="th" scope="row">
                                                                        {editingOrder?.product_name}
                                                                    </TableCell>
                                                                    <TableCell align="right">{getDate(editingOrder?.created_at)}</TableCell>
                                                                    <TableCell align="right">{getDate(editingOrder?.updated_at)}</TableCell>
                                                                    <TableCell align="right">${editingOrder?.price}</TableCell>
                                                                    <TableCell align="right">{editingOrder?.remainder_amount}</TableCell>
                                                                    <TableCell align="right">{editingOrder?.sold_amount}</TableCell>
                                                                    <TableCell align="right">{editingOrder?.returned_amount}</TableCell>
                                                                    <TableCell align="right">${editingOrder?.debt}</TableCell>
                                                                </TableRow>
                                                            ) : (
                                                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                    <TableCell component="th" scope="row">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
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
                                                        sold: '0',
                                                        returned: '0',
                                                        description: '',
                                                    }}
                                                    validationSchema={yupValidateShchema}
                                                    onSubmit={handleOrdersCount}
                                                    validateOnChange
                                                >
                                                    <Form>
                                                        <Grid container direction="column" spacing={1}>
                                                            <Grid item mt={1}>
                                                                <Typography>Sold products amount</Typography>
                                                                <FormikInput
                                                                    inputProps={{ autoComplete: 'off' }}
                                                                    name="sold"
                                                                    inputText="Enter product amount"
                                                                />
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography>Returned products amount</Typography>
                                                                <FormikInput
                                                                    inputProps={{ autoComplete: 'off' }}
                                                                    name="returned"
                                                                    inputText="Enter product amount"
                                                                />
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography>Order description</Typography>
                                                                <FormikInput name="description" inputText="Description" />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <Button
                                                                    type="submit"
                                                                    variant="contained"
                                                                    color="info"
                                                                    startIcon={<IconCalculator />}
                                                                >
                                                                    Count
                                                                </Button>
                                                                <Button
                                                                    onClick={handleDialogOpen}
                                                                    variant="contained"
                                                                    color="success"
                                                                    startIcon={<IconReceiptOff />}
                                                                >
                                                                    Pay
                                                                </Button>
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
                                                            {calculateOrder ? (
                                                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                    <TableCell align="right">${calculateOrder?.price}</TableCell>
                                                                    <TableCell align="right">{calculateOrder?.returned_amount}</TableCell>
                                                                    <TableCell align="right">{calculateOrder?.sold_amount}</TableCell>
                                                                    <TableCell align="right">{calculateOrder?.remainder_amount}</TableCell>
                                                                    <TableCell align="right">${calculateOrder?.debt}</TableCell>
                                                                </TableRow>
                                                            ) : (
                                                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                    <TableCell component="th" scope="row">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Skeleton variant="span" animation="wave" />
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
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
