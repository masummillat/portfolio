import React from 'react';
import {Layout, Card, Input, Form, Icon, Button, Checkbox} from 'antd';
import './login.css';
import {connect} from "react-redux";
import isAuthenticated from "../../utils/isAuthenticated";
import {Redirect} from "react-router";

const { Content } = Layout;
const Login =  Form.create({ name: 'form_in_modal' })(

    class Login extends React.Component {
        handleSubmit = e => {
            const {Login} = this.props;
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    Login({email: values.email, password: values.password});

                }

            });
        };

        render() {
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
                            state: { form: '/login' },
                        }}
                    />
                );
            }
            return (
                <Layout>
                    <Content>
                        <Card style={{width:300}}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item>
                                    {getFieldDecorator('email', {
                                        rules: [
                                            { required: true, message: 'Please input your Email!' },
                                            {type:'email', message: "Please input Email "}
                                            ],
                                    })(
                                        <Input
                                            type="email"
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="test@****.com"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox>Remember me</Checkbox>)}
                                    <a className="login-form-forgot" href="">
                                        Forgot password
                                    </a>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                    Or <a href="">register now!</a>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Content>
                </Layout>
            );
        }
    });

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
    Login: (payload)=>dispatch.login.asyncLogin(payload)
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);