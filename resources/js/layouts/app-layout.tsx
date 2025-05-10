import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    title: string;
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ title, children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Head title={title} />
        {children}
    </AppLayoutTemplate>
);
