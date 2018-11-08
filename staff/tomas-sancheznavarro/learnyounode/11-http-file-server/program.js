const http = require('http')
const fs = require('fs')
let [, , port, url] = process.argv


const server = http.createServer(function (req, res) {
    fs.createReadStream(url).pipe(res)

})
server.listen(port)