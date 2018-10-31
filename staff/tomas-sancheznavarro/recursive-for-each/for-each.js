module.exports = function forEach(arr, callback) {

    const copy = Array.from(arr)

    if (!copy.length) return

    const firstValue = copy.shift()
    if (callback) {
        callback(firstValue)
        forEach(copy, callback)
    }
    else {
        console.log(firstValue)
        forEach(copy)
    }
}