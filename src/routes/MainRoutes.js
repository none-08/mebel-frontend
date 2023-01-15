import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const Invoices = Loadable(lazy(() => import('views/invoices/invoices/Invoices')));
const InvoiceDetail = Loadable(lazy(() => import('views/invoices/invoices/Invoice-detail')));
const InvoiceEdit = Loadable(lazy(() => import('views/invoices/invoices/Invoice-edit')));

const RegisterUser = Loadable(lazy(() => import('views/invoices/RegisterUser')));
const RegisterProduct = Loadable(lazy(() => import('views/invoices/RegisterProduct')));

// sample page routing
const MarkPaid = Loadable(lazy(() => import('views/mark-paid/index')));

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
                            element: <Invoices />,
                        },
                        {
                            path: ':id',
                            children: [
                                {
                                    path: '',
                                    element: <InvoiceDetail />,
                                },
                                {
                                    path: 'mark-paid/:item',
                                    element: <MarkPaid />,
                                },
                                {
                                    path: 'edit',
                                    element: <InvoiceEdit />,
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
                    element: <RegisterUser />,
                },
                {
                    path: 'register/product',
                    element: <RegisterProduct />,
                },
            ],
        },
    ],
};

export default MainRoutes;
