import React from "react";
import { useState } from "react";
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import * as Components from '../../components/Overlay/Components';
import Overlay from "../../components/Overlay/index";


function Home() {

   const [isOpen, setIsOpen] = useState(false);

   const toggleOverlay = () => {
      setIsOpen(!isOpen);
   };
   const [signIn, toggle] = React.useState(true);

   return (
   <div className="App">
      <>
         <Header />
         <section className='container'>
            <div className='apresentacao'>
               <p>
                  Bem vindo ao <br />
                  <span>Ajuda Aluno</span> <br />
               </p>
               <button className='btn btn-blue' onClick={toggleOverlay}>
                  Entrar
               </button>
            </div>
            <figure>
               <img className='img-home' src='/student.svg' alt='Home image' />
            </figure>
         </section>
         <Footer />
      
         <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <Components.Container>
               <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='Nome' />
                     <Components.Input type='email' placeholder='Email' />
                     <Components.Input type='Senha' placeholder='Senha' />
                     <Components.Button>Sign Up</Components.Button>
                  </Components.Form>
               </Components.SignUpContainer>
               <Components.SignInContainer signinIn={signIn}>
                  <Components.Form>
                     <Components.Title>Sign in</Components.Title>
                     <Components.Input type='email' placeholder='Email' />
                     <Components.Input type='Senha' placeholder='Senha' />
                     <Components.Anchor href='#'>Esqueceu sua senha?</Components.Anchor>
                     <Components.Button>Sigin In</Components.Button>
                  </Components.Form>
               </Components.SignInContainer>
               <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>
                     <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                           To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                           Sign In
                        </Components.GhostButton>
                     </Components.LeftOverlayPanel>
                     <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Bem vindos</Components.Title>
                        <Components.Paragraph>
                           Cadastre-se e tenha uma jornada diferenciada
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                           Sigin Up
                        </Components.GhostButton>
                     </Components.RightOverlayPanel>
                  </Components.Overlay>
               </Components.OverlayContainer>
            </Components.Container>    
         </Overlay>
      </>
      </div>
   )
}

export default Home
