import * as types from './types';
export const setSelectedShape = (id) => ({
    type: types.SET,
    id
});

export const clearSelectedShape = () => ({
    type: types.CLEAR
});
