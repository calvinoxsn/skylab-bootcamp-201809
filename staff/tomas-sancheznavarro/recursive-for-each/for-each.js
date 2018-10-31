module.exports = function forEach(arr, index, callback) {

    // const copy = Array.from(arr)

    if (!arr.length) return

    if (index === arr.length) return// const firstValue = copy.shift()
    if (callback) {
        callback(index, arr[index])
        index++
        forEach(arr, index, callback)
    }
    // else {
    //     console.log(firstValue)
    //     forEach(copy)
    // }

}