import * as types from './types';

export const enableMode = (mode) => {
    return {
        type: types.ENABLE,
        mode
    };
};