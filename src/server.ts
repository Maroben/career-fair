import mongoose from "mongoose"
import bodyParser from "body-parser"
import config from "config"
import path from "path"
import express from "express"
const server = express()

mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

server.disable("x-powered-by")
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

import CompanyRoutes from "./communication/CompanyRoutes"
server.use("/api/companies", CompanyRoutes)

server.use(express.static(path.join(__dirname, "..", "dist", "frontend")))
server.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "frontend", "index.html"))
})

server.listen(config.get("port"), () => {
    console.info(`ready at port ${config.get("port")}`)
})

module.exports = server
