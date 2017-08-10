import React, { Component } from 'react';
import Button from 'antd/lib/button';
import { Input, Icon, Alert } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../../redux/actions/users';

class PasswordEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            isPasswordExist: false,
            isPasswordValid: true
        }
    }

    addNewPassword = () => {
        if (this.props.activeUser.passwords.includes(this.state.newPassword) === true) {
            this.setState({ newPassword: '', isPasswordExist: true });
            setTimeout(() => {this.setState({isPasswordExist: false})}, 2500);
            return;
        }
        if(this.state.newPassword === ''){
            this.setState({isPasswordValid: false});
            setTimeout(() => {this.setState({isPasswordValid: true})}, 2500);
            return;
        }
        this.props.actions.addNewPassword(this.state.newPassword);
        this.setState({ newPassword: '', isPasswordExist: false, isPasswordValid: true });
    }

    isPasswordExist() {
        if (this.state.isPasswordExist) {
            return <Alert message="Error" description="This password is already in your list." type="error" />;
        }
        if(!this.state.isPasswordValid){
            return <Alert message="Error" description="You can not add an empty feild." type="error" />            
        }
    }

    emitEmptyNewPasswordInput = () => {
        this.newPasswordInput.focus();
        this.setState({ newPassword: '' });
    }

    render() {
        let {
            newPassword
        } = this.state;
        const addPasswordSuffix = newPassword ? <Icon type="close-circle" onClick={this.emitEmptyNewPasswordInput} /> : null;
        return (
            <div className="pass-editor">
                {this.isPasswordExist()}
                <Input
                    prefix={<Icon type="lock" />}
                    suffix={addPasswordSuffix}
                    placeholder="Enter new password please"
                    value={newPassword}
                    onChange={e => this.setState({ newPassword: e.target.value })}
                    ref={node => this.newPasswordInput = node} />
                <Button type="primary" onClick={this.addNewPassword} className="pass-editor-btn">Add password</Button>
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
        addNewPassword: bindActionCreators(userActions.addNewPassword, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEditor);