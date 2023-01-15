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
} from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { axiosInstance } from 'services';
import { GET_INVOICES, INVOICES_LOADING } from 'store/actions';
import { useState } from 'react';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { AlertUser, Invoice } from 'custom-components';
import { Link } from 'react-router-dom';

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
                const data = await axiosInstance.get();
                dispatch({ type: GET_INVOICES, invoices: data.data });
                // console.log(data.data);
                !data?.data && handleSnackStatusClose();
                setAllPages(data.data.meta.to / data.data.meta.per_page || 1);
            } catch (err) {
                handleSnackStatusOpen(err.message, 'error');
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
                <Card
                    sx={{
                        bgcolor: '#F9FAFE',
                    }}
                >
                    <CardMedia>
                        <TableContainer component={Paper}>
                            <Table onClick={(evt) => {}} sx={{ minWidth: 650 }} aria-label="simple table">
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
                                            <Invoice key={invoice?.id} invoice={invoice} to={`/utils/util-invoices/${invoice?.id}`} />
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
            </MainCard>
        </>
    );
};

export default Invoices;
