import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Skeleton,
    Snackbar,
    Stack,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import { AlertUser, FormikInput, RouteBtn } from 'custom-components';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { axiosInstance } from 'services';
import MainCard from 'ui-component/cards/MainCard';
import * as yup from 'yup';
// icons
import {
    IconPencil,
    IconChevronLeft,
    IconTrash,
    IconTruckDelivery,
    IconReceiptRefund,
    IconCircleX,
    IconFilePlus,
    IconTextPlus,
} from '@tabler/icons';

const InvoiceAddOrder = () => {
    const navigate = useNavigate();
    const { id, orderID } = useParams();
    const [isLoading, setLoading] = useState({ open: false, message: '', for: 'loading' });
    const [statusSnackbar, setStatusSnack] = useState({ open: false, message: '', type: 'error' });

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

    // Formik
    const yupValidateShchema = yup.object().shape({
        product_name: yup
            .string()
            .typeError('*Enter string')
            .required("*Can't be empty")
            .min(2, '*More than 2 characters')
            .max(30, '*Less than 30 characters'),
        price: yup.number().typeError('*Enter number').required("*Can't be empty").positive('*Enter positive number'),
        remainder_amount: yup.number().typeError('*Enter number').required("*Can't be empty").positive('*Enter positive number'),
        description: yup.string().typeError('*Enter string').required("*Can't be empty").min(2, '*More than 2 characters'),
    });

    const handleNewOrderCreate = ({ product_name, price, remainder_amount, description }) => {
        handleSnackLoadingOpen();
        (async () => {
            try {
                await axiosInstance.post('orders', {
                    product_name,
                    price: +price,
                    user_id: +id,
                    remainder_amount: +remainder_amount,
                    sold_amount: 0,
                    returned_amount: 0,
                    description,
                });
                navigate(-1);
            } catch (err) {
                handleSnackStatusOpen(err.message);
            } finally {
                handleSnackLoadingClose();
            }
        })();
    };

    return (
        <>
            {/* Snackbars */}

            <AlertUser alertInfo={statusSnackbar} onClose={handleSnackStatusClose} />
            <AlertUser onClose={handleSnackLoadingClose} loading={isLoading} />

            <MainCard title="Add order">
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
                                        <RouteBtn to={'goBack'} relative="path" variant="text" startIcon={<IconChevronLeft />}>
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
                            <CardContent>
                                <Formik
                                    initialValues={{
                                        product_name: '',
                                        price: '',
                                        remainder_amount: '',
                                        description: '',
                                    }}
                                    validationSchema={yupValidateShchema}
                                    onSubmit={handleNewOrderCreate}
                                    validateOnChange
                                >
                                    <Form>
                                        <Grid container justifyContent="center">
                                            <Grid item container spacing={4} direction="column" my={5} md={6}>
                                                <Grid item>
                                                    <Typography variant="h2">Add order</Typography>
                                                </Grid>
                                                <Grid item container direction="column" spacing={1} my={5} md={6}>
                                                    <Grid item mt={1}>
                                                        <Typography>Ordering product Name</Typography>
                                                        <FormikInput name="product_name" inputText="Enter product Name" />
                                                    </Grid>

                                                    <Grid item>
                                                        <Typography>Ordering product Price</Typography>
                                                        <FormikInput
                                                            inputProps={{ autoComplete: 'off' }}
                                                            name="price"
                                                            inputText="Enter product Price"
                                                            sx={{ color: 'red' }}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography>Ordering amount</Typography>
                                                        <FormikInput name="remainder_amount" inputText="Description" sx={9} md={12} />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography>Description</Typography>
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
                                                            onClick={() => {
                                                                navigate(`/invoices/clients-list/${id}`);
                                                            }}
                                                            variant="contained"
                                                            color="error"
                                                            startIcon={<IconCircleX />}
                                                        >
                                                            Discard
                                                        </Button>
                                                        <Button type="submit" variant="contained" color="info" startIcon={<IconFilePlus />}>
                                                            Create
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Formik>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default InvoiceAddOrder;
