
import './App.css';
import {AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd, AiOutlineUserAdd} from 'react-icons/ai'
import { useEffect, useState } from 'react';
import axios from "axios"
import { FcGraduationCap } from "react-icons/fc";


function Home() {

  //Função para adicionar o campo de visibilidade do input ao clicar no "Novo Usuário"

  async function handleWithNewButton () {
    setInputVisibility(!inputVisibility)
  }


//Função assíncrona para pegar os usuários do banco de dados pelo servidor
  async function getUsers(){
    const response = await axios.get("http://localhost:8080/Users")
    setUsers(response.data)
  }

//Função para criar o usuário através do inputValue, que será usado na confirmação do button.
async function createUser(){
  const response = await axios.post("http://localhost:8080/Users",{name: inputValue})
getUsers()
setInputVisibility(!inputVisibility)
setInputValue("")
}

//Função para deletar o usuário!

async function deleteUsers(todo) {
  const response = await axios.delete(
    `http://localhost:8080/Users/${todo.id}`
  );
  getUsers();
}

//Função para modificar o usuário!

async function modifyUser(todo) {
  const response = await axios.put("http://localhost:8080/Users", {
    id: todo.id,
    status: !todo.status,
  });
  getUsers();
}

//Função para editar o usuário!

async function editUser() {
  const response = await axios.put("http://localhost:8080/Users", {
  id: selectedUser.id,
  name: inputValue,
})
setSelectedUser()
setInputVisibility(false)
getUsers()
setInputValue("")
}

async function handleWithEditButtonClick(todo) {
  setSelectedUser(todo)
  setInputVisibility(true)
}

//Ajuste do centro da lista com o CSS
const Center = ({users}) =>{

  return (
    <div className="center">
      {users.map((todo) => {
        return(
          <div className="todo">
            <button onClick={() => modifyUser(todo)} 
            className='checkbox' style={{backgroundColor: todo.status ? "black" : "white"}}></button>
          <p>{todo.name}</p>
          <button> <AiOutlineFileAdd color='black' size={20}></AiOutlineFileAdd></button>
          <button onClick={() => handleWithEditButtonClick(todo)}>
            <AiOutlineEdit color='black' size={20}></AiOutlineEdit>
          </button>
          <button onClick={() => deleteUsers (todo)}> 
            <AiOutlineDelete color='black' size={20}></AiOutlineDelete>
          </button>
          </div>
          )
      })}
  </div>
  )
}

  const [users, setUsers] = useState([])

  const [inputValue, setInputValue] = useState("")

  const [inputVisibility, setInputVisibility] = useState(false)

  const [selectedUser, setSelectedUser] = useState()

  useEffect(() =>{
    getUsers()
  }, []) 

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1> <FcGraduationCap size={33}> </FcGraduationCap>      Registro de Estudos  </h1>
        </div>
        <Center users={users}></Center>

        <input
        value = {inputValue}
        style = {{display: inputVisibility ? "block" : "none"}} 
        onChange={(event) => {
          setInputValue(event.target.value)
        }}

         className="inputName"></input>
        <button onClick= {inputVisibility ? selectedUser ? editUser : createUser:  handleWithNewButton} className="newTaskButton">
        {inputVisibility ? "Confirmar" :  " Novo Usuário"}
        </button>
      </header>
      
    </div>
  );
}

export default Home;
