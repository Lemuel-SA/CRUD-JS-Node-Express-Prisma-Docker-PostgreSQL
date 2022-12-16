const express = require("express")

const crudroutes2 = express.Router()
const {PrismaClient} = require("@prisma/client")
const { response } = require("express")

const prisma = new PrismaClient()


//Create Study Register

crudroutes2.post("/StudyRegister", async (request,response) =>{
    const {discipline,Subject, usersId} = request.body
    const register = await prisma.studyRegister.create({

            data:{  
                
            usersId,   
            discipline,
            Subject
        }
    })

    return response.status(201).json(register)
})

//Read Study Register


crudroutes2.get("/StudyRegister", async (request,response) => {
    const reg = await prisma.studyRegister.findMany()
    return response.status(200).json(reg)

})

// Update Study Register

crudroutes2.put("/StudyRegister", async (request,response) => {
    const { discipline, Subject} = request.body

    if(!discipline){
        return response.status(400).json("Discipline doesn't exist!")
    }

    
    if(!Subject){
        return response.status(400).json("Subject not found!")
    }

    const register = await prisma.register.update({
        where: {
            discipline,
            Subject,
        },
        data:{
            discipline,
            Subject,
        },
    })
    
return response.status(200).json(register)
})

//Delete Register

crudroutes2.delete("/StudyRegister/:discipline", async (request,response) => {

    const{discipline} = request.params


if(!discipline){
    return response.status(400).json("You need to write a valid discipline!")
}

const disciplinealreadyexist = await prisma.studyRegister.findUnique({ where: {discipline: discipline}})

if (!disciplinealreadyexist) {
    return response.status(404).json("Discipline doesn't exist!")
}

await prisma.studyRegister.delete({where: {discipline: discipline}})
return response.status(200).send()

}) 


module.exports = crudroutes2

//https://stackoverflow.com/questions/69886884/unique-constraint-failed-on-the-constraint-user-account-userid-key-in-prisma