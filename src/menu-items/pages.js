// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Register',
    caption: 'Register order',
    type: 'group',
    children: [
        {
            id: 'redister',
            title: 'Register',
            type: 'collapse',
            icon: icons.IconKey,
            children: [
                {
                    id: 'user',
                    title: 'User',
                    type: 'item',
                    url: '/pages/register/user',
                    target: false,
                },
                // {
                //     id: 'product',
                //     title: 'Product',
                //     type: 'item',
                //     url: '/pages/register/product',
                //     target: false,
                // },
            ],
        },
    ],
};

export default pages;
