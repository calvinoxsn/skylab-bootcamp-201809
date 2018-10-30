const http = require('http')
const bl = require('bl')

http.get(process.argv[2], (res) => { //bl pide todo el chunk y lo convierte a string directamente.
    res.pipe(bl((err, data) => { //pipe > conectar un tubo de datos a otro objeto que se dedica a recibir datos
        if (err) throw Error

        console.log(data.length)
        console.log(data.toString())
        // console.log(`${data.length}\n${content.toString()})
    }))
})
