import { Elysia, t } from "elysia";
import Database from "bun:sqlite";
import openapi from "@elysiajs/openapi";

//criar banco de dados
const db = new Database('Database.db')

//deletar tabela temporariamente
db.run(`
    DROP TABLE IF EXISTS tasks
`)

//criar tabela caso não exista 
db.run(`
    CREATE TABLE IF NOT EXISTS tasks(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      status TEXT CHECK(status IN ('todo','doing','done')) DEFAULT 'todo'
    )
`)

//inserir dados na tabela para testes
db.run(`
    INSERT INTO tasks(name,description,status) VALUES
    ('Estudar Elysia', 'Aprender rotas e validação de dados no Elysia', 'todo'),
    ('Criar API de tarefas', 'Implementar endpoints CRUD para tasks', 'doing'),
    ('Conectar com React', 'Consumir a API de tarefas no frontend React', 'done');
`)

const app = new Elysia()

  //criar uma task
  .post('/tasks', ({ body }) => {

    db.run(`
        INSERT INTO tasks(name,description,status)
        VALUES(?,?,?)
    `,[body.name, body.description, body.status])

    return { message:'Tarefa criada com sucesso' }

  },{
    body:t.Object({
      name:t.String(),
      description:t.String(),
      status:t.String()
    })
  })

  //listar tasks
  .get('/tasks', () => {
    return db.query('SELECT * FROM tasks').all()
  })

  //buscar task por id
  .get('/tasks/:id', ({params:{id}}) => {
    return db.query(`
        SELECT * FROM tasks
        WHERE id = ?
    `).get(id)
  },{
    params:t.Object({
      id:t.Number()
    })
  })

  //atualizar task
  .put('/tasks', ({query,body}) => {

    if(body.name !== undefined){
      db.run(`
        UPDATE tasks
        SET name = ?
        WHERE id = ?
      `,[body.name,query.id])
    }

    if(body.description !== undefined){
      db.run(`
        UPDATE tasks
        SET description = ?
        WHERE id = ?
      `,[body.description,query.id])
    }

    if(body.status !== undefined){
      db.run(`
        UPDATE tasks
        SET status = ?
        WHERE id = ?
      `,[body.status,query.id])
    }

    return {message:'Tarefa atualizada com sucesso'}

  },{
    query:t.Object({
      id:t.Number()
    }),
    body:t.Object({
      name:t.Optional(t.String()),
      description:t.Optional(t.String()),
      status:t.String()
    })
  })

  //deletar task
  .delete('/tasks/:id', ({params:{id}}) => {

    db.run(`
        DELETE FROM tasks
        WHERE id = ?
    `,[id])

    return {message:'Tarefa apagada com sucesso'}

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