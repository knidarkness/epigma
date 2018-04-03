export const getCurrentHost = (port) => {
    let hostname;

    try {
        hostname = window.location.protocol + '//' + window.location.hostname;
    }
    catch(e) {
        if(e.name === "ReferenceError") {
            hostname = 'http://localhost';
        }
    }
    return `${hostname}:${port}`;
};