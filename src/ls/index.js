import stub from './stub'
import tracking from './tracking'

// const global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
const global = typeof window !== "undefined" ? window : {};

let ls = 'localStorage' in global && global.localStorage ? global.localStorage : stub;

const get = key => JSON.parse(ls.getItem(key));

const set = (key, value) => {
    try {
        ls.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        return false;
    }
};

const clear = () => ls.clear();

const backend = store => {
    store && (ls = store);
    return ls;
};

const accessor = (key, value) => undefined === value
    ? get(key)
    : set(key, value);

accessor.set = set;
accessor.get = get;
accessor.getItem = key => ls.getItem(key);
accessor.remove = key => ls.removeItem(key);
accessor.clear = clear;
accessor.backend = backend;
accessor.on = tracking.on;
accessor.off = tracking.off;

export default accessor
