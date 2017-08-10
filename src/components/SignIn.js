
import React, { Component } from 'react';
import Button from 'antd/lib/button';
import { Input, Icon, Alert } from 'antd';

import {browserHistory} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../redux/actions/users';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: ''
        }
    }

    componentWillMount(){
        this.setState({auth: true});
    }

    emitEmptyEmail() {
        this.userEmailInput.focus();
        this.setState({ userEmail: '' });
    }

    emitEmptyPassword() {
        this.userPasswordInput.focus();
        this.setState({ userPassword: '' });
    }

    formValid() {
        return this.state.userEmail.trim() !== '' && this.state.userPassword.trim() !== '';
    }

    signIn() {
        let {
            users
        } = this.props;
        if(this.props.users.length !== 0) {
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                if (this.state.userEmail === user.email) {
                    if (user.passwords.some(password => password === this.state.userPassword)) {
                        this.props.actions.setActiveUser(user);
                        browserHistory.push('/dashboard');
                        return;
                    }
                    this.setState({auth: false});          
                }
                this.setState({auth: false});
            };
        }
        this.setState({auth: false});
     
    }

    validAuth(){
        if(this.state.auth){
            return true
        }
        return <Alert message="Invalid email or password." type="error" />;
    }

    render() {
        let {
            userEmail,
            userPassword
        } = this.state;
        const emailSuffix = userEmail ? <Icon type="close-circle" onClick={this.emitEmptyEmail.bind(this)} /> : null;
        const passwordSuffix = userPassword ? <Icon type="close-circle" onClick={this.emitEmptyPassword.bind(this)} /> : null;
        return (
            <div className="sign-up">
                <Input
                    prefix={<Icon type="mail" />}
                    suffix={emailSuffix}
                    placeholder="Enter your email please"
                    className="sign-up-input"
                    value={userEmail}
                    onChange={e => this.setState({ userEmail: e.target.value })}
                    ref={node => this.userEmailInput = node} />
                <Input
                    prefix={<Icon type="lock" />}
                    suffix={passwordSuffix}
                    placeholder="Enter your password please"
                    className="sign-up-input"
                    value={userPassword}
                    onChange={e => this.setState({ userPassword: e.target.value })}
                    ref={node => this.userPasswordInput = node} />
                <Button type="primary" onClick={this.signIn.bind(this)} disabled={!this.formValid()}>Sign In</Button>
                {this.validAuth()}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    users: store.usersStore.users,
    activeUser: store.usersStore.activeUser
});

const mapDispatchToProps = dispatch => ({
    actions: {
        setActiveUser: bindActionCreators(userActions.setActiveUser, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

