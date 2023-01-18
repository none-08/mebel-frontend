// assets
import { IconChartDonut } from '@tabler/icons';

// constant
const icons = { IconChartDonut };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/',
            icon: icons.IconChartDonut,
            breadcrumbs: false,
        },
    ],
};

export default dashboard;
