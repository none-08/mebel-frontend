import { Alert, Snackbar } from '@mui/material';
import React from 'react';

export const AlertUser = ({ alertInfo = false, onClose = () => {}, action = <React.Fragment /> }) => {
    console.log(alertInfo);
    return (
        <Snackbar open={alertInfo?.open} onClose={onClose} action={action} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <Alert onClose={onClose} severity={alertInfo?.type || 'error'} sx={{ width: '100%' }}>
                {alertInfo?.message || ''}
            </Alert>
        </Snackbar>
    );
};
