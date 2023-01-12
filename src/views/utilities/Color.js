import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { FormikInput, Input } from 'custom-components';
import { AddBusinessRounded, BorderClearRounded, CancelRounded, ClearAllRounded, PersonAddAlt1Rounded } from '@mui/icons-material';
import { Form, Formik, useField } from 'formik';

import * as yup from 'yup';
import { axiosInstance } from 'services';
import { useNavigate } from 'react-router';

// ===============================|| UI COLOR ||=============================== //

const yupValidateShchema = yup.object().shape({
    client_name: yup.string('*Enter string').required("*Can't be empty").min(2, '*Enter more than 2 characters'),
    phone_number: yup.string('*Enter string').required("*Can't be empty").min(2, '*Enter maore than 2 characters'),
});

const UIColor = () => {
    const navigate = useNavigate();

    const handleSubmit = ({ client_name: name, phone_number: phone }) => {
        const newClient = {
            name,
            phone,
        };
        (async () => {
            try {
                axiosInstance.post('', newClient);
            } catch {
                console.log('Error');
            } finally {
                navigate('/');
            }
        })();
    };
    return (
        <MainCard title="Register User" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
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
                                    client_name: '',
                                    phone_number: '',
                                }}
                                validationSchema={yupValidateShchema}
                                onSubmit={handleSubmit}
                                validateOnChange
                            >
                                <Form>
                                    <Grid container spacing={10} direction="column">
                                        <Grid item>
                                            <Typography color="darkblue" variant="h2">
                                                New Client
                                            </Typography>
                                        </Grid>
                                        <Grid item container spacing={2} direction="column">
                                            <Grid item>
                                                <FormikInput name="client_name" inputText="Clients' name" />
                                            </Grid>
                                            <Grid item>
                                                <FormikInput name="phone_number" inputText="Phone number" />
                                            </Grid>
                                        </Grid>
                                        <Grid item container justifyContent="space-between">
                                            <Grid item>
                                                <Button variant="contained" color="error" startIcon={<CancelRounded />}>
                                                    Discard
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="info" type="submit" startIcon={<PersonAddAlt1Rounded />}>
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

export default UIColor;
