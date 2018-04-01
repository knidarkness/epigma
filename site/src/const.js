const host = window.document.location.host.replace(/:.*/, '');
export const DOCUMENT_LIST_URI = 'http://' + host + ':3000/api/document';
export const EDITOR_MODE = {
    DRAW: 'DRAW_MODE',
    VIEW: 'VIEW_MODE',
    DELETE: 'DELETE_MODE'
};

export const CURSOR = {
    DRAW: 'crosshair',
    EDIT: 'crosshair',
    DELETE: 'crosshair',
    VIEW: 'grab',
    DEFAULT: 'auto',       
}
