// assets
import { IconUsers, IconUserPlus, IconPencil } from '@tabler/icons';

// constant
const icons = {
    IconUserPlus,
    IconUsers,
    IconPencil,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Client',
    caption: 'Manage client',
    type: 'group',
    children: [
        {
            id: 'client',
            title: 'Client',
            type: 'collapse',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'register',
                    title: 'Register',
                    type: 'item',
                    url: '/pages/client/register',
                    icon: icons.IconUserPlus,
                    target: false,
                },
                {
                    id: 'product',
                    title: 'Edit',
                    type: 'item',
                    url: '/pages/client/users',
                    icon: icons.IconPencil,
                    target: false,
                },
            ],
        },
    ],
};

export default pages;
