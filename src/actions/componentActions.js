import { SET_AREA_VALUE, SET_YRWK_VALUE } from './types';

// Action Creators

export const setAreaValue = area => ({
    type: SET_AREA_VALUE,
    value: area
});

export const setYrwkValue = yrwk => ({
    type: SET_YRWK_VALUE,
    value: yrwk
});
