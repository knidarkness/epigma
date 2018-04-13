import * as types from './types';

export const updateCursorIcon = (icon) => ({
    type: types.ICON_UPDATE,
    icon
});

export const updateCursorPosition = (x, y) => ({
    type: types.POSITION_UPDATE,
    x,
    y
});
