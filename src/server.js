const express = require("express")
const server  = express()
const nunjucks = require("nunjucks")

const routes = require("./routes")

server.use(express.static("public"))

nunjucks.configure("src/views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.use(routes)

server.listen(3000)