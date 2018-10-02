import { EDIT_TOGGLE, EDIT_ON, EDIT_OFF } from './types';

// Action Creators

export const editToggle = () => ({
    type: EDIT_TOGGLE
});

export const editOn = () => ({
    type: EDIT_ON,
    editable: true
});

export const editOff = () => ({
    type: EDIT_OFF,
    editable: false
});
