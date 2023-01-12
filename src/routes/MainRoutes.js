import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/invoices/Typography')));
const UtilsInvocieDetail = Loadable(lazy(() => import('views/utilities/invoices/Invoice-detail')));
const UtilsInvocieEdit = Loadable(lazy(() => import('views/utilities/invoices/Invoice-edit')));

const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />,
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />,
                },
            ],
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-invoices',
                    children: [
                        {
                            path: '',
                            element: <UtilsTypography />,
                        },
                        {
                            path: ':id',
                            children: [
                                {
                                    path: '',
                                    element: <UtilsInvocieDetail />,
                                },
                                {
                                    path: 'edit',
                                    element: <UtilsInvocieEdit />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            path: 'pages',
            children: [
                {
                    path: 'register/user',
                    element: <UtilsColor />,
                },
                {
                    path: 'register/product',
                    element: <UtilsShadow />,
                },
            ],
        },

        {
            path: 'sample-page',
            element: <SamplePage />,
        },
    ],
};

export default MainRoutes;
