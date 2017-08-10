import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/users';
import {bindActionCreators} from 'redux';

import PasswordEditor from './password-list/PasswordEditor';
import PasswordsList from './password-list/PasswordsList'


class Dashboard extends Component {

    componentWillMount(){
        for(let i = 0; i < this.props.users.length; i++){
            if(this.props.users[i].email === this.props.activeUser.email){
                this.props.users[i] = this.props.activeUser;
            }
        }
    }

    render(){
        let {
            name
        } = this.props.activeUser;
        if(this.props.activeUser !== null){
            return(
                <div className="user-dashboard">
                    <h1>Hello {name}!</h1>
                    <h2>Your passwords:</h2>
                    <PasswordsList />
                    <PasswordEditor />
                </div>
            )
        }
        return null
    }
}

const mapStateToProps = store => ({
    users: store.usersStore.users,
    activeUser: store.usersStore.activeUser
})

const mapDispatchToProps = dispatch => ({
    actions: {
        addNewPassword: bindActionCreators(userActions.addNewPassword, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);