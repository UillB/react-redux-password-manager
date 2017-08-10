import React, { Component } from 'react';
import '../../src/assets/styles/App.scss';

import { Popconfirm } from 'antd';

import { Link, browserHistory } from 'react-router';

import { connect } from 'react-redux';
import * as userActions from '../redux/actions/users';
import { bindActionCreators } from 'redux';

class App extends Component {

  signOut = () => {
    this.props.actions.signOut(null);
    browserHistory.push('/sign-up');
  }

  render() {
    return (
      <div>
        <ul className="navigation">
           {this.props.activeUser ? <li className="dashboard"><Link to="/dashboard">Dashboard</Link></li> : null} 
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
          {this.props.activeUser ?
           <li>
             <Popconfirm onConfirm={this.signOut} title="Are you sure？" okText="Yes" cancelText="No">
               <a>Sign Out</a>
             </Popconfirm>
           </li> : null}            
        </ul>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  activeUser: store.usersStore.activeUser
});

const mapDispatchToProps = dispatch => ({
  actions: {
    signOut: bindActionCreators(userActions.signOut, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
