import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const RouteBtn = ({ to, ...props }) => {
    return (
        <Link
            to={to}
            style={{
                textDecoration: 'none',
            }}
        >
            <Button {...props} />
        </Link>
    );
};
