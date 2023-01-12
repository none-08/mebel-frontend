import {
    Alert,
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

import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
import { Link } from 'react-router-dom';
import { getDate } from 'hooks';
import { AlertUser, RouteBtn } from 'custom-components';
import { LoadingButton } from '@mui/lab';

const InvoiceDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();

    const [isLoading, setLoading] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [currentInvocie, setInvoice] = useState(null);
    const [isSnackbarOpened, setSnackbarOpen] = useState(false);
    const [statusSnackbar, setStatusSnack] = useState({ open: false, message: '', type: 'error' });

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const data = await axiosInstance.get(`/${id}`);
                setInvoice(data.data.data);
                !data || setStatusSnack({ open: false });
                console.log(data.data.data);
            } catch (err) {
                handleSnackStatusOpen(err.message, 'error');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleSnackBtnOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackClose = (event, reason) => {
        console.log(event);
        // if (reason === 'clickaway') {
        // }
        setSnackbarOpen(false);
    };

    const handleInvoiceDelete = () => {
        setDeleting(true);
        (async () => {
            try {
                await axiosInstance.delete(`/${id}`);
                navigate('/utils/util-invoices');
            } catch (err) {
                handleSnackStatusOpen(err.message, 'error');
            } finally {
                setDeleting(false);
                setSnackbarOpen(false);
            }
        })();
    };

    // Status Snackbar
    const handleSnackStatusClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStatusSnack(false);
    };
    const handleSnackStatusOpen = (message = '', type = 'error') => {
        setStatusSnack({ open: true, message: message, type: type });
    };

    // Snackbar content
    const snackbarContent = (
        <>
            <Button color="secondary" size="small" onClick={handleSnackClose}>
                UNDO
            </Button>
            <LoadingButton
                loading={isDeleting}
                onClick={handleInvoiceDelete}
                size="small"
                aria-label="close"
                color="inherit"
                startIcon={<DeleteIcon />}
            />
        </>
    );

    return (
        <>
            {/* Snackbars */}
            <Snackbar open={isSnackbarOpened} onClose={handleSnackClose} message="Do you want to delete Invoice" action={snackbarContent} />
            <AlertUser alertInfo={statusSnackbar} onClose={handleSnackStatusClose} />

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
                                        <Grid item>
                                            <RouteBtn
                                                to="/utils/util-invoices/"
                                                variant="text"
                                                startIcon={<KeyboardArrowLeftRoundedIcon />}
                                            >
                                                Go back
                                            </RouteBtn>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Grid item>
                                            {currentInvocie ? (
                                                <RouteBtn
                                                    to={`/utils/util-invoices/${id}/order`}
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
                                        </Grid>
                                        <Grid item>
                                            {currentInvocie ? (
                                                <RouteBtn
                                                    to={`/utils/util-invoices/${id}/edit`}
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<ModeEditRoundedIcon />}
                                                >
                                                    Edit
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
                                                    onClick={handleSnackBtnOpen}
                                                    variant="contained"
                                                    color="error"
                                                    startIcon={<DeleteIcon />}
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
                                        <Grid item>
                                            {currentInvocie ? (
                                                <Button variant="contained" color="info" startIcon={<ReplyRoundedIcon />}>
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
                                            <Stack spacing={2} direction="row" alignItems="center">
                                                <Grid container spacing={1} direction="column">
                                                    <Grid item>
                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                fontSize: '0.7rem',
                                                                fontWeight: 400,
                                                                color: '#7E88C3',
                                                            }}
                                                        >
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
                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                fontSize: '0.7rem',
                                                                fontWeight: 400,
                                                                color: '#7E88C3',
                                                            }}
                                                        >
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
                                            <Stack spacing={2} direction="row" alignItems="center">
                                                <Grid item container spacing={1} direction="column">
                                                    <Grid item>
                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                fontSize: '0.7rem',
                                                                fontWeight: 400,
                                                                color: '#7E88C3',
                                                            }}
                                                        >
                                                            Invoice Date
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                fontSize: '1.5rem',
                                                                fontWeight: 500,
                                                                color: theme.palette.dark[800],
                                                            }}
                                                        >
                                                            {new Date(currentInvocie?.created_at).toDateString()}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container spacing={1} direction="column">
                                                    <Grid item>
                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                fontSize: '0.7rem',
                                                                fontWeight: 400,
                                                                color: '#7E88C3',
                                                            }}
                                                        >
                                                            Sent to
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                fontSize: '1.5rem',
                                                                fontWeight: 500,
                                                                color: theme.palette.dark[800],
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
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {currentInvocie?.orders?.map((order) => (
                                                                        <TableRow
                                                                            hover
                                                                            key={order.id}
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >
                                                                            <TableCell component="th" scope="row">
                                                                                {order.product_name}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {getDate(order?.ordered_at)}
                                                                            </TableCell>
                                                                            <TableCell align="right">{order.price}</TableCell>
                                                                            <TableCell align="right">{order.sold_amount}</TableCell>
                                                                            <TableCell align="right">{order.remainder_amount}</TableCell>
                                                                            <TableCell align="right">{order.returned_amount}</TableCell>
                                                                            <TableCell align="right">{order.debt}</TableCell>
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
                                    <Skeleton sx={{ display: 'block', height: 200 }} animation="wave" variant="rounded" />
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
