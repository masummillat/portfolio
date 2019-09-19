import React from 'react';
import { Button, Form, Input, Upload, Icon, message } from 'antd';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


const UpdateProfile = Form.create({ name: 'form_in_modal' })(

  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      loading: false,
      profilePic: null,
      displayName: null
    };


    handleSubmit = e => {
      e.preventDefault();
      console.log('asdlfjas')
      this.props.updateProfile({
        displayName: this.state.displayName,
        photo: this.state.profilePic
      }).then(res=>{
        // this.props.handleCancel()
      })
    };

    handleFileChange = e=>{
      this.setState({
        profilePic: e.target.files[0]
      })
    }
    handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    render() {



      const { user } = this.props;
      return (
        <form  onSubmit={this.handleSubmit}>
          <input name ="displayName" onChange={this.handleChange} type="text" defaultValue={user.displayName}/>
          <input type="file" onChange={this.handleFileChange}/>
          <button type="submit">Update</button>
        </form>
      );
    }
  }
);

export default UpdateProfile;