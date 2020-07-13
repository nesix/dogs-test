
let ms = {};

const getItem = key => key in ms ? ms[key] : null;

const setItem = (key, value) => {
    ms[key] = value;
    return true;
};

const removeItem = key => {
    let found = key in ms;
    if (found) {
        return delete ms[key];
    }
    return false;
};

const clear = () => {
    ms = {};
    return true;
};

export default {
    getItem,
    setItem,
    removeItem,
    clear
}
