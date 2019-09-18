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
    };


    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.props.updateProfile({
            displayName: values.name,
            photo: values.photo[0]
          }).then(res=>{
            // this.props.handleCancel()
          })
        }
      });
    };

    normFile = e => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };



    render() {
      const { getFieldDecorator } = this.props.form;
      console.log(this.props)

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const { user } = this.props;
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Display Name">
            {getFieldDecorator('name', { initialValue: user.displayName }, {
              rules: [
                {
                  type: 'string',
                  message: 'Input your name',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Display Name">
            {getFieldDecorator('userPhoto', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(<Form.Item label="Upload" >
              {getFieldDecorator('photo', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="photo" listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>,
              )}
            </Form.Item>)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="danger" onClick={this.props.handleCancel} style={{marginRight:'10px'}}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
);

export default UpdateProfile;