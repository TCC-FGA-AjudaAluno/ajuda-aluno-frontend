import React from "react";
import { useState } from "react";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from 'formik';
import { registerValidation , usernameValidate  } from "../../helper/validate.js";
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from "../../store/store.js";
import { registerUser , verifyPassword } from "../../helper/helper.js";

import * as Components from '../../components/Overlay/Components';
import Overlay from "../../components/Overlay/index";
import Container from "../../components/Container";
import styles from "./Home.module.css"



function Home() {

   const navigate = useNavigate()
   //const setUsername = useAuthStore(state => state.setUsername);

   const [isOpen, setIsOpen] = useState(false);

   const formik = useFormik({
      initialValues : {
         email: 'doyol56239@cnogs.com',
         username: 'example123',
         password : 'admin@123'
      },
      validate : registerValidation,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
         let registerPromise = registerUser(values)
         toast.promise(registerPromise, {
           loading: 'Creating...',
           success : <b>Register Successfully...!</b>,
           error : <b>Could not Register.</b>
         });
   
         registerPromise.then(function(){ navigate('/home')});   
         }
   })

   const setUsername = useAuthStore(state => state.setUsername);
   const formikUser = useFormik({
      initialValues : {
         username: 'example123',
         password : 'admin@123'
      },
      validate : usernameValidate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
      
         setUsername(values.username)
         let loginPromise = verifyPassword({ username : values.username , password : values.password })
         toast.promise(loginPromise, {
         loading: 'Checking...',
         success : <b>Login Successfully...!</b>,
         error : <b>Password Not Match!</b>
         });

         loginPromise.then(res => {
            let { token } = res.data;
            localStorage.setItem('token', token);
            navigate('/home')
          })

         }
   })


   const toggleOverlay = () => {
      setIsOpen(!isOpen);
   };
   const [signIn, toggle] = React.useState(true);

   return (
      <div className="App">
      <>
         <Header />
         <Container>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <section className={styles.home}>
               <div className={styles.apresentacao}>
                  <p>
                     Bem vindo ao <br />
                     <span>Ajuda Aluno</span> <br />
                  </p>
                  <button className={`${styles.btn} ${styles.btn_blue}`} onClick={toggleOverlay}>
                     Entrar
                  </button>
               </div>
               <figure>
                  <img className={styles.img_home} src='/student.svg' alt='Home image' />
               </figure>
            </section>
         </Container>
         <Footer />
      
         <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <Components.Container>
               <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form onSubmit={formik.handleSubmit}>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input {...formik.getFieldProps('username')} type='text' placeholder='Nome' />
                     <Components.Input {...formik.getFieldProps('email')} type='text' placeholder='Email' />
                     <Components.Input {...formik.getFieldProps('password')} type='text' placeholder='Senha' />
                     <Components.Button type='submit'>Sign Up</Components.Button>
                  </Components.Form>
               </Components.SignUpContainer>
               <Components.SignInContainer signinIn={signIn}>
                  <Components.Form onSubmit={formikUser.handleSubmit}>
                     <Components.Title>Sign in</Components.Title>
                     <Components.Input {...formikUser.getFieldProps('username')} type='text' placeholder='username' />
                     <Components.Input {...formikUser.getFieldProps('password')} type='text' placeholder='Senha' />
                     <Components.Anchor href='#'>Esqueceu sua senha?</Components.Anchor>
                     <Components.Button  type='submit' >Sigin In</Components.Button>
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
