import React from "react";
import { Button,Modal, Avatar } from 'antd';
import './profile.css';
import ProfileBody from './profileBody/ProfileBody';
import useProfileState from "./useProfileState";
const Profile = () => {
    const {visible, handleOk, handleCancel} = useProfileState(false);
    console.log(visible)
  return (
    <div className="profile-wrapper">
      <div className="profile-header" style={{marginTop:'20px',padding:'20px', backgroundColor:'#ffffff',}}>
        <div >
            <div className="profile-name">
                <h1>Masum Millat</h1>
                <Button type="primary" onClick={handleOk} ghost> Edit Profile </Button>
            </div>
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
    {/* profile edit Modal*/}
        <Modal
            title="Basic Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    </div>
  );
};
export default Profile;
