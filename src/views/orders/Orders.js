import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { AlertUser, Order, RouteBtn } from 'custom-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from 'services';
import { GET_ORDERS } from 'store/actions';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { useState } from 'react';

// icons
import { IconRefresh, IconChevronLeft } from '@tabler/icons';

const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    const [isLoading, setLoading] = useState({ open: false, message: '', for: 'loading' });
    const [statusSnackbar, setStatusSnack] = useState({ open: false, message: '', type: 'error' });

    useEffect(() => {
        handleSnackLoadingOpen();
        (async () => {
            try {
                const data = await axiosInstance.get('orders');
                data?.data && handleSnackStatusClose();
                dispatch({ type: GET_ORDERS, orders: data.data });
            } catch (err) {
                handleSnackStatusOpen(err.message);
            } finally {
                handleSnackLoadingClose();
            }
        })();
    }, []);

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
            <AlertUser onClose={handleSnackLoadingClose} loading={isLoading} />
            <AlertUser alertInfo={statusSnackbar} onClose={handleSnackStatusClose} />

            <MainCard title="Orders List" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
                <Grid container spacing={5} direction="column">
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
                                        <RouteBtn to="/" variant="text" startIcon={<IconChevronLeft />}>
                                            Go to Dashboard
                                        </RouteBtn>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card
                            sx={{
                                bgcolor: '#F9FAFE',
                            }}
                        >
                            <CardMedia>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Order name</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                                <TableCell align="right">Order date</TableCell>
                                                <TableCell align="right">Last order</TableCell>
                                                <TableCell align="right">Remained</TableCell>
                                                <TableCell align="right">Sold</TableCell>
                                                <TableCell align="right">Returned</TableCell>
                                                <TableCell align="right">Debt</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {!orders?.data ? (
                                                <Order loading={true} amount={5} />
                                            ) : (
                                                orders?.data?.map((order) => (
                                                    <Order
                                                        key={order?.id}
                                                        order={order}
                                                        to={`/invoices/orders-list/${order?.user_id}&${order?.id}`}
                                                    />
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardMedia>
                        </Card>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Orders;
