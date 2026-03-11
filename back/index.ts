import {Elysia,t} from "elysia";
import openapi from "@elysiajs/openapi";
import {Database} from "bun:sqlite";

const db = new Database('dataBase.db')

const app = new Elysia()
    .get('/', () => {
        return 'Hello Elysia'
    })

    .listen(3000)