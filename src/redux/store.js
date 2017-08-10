import users from './reducers/users';
import {createStore, combineReducers} from 'redux';

const main = combineReducers({
    usersStore: users
});

const store = createStore(main, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(function() {
    let state = store.getState();
    let {
        activeUser,
        users
    } = state.usersStore;
    localStorage.setItem('activeUser', JSON.stringify(activeUser));
    localStorage.setItem('users', JSON.stringify(users));
});

export default store;
