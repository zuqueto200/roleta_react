import { isDisabled } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import './App.css';
import roda from './roda.png'

const array = [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336]
const arrayCor = ['verde', 'preto', 'vermelho', 'preto', 'vermelho', 'preto', 'vermelho', 'preto', 'vermelho', 'preto', 'vermelho', 'preto', 'vermelho', 'preto', 'vermelho']

var posicaoCor = 'verde'
var saldo = 100
var ultimosResultados = []

var posicao = 0

function App() {


  const [blockBt, setBlockBt] = useState("")
  const [campoInput, setCampoInput] = useState(Number())


  function FnBt(corBT) {
    if (campoInput <= saldo) {
      if (saldo !== 0 && campoInput !== 0) {
        setBlockBt("disabled")


        var aleatorio = Math.floor(Math.random() * 15)

        posicao = array[aleatorio]
        posicaoCor = arrayCor[aleatorio]

        saldo = saldo - campoInput

        document.querySelector('.divImgIda').classList.add('ativaGiro')
        document.querySelector('.divImgPosicao').style.transform = `rotateZ(${posicao}deg)`


        setTimeout(() => {

          if (corBT === posicaoCor && posicaoCor === 'verde') { saldo = saldo + 12 * campoInput }
          if (corBT === posicaoCor && posicaoCor === 'vermelho') { saldo = saldo + 2 * campoInput }
          if (corBT === posicaoCor && posicaoCor === 'preto') { saldo = saldo + 2 * campoInput }

          ultimosResultados = ultimosResultados.concat(posicaoCor)


        }, 6000);

        setTimeout(() => {

          document.querySelector('.divImgPosicao').style.transform = `rotateZ(${0}deg)`
          document.querySelector('.divImgPosicao').style.transition = 'transform 1s'

          setTimeout(() => {

            document.querySelector('.divImgIda').classList.remove('ativaGiro')

            setBlockBt("")

          }, 1000);
        }, 7000);
      }
    } else { setCampoInput(saldo) }
  }



  useEffect(() => {

    FnLimpaCampo()
    console.log(campoInput)

  }, [campoInput])




  function FnLimpaCampo() {
    if (saldo < campoInput) { setCampoInput(0); }
  }

  function FnCampo(evt) {

    // console.log( document.querySelector('.inputSaldo').value)



    if (window.event.data >= 0 && window.event.data <= 9) {

      setCampoInput(Number(evt.target.value))

    }
  }




  return (
    <div className='centralizar'>

      <div className='divImgIda'>
        <div className='divImgVolta'>
          <div className='divImgPosicao'>


            <img className='imgRoda' width={300} height={300} src={roda} />

          </div>
        </div>
      </div>


      <div className='divSaldo'>
        <h1>R$ {saldo},00</h1>
        <div className='divBt'>

          <button className='preto' disabled={blockBt} onClick={() => { FnBt('preto'); }}>X2</button>
          <button className='verde' disabled={blockBt} onClick={() => { FnBt('verde'); }}>X12</button>
          <button className='vermelho' disabled={blockBt} onClick={() => { FnBt('vermelho'); }}>X2</button>

        </div>
      </div>
      <h2>APOSTA</h2>




      <input
        className='inputSaldo'
        id="inputSaldo"
        type="text"
        
        disabled={blockBt}
        autoFocus={true}
        value={campoInput} 
        onChange={(evt) => { FnCampo(evt) }}


      />

<div className='btOpcoes'>

      <button onClick={()=>setCampoInput(campoInput + 1)}>+1</button>
      <button onClick={()=>setCampoInput(campoInput + 5)}>+5</button> 
      <button onClick={()=>setCampoInput(campoInput + 10)}>+10</button> 
      <button onClick={()=>setCampoInput(campoInput * 2)}>X2</button> 
      <button onClick={()=>setCampoInput(parseInt(campoInput / 2))}>1/2</button> 
      <button onClick={()=>setCampoInput(saldo)}>MAX</button> 

</div>
      <div className='ultimos'>
        {ultimosResultados.map((e, i) => (

          <div className={'ultimos' + e} key={i}></div>

        ))}
      </div>





    </div>
  );
}

export default App;
