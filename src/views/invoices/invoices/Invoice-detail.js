import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
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
    useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { axiosInstance } from 'services';
import { gridSpacing } from 'store/constant';

// icons
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { IconTruckDelivery } from '@tabler/icons';
import { IconReceiptRefund } from '@tabler/icons';
import { IconBrandTelegram } from '@tabler/icons';

import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
import { Link } from 'react-router-dom';
import { getDate } from 'hooks';
import { AlertUser, RouteBtn } from 'custom-components';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

const InvoiceDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();

    const [isLoading, setLoading] = useState({ open: false, message: '', for: 'loading' });
    const [currentInvocie, setInvoice] = useState(null);
    const [currentInvocieOrders, setInvoiceOrders] = useState(null);
    const [statusSnackbar, setStatusSnack] = useState({ open: false, message: '', type: 'error' });
    const [confirmSend, setConfirmSend] = useState({ open: false, message: '', type: 'action' });

    useEffect(() => {
        handleSnackLoadingOpen();
        (async () => {
            try {
                const invoiceData = await axiosInstance.get(`/${id}`);
                const ordersData = await axiosInstance.get(`/${id}/orders`);
                setInvoice(invoiceData.data.data);
                setInvoiceOrders(ordersData.data.data);
                console.log(ordersData.data.data);
                !invoiceData && handleSnackStatusClose();
            } catch (err) {
                console.log(err);
                handleSnackStatusOpen(err.message, 'error');
            } finally {
                handleSnackLoadingClose();
            }
        })();
    }, []);

    const handleOrderRowClick = (invoiceID, rowIndex, rowID) => {
        navigate(`/utils/util-invoices/${invoiceID}/mark-paid/${rowIndex}&${rowID}`);
    };

    // Delete user with orders

    // const [isDeleting, setDeleting] = useState(false);
    // const [isDeleteSnackbarOpened, setDeleteSnackbarOpen] = useState(false);
    // const handleInvoiceDelete = () => {
    //     setDeleting(true);
    //     (async () => {
    //         try {
    //             await axiosInstance.delete(`/${id}`);
    //             navigate('/utils/util-invoices');
    //         } catch (err) {
    //             handleSnackStatusOpen(err.message, 'error');
    //         } finally {
    //             setDeleting(false);
    //             setDeleteSnackbarOpen(false);
    //         }
    //     })();
    // };
    // Delete Snackbar content
    // const snackbarContent = (
    //     <>
    //         <Button color="secondary" size="small" onClick={handleDeleteSnackClose}>
    //             UNDO
    //         </Button>
    //         <LoadingButton
    //             loading={isDeleting}
    //             onClick={handleInvoiceDelete}
    //             size="small"
    //             aria-label="close"
    //             color="inherit"
    //             startIcon={<DeleteIcon />}
    //         />
    //     </>
    // );
    // const handleDeleteSnackOpen = () => {
    //     setDeleteSnackbarOpen(true);
    // };
    // const handleDeleteSnackClose = (event, reason) => {
    //     setDeleteSnackbarOpen(false);
    // };
    // <Snackbar open={isDeleteSnackbarOpened} onClose={handleDeleteSnackClose} message="Do you want to delete Invoice" action={snackbarContent} />

    // Delete Button
    // {currentInvocie ? (
    //     <Button
    //         onClick={handleDeleteSnackOpen}
    //         variant="contained"
    //         color="error"
    //         startIcon={<DeleteIcon />}
    //     >
    //         Delete
    //     </Button>
    // ) : (
    //     <Skeleton
    //         sx={{ bgcolor: 'grrey.900' }}
    //         variant="contained"
    //         animation="wave"
    //         width={90}
    //         height={36}
    //     />
    // )}

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

    const handleSendInvoicesBtn = () => {
        const orders = String(
            `  Assalomu alaykum ${currentInvocie?.name}! Sizga shuni 
            xabar bermoqchimizki singing "Muborak Elegant Mebel" korxonasidan 
            ayni vaqtda barcha buyutmangiz jami $${currentInvocie?.total_debt} ga yetgan ! 
            Yaniy : ${currentInvocie?.orders.map(({ product_name, price, remainder_amount, debt }, index) => {
                return `${index + 1}) $${price} lik '${product_name}'dan - ${remainder_amount}ta ___ jami$${debt} `;
            })}. Shikoyat yoki Maslahat uchun ++998977646890 raqami siz uchun doim xozir ;)`
        );
        const chatID = '874523678';
        const token = '5828280243:AAGe_0ItcammTVlDXdWojxwckwdpkJLpMR0';
        const URL_Telegram = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${orders}`;

        (async () => {
            handleSnackLoadingOpen();
            try {
                await axios.post(URL_Telegram);
            } catch (err) {
                handleSnackStatusOpen(err.message, 'error');
            } finally {
                handleConfirmSendClose();
                handleSnackLoadingClose();
            }
        })();
    };

    // Confirm Sending Invoice Snackbar
    const handleConfirmSendClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setConfirmSend({ open: false });
    };
    const handleConfirmSendOpen = () => {
        setConfirmSend({ open: true, message: 'Do you want send current invoice?', type: 'action' });
    };

    const sendSnackContent = (
        <>
            <Button color="secondary" size="small" onClick={handleConfirmSendClose}>
                UNDO
            </Button>
            <LoadingButton
                loading={isLoading?.open}
                onClick={handleSendInvoicesBtn}
                size="small"
                aria-label="close"
                color="inherit"
                startIcon={<IconBrandTelegram />}
            />
        </>
    );

    return (
        <>
            {/* Snackbars */}

            <AlertUser alertInfo={statusSnackbar} onClose={handleSnackStatusClose} />
            <AlertUser onClose={handleSnackLoadingClose} loading={isLoading} />
            <AlertUser alertInfo={confirmSend} onClose={handleConfirmSendClose} action={sendSnackContent} />

            <MainCard title="Manage orders" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
                <Grid
                    container
                    spacing={5}
                    sx={{
                        flexDirection: 'column',
                    }}
                >
                    <Grid item>
                        <Card
                            raised
                            sx={{
                                bgcolor: '#e3f2fd',
                                boxShadow: 1,
                            }}
                        >
                            <CardContent>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <RouteBtn to="/utils/util-invoices/" variant="text" startIcon={<KeyboardArrowLeftRoundedIcon />}>
                                            Go back
                                        </RouteBtn>
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        {currentInvocie ? (
                                            <RouteBtn
                                                to={`/utils/util-invoices/${id}/add-order`}
                                                variant="contained"
                                                color="primary"
                                                startIcon={<IconTruckDelivery />}
                                            >
                                                Add order
                                            </RouteBtn>
                                        ) : (
                                            <Skeleton
                                                sx={{ bgcolor: 'grrey.900' }}
                                                variant="contained"
                                                animation="wave"
                                                width={85}
                                                height={36}
                                            />
                                        )}

                                        <Grid item>
                                            {currentInvocie ? (
                                                <RouteBtn
                                                    to={`/utils/util-invoices/${id}/edit`}
                                                    variant="contained"
                                                    color="success"
                                                    startIcon={<IconReceiptRefund />}
                                                >
                                                    Mark as paid
                                                </RouteBtn>
                                            ) : (
                                                <Skeleton
                                                    sx={{ bgcolor: 'grrey.900' }}
                                                    variant="contained"
                                                    animation="wave"
                                                    width={80}
                                                    height={36}
                                                />
                                            )}
                                        </Grid>

                                        <Grid item>
                                            {currentInvocie ? (
                                                <Button
                                                    onClick={handleConfirmSendOpen}
                                                    variant="contained"
                                                    color="info"
                                                    startIcon={<ReplyRoundedIcon />}
                                                >
                                                    Send invoice
                                                </Button>
                                            ) : (
                                                <Skeleton
                                                    sx={{ bgcolor: 'grrey.900' }}
                                                    variant="contained"
                                                    animation="wave"
                                                    width={120}
                                                    height={36}
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        {currentInvocie ? (
                            <Card
                                raised
                                sx={{
                                    bgcolor: '#e3f2fd',
                                    boxShadow: 1,
                                }}
                            >
                                <CardContent>
                                    <Grid container spacing={2} direction="column">
                                        <Grid item>
                                            <Stack spacing={2} direction="row" alignItems="baseline">
                                                <Grid container spacing={1} direction="column">
                                                    <Grid item>
                                                        <Typography component="span" variant="body2">
                                                            Customer ID
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '1.6rem',
                                                                fontWeight: 600,
                                                                color: theme.palette.dark[800],
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <Typography
                                                                component="span"
                                                                sx={{
                                                                    color: '#888EB0',
                                                                    fontSize: '1.7rem',
                                                                }}
                                                            >
                                                                #
                                                            </Typography>
                                                            {currentInvocie?.id}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={1} direction="column">
                                                    <Grid item>
                                                        <Typography component="span" variant="body2">
                                                            Customer Name
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '1.6rem',
                                                                fontWeight: 600,
                                                                color: theme.palette.dark[800],
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            {currentInvocie?.name}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Grid>
                                        <Grid item>
                                            <Stack spacing={2} direction="row" alignItems="baseline">
                                                <Grid item container spacing={1} direction="column">
                                                    <Grid item>
                                                        <Typography component="span" variant="body2">
                                                            Invoice Date
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1"
                                                            sx={{
                                                                fontSize: '20px',
                                                            }}
                                                        >
                                                            {new Date(currentInvocie?.created_at).toDateString()}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container spacing={1} direction="column">
                                                    <Grid item>
                                                        <Typography component="span" variant="body2">
                                                            Sent to
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1"
                                                            sx={{
                                                                fontSize: '20px',
                                                            }}
                                                        >
                                                            {currentInvocie?.phone}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Grid>
                                        <Grid item>
                                            <Grid>
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
                                                                        <TableCell>Product name</TableCell>
                                                                        <TableCell align="right">Date</TableCell>
                                                                        <TableCell align="right">Price</TableCell>
                                                                        <TableCell align="right">Sold</TableCell>
                                                                        <TableCell align="right">Remained</TableCell>
                                                                        <TableCell align="right">Returned</TableCell>
                                                                        <TableCell align="right">Debt</TableCell>
                                                                        <TableCell align="right">Pay</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {currentInvocieOrders?.map((order, index) => (
                                                                        <TableRow
                                                                            key={order?.id}
                                                                            onClick={() =>
                                                                                handleOrderRowClick(currentInvocie?.id, index, order?.id)
                                                                            }
                                                                            hover
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >
                                                                            <TableCell component="th" scope="row">
                                                                                {order.product_name}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {getDate(order?.updated_at)}
                                                                            </TableCell>
                                                                            <TableCell align="right">${order.price}</TableCell>
                                                                            <TableCell align="right">{order.sold_amount}</TableCell>
                                                                            <TableCell align="right">{order.remainder_amount}</TableCell>
                                                                            <TableCell align="right">{order.returned_amount}</TableCell>
                                                                            <TableCell align="right">${order.debt}</TableCell>
                                                                            <TableCell
                                                                                align="right"
                                                                                sx={{
                                                                                    '&:hover > svg': {
                                                                                        fill: '#F9FAFE',
                                                                                        color: '#5e35b1',
                                                                                    },
                                                                                }}
                                                                            >
                                                                                <IconReceiptRefund />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </CardMedia>
                                                </Card>
                                                <Card sx={{ bgcolor: '#5e35b1', borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
                                                    <CardContent
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: '1rem',
                                                                fontWeight: 400,
                                                                color: '#7E88C3',
                                                            }}
                                                        >
                                                            Total Debt
                                                        </Typography>
                                                        <Typography
                                                            component="div"
                                                            sx={{
                                                                fontSize: '3rem',
                                                                color: '#FFFFFF',
                                                                display: 'flex',
                                                                alignItems: 'baseline',
                                                            }}
                                                        >
                                                            <Typography
                                                                component="span"
                                                                sx={{
                                                                    fontSize: '1.5rem',
                                                                }}
                                                            >
                                                                $
                                                            </Typography>
                                                            {currentInvocie?.total_debt}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card
                                raised
                                sx={{
                                    bgcolor: '#e3f2fd',
                                    boxShadow: 1,
                                }}
                            >
                                <CardContent>
                                    <Skeleton component="p" height={30} animation="wave" variant="rounded" />
                                    <Box width="100%" height="10px" />
                                    <Skeleton component="p" height={30} animation="wave" variant="rounded" />
                                    <Box width="100%" height="30px" />

                                    <Skeleton sx={{ display: 'block', height: 100 }} animation="wave" variant="rounded" />
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default InvoiceDetail;
