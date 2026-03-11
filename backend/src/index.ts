import { Elysia,t } from "elysia";
import Database from "bun:sqlite";
import openapi from "@elysiajs/openapi";

//criar banco de dados
const db = new Database('Database.db')

//deletar tabela temporáriamente
db.run(`
    DROP TABLE IF EXISTS tasks
  `)

//criar tabela caso não exista 
db.run(`
    CREATE TABLE IF NOT EXISTS tasks(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      done BOOLEAN 
    )
  `)

//inserir dados na tabela para testes
db.run(`
    INSERT INTO tasks(name,description,done) VALUES
    ('Estudar Elysia', 'Aprender rotas e validação de dados no Elysia', false),
    ('Criar API de tarefas', 'Implementar endpoints CRUD para tasks', false),
    ('Conectar com React', 'Consumir a API de tarefas no frontend React', false);
  `)



const app = new Elysia()
  //criar uma task a partir o body
  .post('/tasks', ({body}) => {
    db.run(`
        INSERT INTO tasks(name,description,done)
        VALUES(?,?,?)`,[body.name,body.description,body.done])
    return {message:'Tarefa criada com sucesso'}
  },{ //validação de tipagem 
    body:t.Object({
      name:t.String(),
      description:t.String(),
      done:t.Boolean()
    })
  })

  //ler todos os dados 
  .get('/tasks', () => {
    return db.query('SELECT * FROM tasks').all()
  })

  //ler uma tarefa específica recebendo pelo param{id} 
  .get('/tasks/:id', ({params:{id}}) => {
    return db.query(`
        SELECT * FROM tasks
        WHERE id = ?`).get(id)
  },{
    params:t.Object({
      id:t.Number()
    })
  })

  //modificar uma tarefa a partir da query e body 
  .put('/tasks', ({query,body}) => {
    if(body.name != undefined){
      db.run(`
          UPDATE tasks
          SET name = ?
          where id = ?
        `,[body.name,query.id])
    }
    if(body.description != undefined){
      db.run(`
          UPDATE tasks
          SET description = ?
          where id = ?
        `,[body.description,query.id])
    }
    if(body.done != undefined){
      db.run(`
          UPDATE tasks
          SET done = ?
          where id = ?
        `,[body.done,query.id])
      }
    return {message:'Tarefa atualizada com sucesso'}
  },{
      query:t.Object({
        id:t.Number()
      }),
      body:t.Object({
        name:t.Optional(t.String()),
        description:t.Optional(t.String()),
        done:t.Optional(t.Boolean())
      })
  })

  //deletar uma task com params 
  .delete('/tasks/:id', ({params:{id}}) => {
    db.run(`
        DELETE FROM tasks
        WHERE id = ?`,[id])
    return {message:'Tarefa apagada com sucesso '}
  },{
    params:t.Object({
      id:t.Number()
    })
  })

  .use(openapi())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
