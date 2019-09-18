import React from 'react';
import {Card, Input, Form, Icon, Button, Checkbox} from 'antd';
import './login.css';
import {connect} from "react-redux";
import isAuthenticated from "../../utils/isAuthenticated";
import {Redirect} from "react-router";


const Signup =  Form.create({ name: 'form_in_modal' })(

  class Signup extends React.Component {
    state = {
      confirmDirty: false,
    };
    handleSubmit = e => {
      const {Signup} = this.props;
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          Signup({email: values.email, password: values.password})
            .then(res=>{
              if (this.props.location.state !== undefined) {
                this.props.history.push(this.props.location.state.from.pathname);
              }else {
                this.props.history.push('/');
              }
            })
            .catch(err=>{
              console.log(err)
            })

        }

      });
    };
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };



    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };

    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    render() {
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
      const { getFieldDecorator } = this.props.form;
      if (isAuthenticated()) {
        if (this.props.location.state !== undefined) {
          return (
            <Redirect
              to={{
                pathname: this.props.location.state.from.pathname,
                state: { from: this.props.location.pathname },
              }}
            />
          );
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { form: '/signup' },
            }}
          />
        );
      }
      return (

        <Card style={{width:600}}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>

      );
    }
  });

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
  Signup: (payload)=>dispatch.login.asyncSignup(payload)
})
export default connect(mapStateToProps,mapDispatchToProps)(Signup);