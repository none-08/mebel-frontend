import { IconReload } from '@tabler/icons';
import { Alert, CircularProgress, IconButton, Snackbar } from '@mui/material';
import React from 'react';

export const AlertUser = ({ alertInfo = { open: false }, onClose = () => {}, action, loading = { open: false } }) => {
    if (loading?.for === 'loading') {
        return (
            <Snackbar
                open={loading?.open}
                onClose={onClose}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                // message={<CircularProgress color="primary" size="medium" />}
            >
                <Alert icon={<IconReload />} color="primary" severity="info">
                    Loading...
                </Alert>
            </Snackbar>
        );
    }
    if (alertInfo?.type === 'action') {
        return <Snackbar open={alertInfo?.open} onClose={onClose} message={alertInfo?.message} action={action || <React.Fragment />} />;
    }

    return (
        <Snackbar
            open={alertInfo?.open}
            onClose={onClose}
            action={action || <React.Fragment />}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Alert onClose={onClose} severity={alertInfo?.type || 'error'} sx={{ width: '100%' }}>
                {alertInfo?.message || ''}
            </Alert>
        </Snackbar>
    );
};
