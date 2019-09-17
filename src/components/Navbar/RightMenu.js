import React from 'react';
import {Avatar, Badge, Menu, Dropdown} from "antd";
import PropTypes from 'prop-types';

import NavProfile from "../profile/NavProfile";


const RightMenu = ({logout}) => {

    if (true) {
        return (
            <div>
              <Dropdown  overlayStyle={{width:200, boxShadow: '-1px 2px 5px -1px rgba(0,0,0,0.15)'}}
                         overlay={<NavProfile logout={logout}/>}
                         placement="bottomRight">
                <Badge count={1}>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </Badge>
              </Dropdown>

            </div>
        );
    }
    return(
        <Menu mode="horizontal">
            <Menu.Item key="mail">
                <a href="">Signin</a>
            </Menu.Item>
            <Menu.Item key="app">
                <a href="">Signup</a>
            </Menu.Item>
        </Menu>
    );
};

RightMenu.propTypes = {
    logout: PropTypes.func.isRequired,
};


export default RightMenu;