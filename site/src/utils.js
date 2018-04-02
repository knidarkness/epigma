export const getCurrentHost = (port) => {
    let hostname;
    if(window){
        hostname = window.location.protocol + '//' + window.location.hostname;
    } else {
        hostname = 'http://localhost';
    }
    return `${hostname}:${port}`;
};