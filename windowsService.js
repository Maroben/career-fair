const Service = require("node-windows").Service
const path = require("path")

const svc = new Service({
    name: "Career Fair",
    description: "HSR Stellenboerse",
    script: path.join(__dirname, "dist", "server.js"),
    nodeOptions: ["--harmony", "--max_old_space_size=4096"]
})

svc.on("install", () => {
    console.info("Installing Service ...")
    svc.start()
})

svc.install()
