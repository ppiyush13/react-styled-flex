export default fn => {
    const result = {};
    const resultKey = 'R';
    return () => {
        result[resultKey] = Object.prototype.hasOwnProperty.call(result, resultKey)
            ? result[resultKey]
            : fn();
        return result[resultKey];
    };
};
