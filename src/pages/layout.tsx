import { Layout } from 'react-admin';
import { ReactNode } from 'react';
import { MyMenu } from './menu';

interface MyLayoutProps {
    children: ReactNode;
}

export const MyLayout: React.FC<MyLayoutProps> = ({ children }) => (
    <Layout menu={MyMenu}>
        {children}
    </Layout>
);
