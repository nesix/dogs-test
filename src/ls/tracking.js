
let listeners = {};
let listening = false;

const listen = () => {
    if (window.addEventListener) {
        window.addEventListener('storage', change, false);
    } else if (window.attachEvent) {
        window.attachEvent('onstorage', change);
    } else {
        window.onstorage = change;
    }
};

const change = event => {
    if (!event) event = window.event;
    const fire = listener => listener(JSON.parse(event.newValue), JSON.parse(event.oldValue), event.url || event.uri);
    (listeners[event.key] || []).forEach(fire);
};

const on = (key, fn) => {
    if (listeners[key]) {
        listeners[key].push(fn);
    } else {
        listeners[key] = [fn];
    }
    (false === listening) && listen();
};

const off = (key, fn) => {
    let ns = listeners[key];
    if (ns.length > 1) {
        ns.splice(ns.indexOf(fn), 1);
    } else {
        listeners[key] = [];
    }
};

export default {
    on,
    off
}
