const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(express.Router())

app.get("/", (req, res) => {
    res.send("Opa")
})


app.listen(8085, () => {
    console.log("Server rodando na porta http://localhost:8085")
})