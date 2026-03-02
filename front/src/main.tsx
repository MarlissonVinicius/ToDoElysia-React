import { createRoot } from "react-dom/client"
import Tabuleiro from './EstudoBases/App'

const element = document.getElementById('root') //vai no documento html e pega a div element 
if (element === null) { //verifica se a div existe 
 throw new Error('root nulo')   
}

const root = createRoot(element)
root.render(<Tabuleiro></Tabuleiro>) //renderiza o código retonado pela função App
