
import React, { Component } from 'react';
import Button from 'antd/lib/button';
import { Input, Icon, Alert } from 'antd';
import validator from 'email-validator';

import { connect } from 'react-redux';
import * as userActions from '../redux/actions/users';
import { bindActionCreators } from 'redux';

import { browserHistory } from 'react-router';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            userPasswords: '',
            confirmPassword: ''
        }
    }

    emitEmptyName() {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    }
    emitEmptyEmail() {
        this.userEmailInput.focus();
        this.setState({ userEmail: '' });
    }
    emitEmptyPassword() {
        this.userPasswordsInput.focus();
        this.setState({ userPasswords: '' });
    }
    emitEmptyConfirmPassword() {
        this.confirmPasswordInput.focus();
        this.setState({ confirmPassword: '' });
    }

    confirmPasswords() {
        if (this.state.userPasswords === this.state.confirmPassword) {
            return null;
        }
        return <Alert message="Error" description="Confirm your passwords please." type="error" showIcon />
    }

    isEmailExist() {
        for (let i = 0; i < this.props.users.length; i++) {
            if (this.state.userEmail === this.props.users[i].email) {
                return <Alert message="Error" description="This email is already exist." type="error" showIcon />
            }
        }
    }

    emailValid() {
        if (validator.validate(this.state.userEmail) || this.state.userEmail === '') {
            return null
        }
        return <Alert message="Error" description="Invalid email." type="error" showIcon />;
    }

    formValid() {
        if (
            this.state.userName.trim() !== '' &&
            this.state.userEmail.trim() !== '' &&
            this.state.userPasswords.trim() !== '' &&
            this.state.confirmPassword.trim() !== '' &&
            (this.state.userPasswords === this.state.confirmPassword)) {
            return true
        }
        return false;
    }

    createUser() {
        let user = {
            name: this.state.userName,
            email: this.state.userEmail,
            passwords: [this.state.userPasswords]
        };
        this.props.actions.createUser(user);
        this.props.actions.setActiveUser(user);
        this.setState({
            userName: '',
            wuserEmail: '',
            userPasswords: '',
            confirmPassword: ''
        });
        browserHistory.push('/dashboard');
    }


    render() {
        let {
            userName,
            userEmail,
            userPasswords,
            confirmPassword
        } = this.state;
        const nameSuffix = userName ? <Icon type="close-circle" onClick={this.emitEmptyName.bind(this)} /> : null;
        const emailSuffix = userEmail ? <Icon type="close-circle" onClick={this.emitEmptyEmail.bind(this)} /> : null;
        const passwordSuffix = userPasswords[0] ? <Icon type="close-circle" onClick={this.emitEmptyPassword.bind(this)} /> : null;
        const confirmPasswordSuffix = confirmPassword ? <Icon type="close-circle" onClick={this.emitEmptyConfirmPassword.bind(this)} /> : null;
        return (
            <div className="sign-up">
                <Input
                    prefix={<Icon type="user" />}
                    placeholder="Enter your name please"
                    suffix={nameSuffix}
                    className="sign-up-input"
                    value={userName}
                    onChange={e => this.setState({ userName: e.target.value })}
                    ref={node => this.userNameInput = node} />
                <Input
                    prefix={<Icon type="mail" />}
                    placeholder="Enter your email please"
                    suffix={emailSuffix}
                    className="sign-up-input"
                    value={userEmail}
                    onChange={e => this.setState({ userEmail: e.target.value })}
                    ref={node => this.userEmailInput = node} />
                {this.isEmailExist()}
                {this.emailValid()}
                <Input
                    prefix={<Icon type="lock" />}
                    suffix={passwordSuffix}
                    placeholder="Enter your password please"
                    className="sign-up-input"
                    value={userPasswords}
                    onChange={e => this.setState({ userPasswords: e.target.value })}
                    ref={node => this.userPasswordsInput = node}
                    type="password" />
                <Input
                    prefix={<Icon type="lock" />}
                    suffix={confirmPasswordSuffix}
                    placeholder="Confirm password please"
                    className="sign-up-input"
                    value={confirmPassword}
                    onChange={e => this.setState({ confirmPassword: e.target.value })}
                    onPressEnter={this.createUser.bind(this)}
                    ref={node => this.confirmPasswordInput = node}
                    type="password" />
                <Button type="primary"
                    onClick={this.createUser.bind(this)}
                    disabled={!this.formValid() || this.isEmailExist() || this.emailValid()}>
                    Sign Up
                </Button>
                {this.confirmPasswords()}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    users: store.usersStore.users
});

const mapDispatchToProps = dispatch => ({
    actions: {
        createUser: bindActionCreators(userActions.createUser, dispatch),
        setActiveUser: bindActionCreators(userActions.setActiveUser, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
