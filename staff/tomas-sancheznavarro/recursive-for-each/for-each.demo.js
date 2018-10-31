var forEach = require('./for-each')

const nums = [1, 2, 3]

forEach(nums, 0, (index, n) => console.log(index, n))