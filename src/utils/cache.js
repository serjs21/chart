export const measureTime = (callback) => {
    const now = new Date().valueOf();
    callback();
    return new Date().valueOf() - now;
}

export const memo = (cb, params) => {
    const cache = {};
    const hash = JSON.stringify(params);
    return () => {
        if (cache[hash]) return cache[hash];
        else {
        const value = cb();
        cache[hash] = value;
        return value;
        }
    }
}