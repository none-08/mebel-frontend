import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FormikInput } from 'custom-components';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { axiosInstance } from 'services';
import MainCard from 'ui-component/cards/MainCard';

const InvoiceEdit = () => {
    const [isLoading, setLoading] = useState(false);
    const { id } = useParams();
    const [editingInvoice, setEditingInvoice] = useState(null);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const data = await axiosInstance.get(`/${id}`);
                setEditingInvoice(data.data.data);
                console.log(data.data.data);
            } catch {
                console.log('Error');
            } finally {
                setLoading(false);
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

    return (
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
                            <Formik>
                                <Form>
                                    <Grid container spacing={10} direction="column">
                                        <Grid item>
                                            <Typography color="darkblue" variant="h2">
                                                Editing '{editingInvoice?.name}'
                                            </Typography>
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
                    </Card>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default InvoiceEdit;
