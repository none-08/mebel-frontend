import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { FormikInput, Input } from 'custom-components';
import { gridSpacing } from 'store/constant';
import { CancelRounded, PersonAddAlt1Rounded } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// ============================|| UTILITIES SHADOW ||============================ //

const UtilitiesShadow = () => {
    const selectOptions = [
        {
            value: '',
            text: 'Select',
        },
        {
            value: 'abror',
            text: 'Abror',
        },
        {
            value: 'nuriddin',
            text: 'Nuriddin',
        },
    ];
    const yupValidateSchema = yup.object().shape({
        product_configuration: yup.string('*Enter string').required("*Can't be empty"),
        product_price: yup.number('*Enter number').required("*Can't be empty"),
        product_select: yup.string('*Enter string').required("*Can't be empty"),
    });

    return (
        <MainCard title="Register Product">
            <Grid container spacing={gridSpacing} justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={8} xl={8}>
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
                                    product_configuration: '',
                                    product_price: '',
                                    product_select: '',
                                }}
                                validationSchema={yupValidateSchema}
                                validateOnChange
                            >
                                <Form>
                                    <Grid container spacing={10} direction="column">
                                        <Grid item>
                                            <Typography color="darkblue" variant="h2">
                                                New Product
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
                                                <FormikInput name="product_configuration" inputText="Product configuration" />
                                            </Grid>
                                            <Grid item width={{ xs: '100%', sm: '100%', md: '50%', lg: '50%' }}>
                                                <FormikInput name="product_price" inputText="Product price" />
                                            </Grid>
                                            <Grid item width="100%">
                                                <FormikInput
                                                    name="product_select"
                                                    select={true}
                                                    options={selectOptions}
                                                    inputText="Product select"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item container justifyContent="space-between">
                                            <Grid item>
                                                <Button variant="contained" color="error" startIcon={<CancelRounded />}>
                                                    Discard
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="info" startIcon={<PersonAddAlt1Rounded />}>
                                                    Add client
                                                </Button>
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

export default UtilitiesShadow;
