import { SET_USER_TYPE } from './types';

// Action Creators

export const setUserType = userType => ({
    type: SET_USER_TYPE,
    userType
});
