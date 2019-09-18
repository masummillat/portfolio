import React from 'react';
import { Layout, Drawer, Button } from "antd";
import PropTypes from 'prop-types';
import Navbar from "../Navbar/Navbar";
const { Content, Footer, Header } = Layout;

const DefaultLayout = ({children, ...rest}) => {
    return(
        <>
            <Layout className="layout" >

                    <Navbar {...rest} />

                <Content
                    style={{
                        padding: '100px 50px 0',
                        minHeight: 887,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {children}
                </Content>
                {/*<Footer style={{ textAlign: 'center' }}>M @ 2019</Footer>*/}
            </Layout>
        </>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};

export default DefaultLayout;