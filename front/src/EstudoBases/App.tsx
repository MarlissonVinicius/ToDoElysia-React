//bibliotecas que serão utilizadas no código 
import { useState } from "react";


const Quadrado = ({valor}) => {
    return <button className="quadrado"> {valor} </button> //Botões filhos que são gerados ao serem chamados 
}

const Tabuleiro = () => { //Declaração arrow function, que será chamada e retornará um código html 

        const [quadrados, setQuadrados] = useState(Array(9).fill(null)) //definindo o array que guardará o estado dos 9 quadrados filhos

    return (
        <>
            <div className="linhaTabuleiro">
                <Quadrado valor={quadrados[0]}/> {/*Definição do quadrado filho que passa a sua posição no array de estados */}
                <Quadrado valor={quadrados[1]}/>
                <Quadrado valor={quadrados[2]}/>
            </div>
            <div className="linhaTabuleiro">
                <Quadrado valor={quadrados[3]}/>
                <Quadrado valor={quadrados[4]}/>
                <Quadrado valor={quadrados[5]}/>
            </div>
            <div className="linhaTabuleiro">
                <Quadrado valor={quadrados[6]}/>
                <Quadrado valor={quadrados[7]}/>
                <Quadrado valor={quadrados[8]}/>
            </div>
        </>
    )
}

export default Tabuleiro; //exporta-la para ser utilizada em outro arquivo 