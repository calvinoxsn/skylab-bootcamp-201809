const http = require('http')
const url = require('url')

const [, , port] = process.argv


const server = http.createServer(function (req, res) {
    const query = url.parse(req.url, true).query
    const path = url.parse(req.url, true).path.split("?")[0]

    if (path === "/api/parsetime") {

        const date = new Date(query.iso)
        const resp = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }
        res.writeHead(200, { "Content-Type": "application/json" })
        res.write(JSON.stringify(resp))

    } else if (path === "/api/unixtime") {

        const date = new Date(query.iso)
        const resp = {
            unixtime: date.getTime()

        }
        res.writeHead(200, { "Content-Type": "application/json" })
        res.write(JSON.stringify(resp))
    }
    res.end()

})

server.listen(port)

