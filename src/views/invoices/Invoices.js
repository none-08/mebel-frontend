import {
    Card,
    CardMedia,
    Chip,
    Grid,
    Pagination,
    Stack,
    Table,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    CardActionArea,
    CardContent,
} from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { axiosInstance } from 'services';
import { GET_INVOICES } from 'store/actions';
import { useState } from 'react';
import { AlertUser, Invoice, RouteBtn } from 'custom-components';

// icons
import { IconChevronLeft } from '@tabler/icons';

// ==============================|| INVOICES ROLL ||============================== //

const Invoices = () => {
    const dispatch = useDispatch();

    const invoices = useSelector((state) => state.invoices);
    const [isLoading, setLoading] = useState({ open: false, message: '', for: 'loading' });
    const [currentPage, setPage] = useState(1);
    const [allPages, setAllPages] = useState(1);
    const [statusSnackbar, setStatusSnack] = useState({ open: false, message: '', type: 'error' });

    useEffect(() => {
        handleSnackLoadingOpen();
        (async () => {
            try {
                const data = await axiosInstance.get('users');
                dispatch({ type: GET_INVOICES, invoices: data.data });
                // console.log(data.data);
                data?.data && handleSnackStatusClose();
                setAllPages(data.data.meta.to / data.data.meta.per_page || 1);
            } catch (err) {
                handleSnackStatusOpen(err.message);
            } finally {
                handleSnackLoadingClose();
            }
        })();
    }, []);

    const handleChange = (event, value) => {
        setPage(value);
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
            <AlertUser onClose={handleSnackLoadingClose} loading={isLoading} />
            <AlertUser alertInfo={statusSnackbar} onClose={handleSnackStatusClose} />

            <MainCard title="Invoices List" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
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
                                                <TableCell>User ID</TableCell>
                                                <TableCell align="right">Name</TableCell>
                                                <TableCell align="right">Debt</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {!invoices?.data ? (
                                                <Invoice loading={true} amount={5} />
                                            ) : (
                                                invoices?.data?.map((invoice) => (
                                                    <Invoice
                                                        key={invoice?.id}
                                                        invoice={invoice}
                                                        to={`/invocies/clients-list/${invoice?.id}`}
                                                    />
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardMedia>
                            <CardActionArea>
                                {+allPages > 1 ? (
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                        }}
                                    >
                                        <Pagination count={allPages} page={currentPage} onChange={handleChange} />
                                    </Grid>
                                ) : (
                                    ''
                                )}
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Invoices;
