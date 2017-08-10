import * as C from '../constants/users';

const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    activeUser: JSON.parse(localStorage.getItem('activeUser')) || null,
    isEdit: null,
    currentPass: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case C.CREATE_USER:
            return {
                ...state,
                users: state.users.concat(payload)
            };
        case C.SET_ACTIVE_USER:
            return {
                ...state,
                users: state.users,
                activeUser: payload
            };
        case C.SIGN_OUT:
            return {
                ...state,
                users: state.users,
                activeUser: payload
            };
        case C.ADD_NEW_PASSWORD:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.email === state.activeUser.email) {
                        user.passwords = user.passwords.concat(payload);
                    }
                    return user;
                })
            };
        case C.DELETE_PASSWORD:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.email === state.activeUser.email) {
                        user.passwords = user.passwords.filter(password => (password !== payload));
                    }
                    return user;
                })
            }
        case C.SET_EDIT_ITEM:
            return {
                ...state,
                isEdit: payload
            }
        case C.SET_CURRENT_PASS:
            return {
                ...state,
                currentPass: payload
            }
        case C.RESET_EDIT_ITEM:
            return {
                ...state,
                isEdit: null
            }
        case C.EDIT_PASSWORD:
            return {
                ...state,
                users: state.users.map(user => {
                    user.passwords = user.passwords.map(password => {
                        if (password === state.currentPass) {
                            password = payload
                        }
                        return password
                    });
                    return user;
                })
            }
        default:
            return state;
    }
}
