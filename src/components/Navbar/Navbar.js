import React from 'react';
// import {Drawer, Button,} from "antd";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import useNavbarState from './useNavbarState';
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import './navbar.css';



const Navbar = ({user, logout}) => {
    const { navbarState, onClose, showDrawer } = useNavbarState({
        visible:false
    })
    const { visible } = navbarState;

    return(<nav  style={{ position: 'fixed', zIndex: 1, width: '100%' }} className="menuBar">
        <div className="logo">
            <Link to="/">logo</Link>
        </div>
        <div className="menuCon">
            <div className="leftMenu">
                <LeftMenu />
            </div>
            <div className="rightMenu">
                <RightMenu logout={logout} />
            </div>
            {/*<Button className="barsMenu" type="primary" onClick={showDrawer}>*/}
            {/*    <span className="barsBtn"></span>*/}
            {/*</Button>*/}
            {/*<Drawer*/}
            {/*    title="Basic Drawer"*/}
            {/*    placement="right"*/}
            {/*    closable={false}*/}
            {/*    onClose={onClose}*/}
            {/*    visible={visible}*/}
            {/*>*/}
            {/*    <LeftMenu />*/}
            {/*    <RightMenu />*/}
            {/*</Drawer>*/}
        </div>
    </nav>)
}

Navbar.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}
const mapStateToPros = state => ({
    user: state
});
const mapDispatchToProps = dispatch =>({
    logout: ()=>dispatch.login.asyncLogout(),
})
export default connect(mapStateToPros,mapDispatchToProps)(Navbar);