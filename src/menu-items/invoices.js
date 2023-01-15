// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const invoices = {
    id: 'invoices',
    title: 'Invoices',
    type: 'group',
    children: [
        {
            id: 'util-invoices',
            title: 'Invoices',
            type: 'item',
            url: '/utils/util-invoices',
            icon: icons.IconTypography,
            breadcrumbs: false,
        },
        // {
        //     id: 'util-shadow',
        //     title: 'Shadow',
        //     type: 'item',
        //     url: '/utils/util-shadow',
        //     icon: icons.IconShadow,
        //     breadcrumbs: false
        // },
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
