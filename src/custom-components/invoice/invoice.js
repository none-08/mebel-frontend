import { Box, Chip, Grid, Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';

export const Invoice = ({ invoice, loading, amount, to, ...props }) => {
    if (loading) {
        return [...Array(amount).keys()].map((item) => (
            <Grid {...props} item xs={12} sm={6} key={item}>
                <SubCard title={<Skeleton animation="pulse" variant="text" height={30} />}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Skeleton animation="pulse" variant="circular" width={20} height={20} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h2" gutterBottom>
                                <Skeleton animation="pulse" width={'40%'} />
                            </Typography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        ));
    }

    if (to) {
        return (
            <Grid {...props} item xs={12} sm={6}>
                <Link
                    to={to}
                    style={{
                        textDecoration: 'none',
                        width: '100%',
                    }}
                >
                    <SubCard title="Client orders">
                        <Grid
                            container
                            direction="column"
                            spacing={1}
                            sx={{
                                pointerEvents: 'none',
                            }}
                        >
                            <Grid item>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Chip label={invoice?.id} variant="filled" />
                                    <Typography>{invoice?.name}</Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="h2">${invoice?.debt}</Typography>
                                <Typography variant="p" color="#7E88C3" gutterBottom>
                                    {new Date('2023-01-09T07:08:14.000000Z').toDateString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Link>
            </Grid>
        );
    }

    return (
        <Grid {...props} item xs={12} sm={6}>
            <SubCard title="Client orders">
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Chip label={invoice?.id} variant="filled" />
                    </Grid>
                    <Grid item>
                        <Typography variant="h2" gutterBottom>
                            ${invoice?.debt}
                        </Typography>
                    </Grid>
                </Grid>
            </SubCard>
        </Grid>
    );
};
