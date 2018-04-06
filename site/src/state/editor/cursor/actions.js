import * as types from "./types";

export const updateCursorPosition = (x, y) => ({
    type: types.POSITION_UPDATE,
    x,
    y
});