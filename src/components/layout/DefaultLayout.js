import React from 'react';
import { Layout } from "antd";
import PropTypes from 'prop-types';

const { Content, Footer } = Layout;

const DefaultLayout = ({children}) => {
    return(
        <>
            <Layout style={{ height: '100vh', backgroundColor: '#fff' }}>
                <Layout className="layout" style={{ backgroundColor: '#fff' }}>
                    <Content
                        style={{
                            padding: 24,
                            minHeight: 280,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Cramstack ©2019</Footer>
                </Layout>
            </Layout>
        </>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};

export default DefaultLayout;