//O react funciona com elementos, criados a partir de funções ou arrow functions que tem como retorno código html 

import { useState } from "react" //método utilizado para verificar quando há a mudança no estado de um elemento  

//retorno simples com o retorno de apenas 1 tag  
const Header = () => {
    return <h1>Teste de título 1 </h1>
}


//Interpolação, utilização de dados de vairáveis ou constantes dentro de código
const linkImg = 'https://media.licdn.com/dms/image/v2/D4D22AQFFicR9243WyQ/feedshare-shrink_800/B4DZlTyU0qJAAg-/0/1758047326251?e=2147483647&v=beta&t=0GKhMX8dOwArRabNF-Wbv7FIWg4huU5HEWJl0h8Rz_M'

const usuario = 'Marlisson'

//retorno de mais de 1 tag com a utilização de divs 
const Elements = () =>{ 
    return(
        <div style={{display:"flex"}}>
            <div style={{backgroundColor:"gray"}}>
            <Header></Header>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis eos eum repellat soluta illo porro, fugit, nemo, quos voluptatem libero temporibus ea nostrum corporis beatae nihil ad illum doloribus autem?</p>
            </div>
            <div>
                <h2>Olá eu sou o {usuario}</h2>
                {/*Utilização da interpolação na definição d altura e largura e também na utilização da variável linkImg */ }
                <img width={600} height={400} src={linkImg} alt="" />
            </div>
        </div>
    )
}

//Props ou propriedade, é a capacidade de receber um parâmetro na chamada da função e utiliza-lo como quiser, podendo ser essa prop uma string, função, objeto, array, etc...

const Props = ({nome, paragrafo}) =>{
    return(
     <div>
        {/*Faz a verificação se nome é diferente de nulo*/}
        <h1>Olá eu sou o {nome ? nome : 'Sem nome' }</h1>

        {paragrafo ? 
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto sapiente veritatis tempora eaque, fugit quae, sequi unde, doloribus laborum officiis quasi voluptate fugiat atque! Provident vero doloremque eligendi? Soluta, iste.</p>
        : 
        <p></p>
        }
        <hr />
     </div>
    ) 
}

//Estado é como uma memória dos componentes individualmente, que ao ser alterado o react entende que tem que renderizar aquele elemento para que o valor seja atualizado e exibido para o usuário
const Estado = () =>{
    const [text, setText] = useState('Texto 1') //estado inicial e função para modificar o valor 
    const [inputText, setInputText] = useState('') //estado para guardar o que é digitado no input 

    const clicou = () => {setText(inputText)} //função que faz a atualização  do texto 

    return(
        <div>
            <h1>{text}</h1>
            <input onChange={(e) => setInputText(e.target.value)} /> {/*À cada letra digitada o texto é atualizado no estado inputText */}
            <button onClick={clicou}>Mudar Texto</button>
        </div>

    )
}

const Lista = () => {
    let cor = ''
    const produtos = [ 
        {titulo: 'goiaba', isFruit:true},
        {titulo: 'abóbora', isFruit:false},
        {titulo: 'banana', isFruit:true}
    ]

    const listItem = produtos.map(produto =>
        <li style={{color: produto.isFruit ? 'green': 'red'}}>
            {produto.titulo}
        </li>
    )
    return(
        <div>
            <ul>
                {listItem}
            </ul>
        </div>
    )
}

const Cont = () => {
    const [cont, setCont] = useState(0)

    const somar = () => {setCont(cont + 1)}
    const subtrair = () => {setCont(cont - 1)}

    return(
            <div>
                <h1>Contador: {cont}</h1>
                <button onClick={somar}>+</button>
                <button onClick={subtrair}>-</button>
            </div>
        )
}
//exportação de funçaõ para ser utilizada em outros arquivos 
export default Cont; 