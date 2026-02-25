import { createRoot } from "react-dom/client"

const element = document.getElementById('root')
if (element === null) {
 throw new Error('root nulo')   
}

element

const App = () => {
    return <h1>Título </h1>
} 

const root = createRoot(element)
root.render(<App></App>)
