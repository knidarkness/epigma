import {getCurrentHost} from "utils/utils";

const host = getCurrentHost(3000);
export const API_URI = host + '/api';
export const DOCUMENT_LIST_URI = API_URI + '/document';

export const EDITOR_MODE = {
    DRAW: "DRAW",
    VIEW: "VIEW",
    EDIT: "EDIT"
};

export const CURSOR = {
    DRAW: 'crosshair',
    EDIT: 'crosshair',
    VIEW: 'grab',
    DEFAULT: 'auto',       
};
