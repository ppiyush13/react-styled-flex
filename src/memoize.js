export default fn => {
    let result = {}
    let resultKey = 'R'
    return () => {
        return result[resultKey] = result.hasOwnProperty(resultKey) ? result[resultKey]: fn()
    }
}