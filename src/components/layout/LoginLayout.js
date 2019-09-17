import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Content } = Layout;

const LoginLayout = ({ children }) => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Content>{children}</Content>
        </Layout>
    );
};

LoginLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
export default LoginLayout;