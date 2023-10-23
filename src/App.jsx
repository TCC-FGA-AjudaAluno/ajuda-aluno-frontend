import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <section className='container'>
        <div className='apresentacao'>
          <p>
            Bem vindo ao <br/>
            <span>Ajuda Aluno</span> <br/>  
          </p>
          <button className='btn btn-blue'>
            Entrar
          </button>
        </div>
        <figure>
          <img className='img-home' src='./public/student.svg' alt='Home image'/>
        </figure>
      </section>
      <Footer/>
    </>
  )
}

export default App
