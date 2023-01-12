// material-ui
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { Input } from 'custom-components';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { ReactComponent as UserAdd } from '../../assets/images/icons/user-add.svg';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard
        title={
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 1,
                }}
            >
                <Avatar sx={{ bgcolor: '#5e35b1' }}>
                    <UserAdd width="50%" height="50%" fill="#ede7f6" />
                </Avatar>
                <Typography variant="h3">Add order</Typography>
            </Box>
        }
    >
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography>Orderee</Typography>
                    <Input inputText="Enter clients' name" />
                </Box>
            </Grid>
            <Grid item>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography>Orderee</Typography>
                    <Input inputText="Enter " select={true} />
                </Box>
            </Grid>
            <Grid item>
                <Input />
            </Grid>
        </Grid>

        <Typography variant="body2">
            Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
            ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
            reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
            qui officiate descent molls anim id est labours.
        </Typography>
    </MainCard>
);

export default SamplePage;
