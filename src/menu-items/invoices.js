// assets
// import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import { IconArmchair2, IconTruckDelivery, IconFileInvoice } from '@tabler/icons';

// constant
const icons = {
    IconArmchair2,
    IconTruckDelivery,
    IconFileInvoice,
    // IconTypography,
    // IconPalette,
    // IconShadow,
    // IconWindmill,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const invoices = {
    id: 'invoices',
    title: 'Invoices',
    caption: 'Manage orders',
    type: 'group',
    children: [
        {
            id: 'menagement',
            title: 'Manage',
            type: 'collapse',
            icon: icons.IconArmchair2,
            children: [
                {
                    id: 'clients',
                    title: 'Invoices',
                    type: 'item',
                    url: '/invoices/clients-list',
                    icon: icons.IconFileInvoice,
                    target: false,
                },
                {
                    id: 'orders',
                    title: 'Orders',
                    type: 'item',
                    url: '/invoices/orders-list',
                    icon: icons.IconTruckDelivery,
                    target: false,
                },
            ],
        },
        // {
        //     id: 'util-color',
        //     title: 'Color',
        //     type: 'item',
        //     url: '/utils/util-color',
        //     icon: icons.IconPalette,
        //     breadcrumbs: false
        // }
    ],
};

export default invoices;
