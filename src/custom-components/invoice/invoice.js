import { Box, Chip, Grid, Skeleton, TableCell, TableRow, Typography } from '@mui/material';
import { getDate } from 'hooks';
import { Link, useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';

export const Invoice = ({ invoice, loading, amount, to, ...props }) => {
    const navigate = useNavigate();

    const handleRowClick = (event, id) => {
        navigate(`/invoices/clients-list/${id}`);
    };

    if (loading) {
        return [...Array(amount).keys()].map((item) => (
            <TableRow key={item} {...props} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    <Skeleton variant="span" animation="wave" />
                </TableCell>
                <TableCell align="right">
                    <Skeleton variant="span" animation="wave" />
                </TableCell>
                <TableCell align="right">
                    <Skeleton variant="span" animation="wave" />
                </TableCell>
            </TableRow>
        ));
    }

    if (to) {
        return (
            <TableRow
                hover
                onClick={(evt) => handleRowClick(evt, invoice?.id)}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                }}
            >
                <TableCell component="th" scope="row">
                    #{invoice?.id}
                </TableCell>
                <TableCell align="right">{invoice?.name}</TableCell>
                <TableCell align="right">${invoice?.total_debt}</TableCell>
            </TableRow>
        );
    }

    return (
        <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
                #{invoice?.id}
            </TableCell>
            <TableCell align="right">{invoice?.name}</TableCell>
            <TableCell align="right">${invoice?.total_debt}</TableCell>
        </TableRow>
    );
};
