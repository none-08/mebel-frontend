import { Skeleton, TableCell, TableRow } from '@mui/material';
import { getDate } from 'hooks';
import { useNavigate } from 'react-router';

export const Order = ({ order, to, amount, loading, ...props }) => {
    const navigate = useNavigate();

    const handleRowClick = (event, id) => {
        navigate(to);
    };

    if (loading) {
        return [...Array(amount).keys()].map((item) => (
            <TableRow {...props} key={item} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    <Skeleton variant="span" animation="wave" />
                </TableCell>
                <TableCell align="right">
                    <Skeleton variant="span" animation="wave" />
                </TableCell>
                <TableCell align="right">
                    <Skeleton variant="span" animation="wave" />
                </TableCell>
                <TableCell align="right">
                    <Skeleton variant="span" animation="wave" />
                </TableCell>
                <TableCell align="right">
                    <Skeleton variant="span" animation="wave" />
                </TableCell>
                <TableCell align="right">
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
                {...props}
                onClick={(evt) => handleRowClick(evt, order?.id)}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {order?.product_name}
                </TableCell>
                <TableCell align="right">${order?.price}</TableCell>
                <TableCell align="right">{getDate(order?.created_at)}</TableCell>
                <TableCell align="right">{getDate(order?.updated_at)}</TableCell>
                <TableCell align="right">{order?.remainder_amount}</TableCell>
                <TableCell align="right">{order?.sold_amount}</TableCell>
                <TableCell align="right">{order?.returned_amount}</TableCell>
                <TableCell align="right">${order?.debt}</TableCell>
            </TableRow>
        );
    }
    return (
        <TableRow {...props} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
                {order?.product_name}
            </TableCell>
            <TableCell align="right">${order?.price}</TableCell>
            <TableCell align="right">{getDate(order?.created_at)}</TableCell>
            <TableCell align="right">{getDate(order?.updated_at)}</TableCell>
            <TableCell align="right">{order?.remainder_amount}</TableCell>
            <TableCell align="right">{order?.sold_amount}</TableCell>
            <TableCell align="right">{order?.returned_amount}</TableCell>
            <TableCell align="right">${order?.debt}</TableCell>
        </TableRow>
    );
};
