import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import { AlertUser, FormikInput, RouteBtn } from 'custom-components';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { axiosInstance } from 'services';
import MainCard from 'ui-component/cards/MainCard';
// icons
import { IconWritingSign, IconChevronLeft } from '@tabler/icons';

const InvoiceEdit = () => {
    const [isLoading, setLoading] = useState({ open: false, message: '', for: 'loading' });
    const { id } = useParams();
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [statusSnackbar, setStatusSnack] = useState({ open: false, message: '', type: 'error' });

    useEffect(() => {
        handleSnackLoadingOpen();
        (async () => {
            try {
                const data = await axiosInstance.get(`users/${id}`);
                setEditingInvoice(data.data.data);
                !data.data.data && handleSnackStatusClose;
            } catch (err) {
                handleSnackStatusOpen(err.message);
            } finally {
                handleSnackLoadingClose();
            }
        })();
    }, []);

    const selectPriceOptions = [
        {
            value: 10,
            text: '$10',
        },
        {
            value: 25,
            text: '$20',
        },
    ];

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

    return (
        <>
            <AlertUser alertInfo={statusSnackbar} onClose={handleSnackStatusClose} />
            <AlertUser onClose={handleSnackLoadingClose} loading={isLoading} />
            <MainCard title="Manage orders">
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
                                            <RouteBtn to={'goBack'} variant="text" startIcon={<IconChevronLeft />}>
                                                Go back
                                            </RouteBtn>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        item
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
                                {editingInvoice ? (
                                    <CardContent>
                                        <Formik>
                                            <Form>
                                                <Grid container spacing={10} direction="column">
                                                    <Grid item>
                                                        <Box component="div" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <IconWritingSign color="darkblue" />
                                                            <Typography color="darkblue" variant="h2">
                                                                Editing '{editingInvoice?.name}' 's orders'
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        container
                                                        spacing={2}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Grid item width={{ xs: '100%', sm: '100%', md: '50%', lg: '50%' }}>
                                                            <FormikInput name="edit_product" inputText="Product Name" />
                                                        </Grid>
                                                        <Grid item width={{ xs: '100%', sm: '100%', md: '50%', lg: '50%' }}>
                                                            <FormikInput
                                                                select={true}
                                                                options={selectPriceOptions}
                                                                name="edit_debt"
                                                                inputText="Product price"
                                                            />
                                                        </Grid>
                                                        <Grid item width={{ xs: '100%', sm: '100%', md: '50%', lg: '50%' }}>
                                                            <FormikInput name="edit_phone" inputText="Product price" />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        </Formik>
                                    </CardContent>
                                ) : (
                                    <CardContent>
                                        <Skeleton component="p" height={20} animation="wave" variant="rounded" />
                                        <Box width="100%" height="30px" />
                                        <Skeleton height={30} animation="wave" variant="rounded" />
                                        <Box width="100%" height="40px" />
                                        <Skeleton height={30} animation="wave" variant="rounded" />
                                    </CardContent>
                                )}
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default InvoiceEdit;
