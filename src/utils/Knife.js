const zip = (...arr) => {
    return Array(Math.max(...arr.map(a => a.length))).fill().map((_, i) => arr.map(a => a[i]))
};

const isScalarArraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export {
    zip,
    isScalarArraysEqual,
};