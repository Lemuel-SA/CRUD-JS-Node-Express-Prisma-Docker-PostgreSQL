const express = require("express")
const crudroutes = express.Router()
const {PrismaClient} = require("@prisma/client")
const { response } = require("express")

const prisma = new PrismaClient()

//Create Users

crudroutes.post ("/Users", async (request,response) => {
    const {name} = request.body
    const users = await prisma.users.create({
            data:{ 
            name,
            status: false
    },
})
   // AllUsers.push({name,status:false})
    return response.status(201).json(users)
})


//Read Users

crudroutes.get("/Users", async (request,response) => {
    const users = await prisma.users.findMany()
    return response.status(200).json(users)

})


//Update Users

crudroutes.put("/Users", async (request,response) => {
    const { id, name, status} = request.body

    if(!id){
        return response.status(400).json("Id is mandatory!")
    }

    const useralreadyexist = await prisma.users.findUnique({ where: {id}})
    if (!useralreadyexist) {
        return response.status(404).json("User doesn't exist!")
    }

    const users = await prisma.users.update({
        where: {
            id,
        },
        data:{
            name,
            status,
        },
    })
    
return response.status(200).json(users)
})



//Delete Users

crudroutes.delete("/Users/:id", async (request,response) => {

    const{id} = request.params

    const intId = parseInt(id)

if(!intId){
    return response.status(400).json("Id is mandatory!")
}

const useralreadyexist = await prisma.users.findUnique({ where: {id: intId}})

if (!useralreadyexist) {
    return response.status(404).json("User doesn't exist!")
}

await prisma.users.delete({where: {id: intId}})
return response.status(200).send()

}) 



module.exports = crudroutes