import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../redux/actions/users';

import PasswordListItem from './PasswordListItem';


class PasswordsList extends Component {
    render() {
        let {
            activeUser
        } = this.props;
        return (
            <div>
                <ol>
                    {activeUser.passwords.map((pass, index) => {
                        return <PasswordListItem pass={pass} index={index} key={index} isActiveDelete={activeUser.passwords.length === 1} />
                    })}
                </ol>
            </div>
        )
    }
}





const mapStateToProps = store => ({
    users: store.usersStore.users,
    activeUser: store.usersStore.activeUser,
    isEdit: store.usersStore.isEdit
});

const mapDispatchToProps = dispatch => ({
    actions: {
        deletePassword: bindActionCreators(userActions.deletePassword, dispatch),

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordsList);