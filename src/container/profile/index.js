import React from "react";
import { Button,Modal, Avatar } from 'antd';
import './profile.css';
import ProfileBody from './profileBody/ProfileBody';
import useProfileState from "./useProfileState";
import UpdateProfile from './updateProfile/UpdateProfile';
import { connect } from 'react-redux';
const Profile = ({updateProfile, user}) => {
    console.log(user)
    const {visible, handleOk, handleCancel} = useProfileState(false);
  return (
    <div className="profile-wrapper">
      <div className="profile-header" style={{marginTop:'20px',padding:'20px', backgroundColor:'#ffffff',}}>
        <div >
            <div className="profile-name">
                <h1>{user ? user.displayName :''}</h1>
                <p>bio</p>
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
            size={150} src={user ? user.photoURL: ''} />
        </div>
      </div>
      <div style={{marginTop:'20px', backgroundColor:'#ffffff', padding: '20px'}} >
        <div>
          <ProfileBody/>
        </div>
      </div>
    {/* profile edit Modal*/}
        <Modal
            title="Update Info"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
          <UpdateProfile  user={user} handleCancel={handleCancel} handleOK={handleOk} updateProfile={updateProfile}/>
        </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
    user: state.auth.user,
});
const mapDispatchToProps = dispatch => ({
  updateProfile : payload => dispatch.auth.asyncUpdateProfile(payload)
})
export default connect(mapStateToProps,mapDispatchToProps)(Profile);
