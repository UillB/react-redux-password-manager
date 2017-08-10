import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../redux/actions/users';
import { Button, Input, Alert } from 'antd';

class PasswordListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: this.props.pass,
            hidePass: true,
            isEditPassValid: true
        }
    }

    deletePassword(e) {
        this.props.actions.deletePassword(e);
    }

    editPassword() {
        this.props.actions.setEditItem(this.props.index);
        this.props.actions.setCurrentPass(this.props.pass);
    }

    addEditedPassword = () => {
        if(this.state.pass === ''){
            this.setState({isEditPassValid: false});
            return;
        }
        if(this.props.activeUser.passwords.includes(this.state.pass)){
            this.setState({isEditPassExist: true});
            return;
        }
        this.props.actions.editPassword(this.state.pass);
        this.props.actions.resetEditItem();
    }

    closeEditedPassword = () => {
        this.props.actions.resetEditItem();
    }

    hidePass = () => {
        this.setState({ hidePass: false });
    }

    showPass = () => {
        this.setState({ hidePass: true });
    }

    isEditPassValid(){
        if(!this.state.isEditPassValid){
            return <Alert className="pass-list-edit-error" message="Error" description="You can not add an empty field." type="error" />
        }
        if(this.state.isEditPassExist){
            return <Alert className="pass-list-edit-error" message="Error" description="This password is already in your list." type="error" />
        }
    }

    render() {
        if (this.props.isEdit === this.props.index) {
            return (
                <li>
                    <Input value={this.state.pass}
                        onChange={evt => this.setState({ pass: evt.target.value })} className="pass-list-edit-input" />
                        {this.isEditPassValid()}
                    <div className="pass-list-edit-btns">
                        <Button type="primary" onClick={this.addEditedPassword} className="pass-list-edit-btn">Edit</Button>
                        <Button type="primary" onClick={this.closeEditedPassword} className="pass-list-edit-btn">Cancel</Button>
                    </div>

                </li>
            )
        }
        return (
            <li className="password-list-li">
                <span className="pass-list-pass">{this.state.hidePass ? '******' : this.props.pass}</span>
                <div className="pass-list-btns">
                    <Button className="pass-list-btn-delete"
                        icon="delete"
                        disabled={this.props.isActiveDelete}
                        onClick={this.deletePassword.bind(this, this.props.pass)}
                    />
                    <Button className="pass-list-btn"
                        icon="edit"
                        onClick={this.editPassword.bind(this)}
                    />
                    {this.state.hidePass ?
                        <Button className="pass-list-btn" icon="unlock" onClick={this.hidePass} /> :
                        <Button className="pass-list-btn" icon="lock" onClick={this.showPass} />
                    }
                </div>
            </li>
        )
    }
}

const mapStateToProps = store => ({
    activeUser: store.usersStore.activeUser,
    isEdit: store.usersStore.isEdit,
    currentPass: store.usersStore.currentPass
});

const mapDispatchToProps = dispatch => ({
    actions: {
        deletePassword: bindActionCreators(userActions.deletePassword, dispatch),
        setEditItem: bindActionCreators(userActions.setEditItem, dispatch),
        resetEditItem: bindActionCreators(userActions.resetEditItem, dispatch),
        setCurrentPass: bindActionCreators(userActions.setCurrentPass, dispatch),
        editPassword: bindActionCreators(userActions.editPassword, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordListItem);