// express 版服务器
const express = require('express')
const http = require('http')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    req.middlewares = []
    next()
})

function mw1(options) {
    return function (req, res, next) {
        req.middlewares.push('mw1')
        next()
    }
}

function mw2(req, res, next) {
    req.middlewares.push('mw2')
    next()
}

function mw3(req, res, next) {
    req.middlewares.push('mw3')
    res.end(JSON.stringify(req.middlewares))
}

app.use('/', mw1())
app.get('/article', mw2)
app.post('/user', mw2)
app.use(mw3)


// function mw0(options) {
//     return function (req, res, next) {
//         // if (options.whatEver) {
//         //     console.log('hi')
//         // }
//         // console.log('mw0')
//         console.log(req.body)
//         next()
//     }
// }

// app.use(mw0())

// function mw1(req, res, next) {
//     console.log('mw1')
//     next()
// }

// function mw2(req, res, next) {
//     console.log('mw2')
//     next()
// }

// function mw3(req, res, next) {
//     console.log('mw3')
//     res.end('done')
// }

// app.use(mw1)
// app.use(mw2)
// app.use(mw3)

// // app.use(mw1, mw2, mw3)

// app.use([mw1, mw2], mw3)

// app.use((err, req, res, next) => {
//     res.end(err)
// })

// app.use(require('./middlewares/auth'))

// app.use((req, res, next) => {
//     req.number = 1
//     next()
// })

// app.use((req, res) => {
//     console.log(`req.number: ${req.number}`)
//     res.end('end')
// })

// // 错误处理中间件
// app.use((err, req, res, next) => {
//     res.end(err)
// })

// app.use((req, res, next) => {
//     next('something wrong')
// })

// app.use((req, res, next) => {
//     console.log(`req.number: ${req.number}`)
//     next()
// })

// app.use((req, res) => {
//     req.number = 1
//     res.end('end')
// })

// app.use((req, res, next) => {
//     console.log('this is middleware no.1')
//     next()
// })

// app.use((req, res) => {
//     console.log('this is middleware no.2')
//     res.end('hello world')
// })

const server = http.createServer(app)

server.listen('9292')