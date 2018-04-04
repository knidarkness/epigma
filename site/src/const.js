import {getCurrentHost} from "./utils";

const host = getCurrentHost(3000);

export const DOCUMENT_LIST_URI = host + '/api/document';

export const EDITOR_MODE = {
    DRAW: 'DRAW_MODE',
    VIEW: 'VIEW_MODE',
    DELETE: 'DELETE_MODE',
    EDIT: 'EDIT_MODE'
};

export const CURSOR = {
    DRAW: 'crosshair',
    EDIT: 'crosshair',
    DELETE: 'crosshair',
    VIEW: 'grab',
    DEFAULT: 'auto',       
};
