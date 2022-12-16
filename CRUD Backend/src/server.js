const express = require("express")
const cors = require("cors")
const crudroutes2 = require("./routeER")
const crudroutes = require("./routes")
const app = express()



app.use(express.json())
app.use(cors())
app.use(crudroutes)
app.use(crudroutes2)

app.get("/Teste", (require,response) => {
    return response.json("Servidor online!")
    
})

app.listen(8080, () => console.log("Server rodando na porta 8080! "))