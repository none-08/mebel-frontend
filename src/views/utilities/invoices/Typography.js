import { Chip, Grid, Pagination, Stack } from '@mui/material';
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
import { Invoice } from 'custom-components';
import { Link } from 'react-router-dom';

// ==============================|| INVOICES ROLL ||============================== //

const Typography = () => {
    const dispatch = useDispatch();

    const invoices = useSelector((state) => state.invoices);
    const [isLoading, setLoading] = useState(false);
    const [currentPage, setPage] = useState(1);
    const [allPages, setAllPages] = useState(1);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const data = await axiosInstance.get();
                dispatch({ type: GET_INVOICES, invoices: data.data });
                console.log(data.data);
                setAllPages(data.data.meta.to / data.data.meta.per_page || 1);
            } catch {
                console.log('Error');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <MainCard title="Invoices List" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
            <Grid container spacing={gridSpacing}>
                {isLoading ? (
                    <Invoice loading={isLoading} amount={4} />
                ) : (
                    invoices?.data?.map((invoice) => (
                        <Invoice key={invoice?.id} invoice={invoice} to={`/utils/util-invoices/${invoice?.id}`} />
                    ))
                )}
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
            </Grid>
        </MainCard>
    );
};

export default Typography;
