import React from "react";
import { Row, Col, Avatar } from 'antd';
import './profile.css';
import ProfileBody from './profileBody/ProfileBody';
const Profile = () => {
  return (
    <div className="profile-wrapper">
      <div className="profile-header" style={{marginTop:'20px',padding:'20px', backgroundColor:'#ffffff',}}>
        <div >
          <h1>Masum Millat</h1>
          <ul className="follow-wrapper">
            <li>33 Following</li>
            <li>31 Followers</li>
          </ul>
        </div>
        <div span={4}>
          <Avatar
            style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            size={150} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </div>
      </div>
      <div style={{marginTop:'20px', backgroundColor:'#ffffff', padding: '20px'}} >
        <div>
          <ProfileBody/>
        </div>
      </div>


    </div>
  );
};
export default Profile;
