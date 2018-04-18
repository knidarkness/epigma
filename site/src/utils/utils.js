export const getCurrentHost = (port) => {
    let hostname;

    try {
        hostname = `${window.location.protocol}//${window.location.hostname}`;
    } catch (e) {
        if (e.name === 'ReferenceError') {
            hostname = 'http://localhost';
        }
    }
    return `${hostname}:${port}`;
};

export const getCenterPoint = (selector) => [
    document.querySelector(selector).getBoundingClientRect().width / 2,
    document.querySelector(selector).getBoundingClientRect().height / 2
];

const dist2 = (v, w) => {
    return Math.pow(Math.abs(v[0] - w[0]), 2) + Math.pow(Math.abs(v[1] - w[1]), 2);
};

export const distToSegment = (p, v, w) => {
    const l2 = dist2(v, w);

    if (l2 === 0) {
        return dist2(p, v);
    }

    const t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;

    if (t < 0) {
        return Math.sqrt(dist2(p, v));
    }
    if (t > 1) {
        return Math.sqrt(dist2(p, w));
    }

    return Math.sqrt(dist2(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]));
};