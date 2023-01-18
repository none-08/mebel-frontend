import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { FormikInput, Input, RouteBtn } from 'custom-components';
import { PersonAddAlt1Rounded } from '@mui/icons-material';
import { IconChevronLeft, IconTrash, IconCircleX } from '@tabler/icons';
import { Form, Formik, useField } from 'formik';

import * as yup from 'yup';
import { axiosInstance } from 'services';
import { useNavigate } from 'react-router';

// ===============================|| RegisterUser ||=============================== //

const yupValidateShchema = yup.object().shape({
    name: yup.string('*Enter string').required("*Can't be empty").min(2, '*Enter more than 2 characters'),
    phone: yup.string('*Enter string').required("*Can't be empty").min(2, '*Enter maore than 2 characters'),
});

const RegisterUser = () => {
    const navigate = useNavigate();

    const handleSubmit = (userData) => {
        (async () => {
            try {
                axiosInstance.post('users', userData);
            } catch {
                console.log('Error');
            } finally {
                navigate(-1);
            }
        })();
    };
    return (
        <MainCard title="Register User" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
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
                        raised
                        sx={{
                            bgcolor: '#e3f2fd',
                            boxShadow: 1,
                        }}
                    >
                        <CardContent>
                            <Formik
                                initialValues={{
                                    name: '',
                                    phone: '',
                                }}
                                validationSchema={yupValidateShchema}
                                onSubmit={handleSubmit}
                                validateOnChange
                            >
                                <Form>
                                    <Grid container justifyContent="center">
                                        <Grid container spacing={2} direction="column">
                                            <Grid item>
                                                <Typography color="darkblue" variant="h2">
                                                    New Client
                                                </Typography>
                                            </Grid>
                                            <Grid item container spacing={2} direction="column">
                                                <Grid item>
                                                    <FormikInput name="name" inputText="Clients' name" />
                                                </Grid>
                                                <Grid item>
                                                    <FormikInput name="phone" inputText="Phone number" />
                                                </Grid>
                                            </Grid>
                                            <Grid item container justifyContent="space-between">
                                                <Grid item>
                                                    <Button
                                                        onClick={() => {
                                                            navigate(-1);
                                                        }}
                                                        variant="contained"
                                                        color="error"
                                                        startIcon={<IconCircleX />}
                                                    >
                                                        Discard
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        color="info"
                                                        type="submit"
                                                        startIcon={<PersonAddAlt1Rounded />}
                                                    >
                                                        Add client
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
    );
};

export default RegisterUser;
