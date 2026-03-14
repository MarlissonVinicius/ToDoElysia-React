import { useState } from "react";
import "./index.css"
function App(){

  const respAPI = [
  {
    id: 1,
    name: "Estudar Elysia",
    description: "Aprender rotas e validação de dados no backend",
    status: "todo"
  },
  {
    id: 2,
    name: "Criar API de tarefas",
    description: "Implementar CRUD completo para tasks",
    status: "doing"
  },
  {
    id: 3,
    name: "Integrar com React",
    description: "Consumir API usando fetch no frontend",
    status: "todo"
  },
  {
    id: 4,
    name: "Criar componente de task",
    description: "Construir componente reutilizável para exibir tarefas",
    status: "doing"
  },
  {
    id: 5,
    name: "Finalizar layout",
    description: "Ajustar CSS do board de tarefas",
    status: "done"
  }
]

  const taskCard = (task) => {
    return(
      <div key={task.id}>
        <h3>{task.id} - {task.name}</h3>
        <p>{task.description}</p>
      </div>
    )
  }

  let [open, setOpen] = useState(false)

  const teste = () => alert('enviado')
  return(
    <div className="container">
      <div className="formContainer">
        <form onSubmit={teste}>
          <input type="text"placeholder="Título"/>
          <input type="text" placeholder="Descrição"/>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div>
      <button onClick={() => setOpen(true)}>Abrir Popup</button>

      {open && (
        <div className="popup">
          <div className="popupContent">
            <h2>Meu Popup</h2>
            <p>Conteúdo aqui</p>

            <button onClick={() => setOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>

      <div className="cardsContainer">
        <div className="cardStatus" id="todo">
          {respAPI.map( task => {
            if(task.status === 'todo'){
              return cardTask(task)
            }
          })}
        </div>
        <div className="cardStatus" id="doing">
            {respAPI.map( task => {
            if(task.status === 'doing'){
              return cardTask(task)
            }
          })}
        </div>
        <div className="cardStatus" id="done">
          {respAPI.map( task => {
            if(task.status === 'done'){
              return cardTask(task)
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default App