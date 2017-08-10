import * as C from '../constants/users';

export const createUser = user => ({
    type: C.CREATE_USER,
    payload: user
});

export const setActiveUser = user => ({
    type: C.SET_ACTIVE_USER,
    payload: user
});

export const signOut = user => ({
    type: C.SIGN_OUT,
    payload: user
});

export const addNewPassword = password => ({
    type: C.ADD_NEW_PASSWORD,
    payload: password
});

export const deletePassword = password => ({
    type: C.DELETE_PASSWORD,
    payload: password
});

export const setEditItem = item => ({
    type: C.SET_EDIT_ITEM,
    payload: item
});

export const resetEditItem = () => ({
    type: C.RESET_EDIT_ITEM
});

export const editPassword = password => ({
    type: C.EDIT_PASSWORD,
    payload: password
});

export const setCurrentPass = password => ({
    type: C.SET_CURRENT_PASS,
    payload: password
});
