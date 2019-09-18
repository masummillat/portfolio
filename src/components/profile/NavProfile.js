import React from 'react';
import { Menu, Divider, Avatar } from 'antd';
import PropTypes from "prop-types";
import { Link, Redirect } from 'react-router-dom';
const NavProfile = ({logout, ...rest}) => {
const doLogout = () => {
  logout()
    .then(res=>{
      rest.history.push('/auth');
    })
    .catch(err=>{
      console.log(err)
    })
}
    return(
          <Menu>
            <Menu.Item style={{fontWeight:600, fontSize: '14px'}}>
              <Link to="/profile" >
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                Masum Millat
              </Link>
            </Menu.Item>
            {/*<Divider/>*/}
            <Menu.Item>
              <Link to="new-story" >
                New Story
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="new-story" >
                Stories
              </Link>
            </Menu.Item>
            {/*<Divider/>*/}
            <Menu.Item>
              <Link to="/@masummillat" >
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/setting" >
                Setting
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/help" >
                Help
              </Link>
            </Menu.Item>
            <Menu.Item onClick={doLogout}>
              Logout
            </Menu.Item>

          </Menu>
    );
}
NavProfile.propTypes = {
    logout: PropTypes.func.isRequired,
};


export default NavProfile;