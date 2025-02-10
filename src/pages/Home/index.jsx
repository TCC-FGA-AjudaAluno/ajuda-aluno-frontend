import React from "react";
import {useEffect, useState } from "react";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from 'formik';
import { registerValidation , usernameValidate  } from "../../helper/validate.js";
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from "../../store/store.js";
import { registerUser , verifyPassword ,generateOTP, verifyOTP } from "../../helper/helper.js";

import * as Components from '../../components/Overlay/Components';
import Overlay from "../../components/Overlay/index";
import OverlayRecovery from "../../components/OverlayRecovery/index";
import * as ComponentsRecovery from "../../components/OverlayRecovery/Components";
import Container from "../../components/Container";
import styles from "./Home.module.css"
import useFetch from '../../hooks/fetch.hook'



function Home() {
   const { username } = useAuthStore(state => state.auth);
   const [OTP, setOTP] = useState();
   const navigate = useNavigate()

   const [isOpen, setIsOpen] = useState(false);

   const [isOpenReco, setIsOpenReco] = useState(false);


    async function onSubmit(e){
      e.preventDefault();
      try {
        let { status } = await verifyOTP({ username, code : OTP })
        if(status === 201){
          toast.success('Verify Successfully!')
          
          return navigate('/reset');
        }  
      } catch (error) {
        return toast.error('Wront OTP! Check email again!')
      }
    }

      // handler of send OTP
  function resendOTP(){

   let sentPromise = generateOTP(username);

   toast.promise(sentPromise ,
     {
       loading: 'Sending...',
       success: <b>OTP has been send to your email!</b>,
       error: <b>Could not Send it!</b>,
     }
   );

   sentPromise.then((OTP) => {
     console.log(OTP)
   });
   
 }

/**Registration formik */
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

/**Login formik */
   const setUsername = useAuthStore(state => state.setUsername);
   const formikUser = useFormik({
      initialValues : {
         username: '',
         password : ''
      },
      validate : usernameValidate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
         console.log('onSubmit values: ', values);
         setUsername(values.username)

         let loginPromise = verifyPassword({ username : values.username , password : values.password })
         toast.promise(loginPromise, {
         loading: 'Checking...',
         success : <b>Login Successfully...!</b>,
         error : <b>Password Wrong!</b>
         });

         loginPromise.then(res => {
            let { token, user } = res.data;
            console.log("Limpando localStorage");
            localStorage.clear();
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/home');
         }).catch( error => {
            error : <b>Password Not Match!</b>
         }); 
              
         }
   })



   const toggleOverlay = () => {
      setIsOpen(!isOpen);
   };

   const [signIn, toggle] = React.useState(true);

   const toggleOverlayRecovery = () => {
      setIsOpenReco(!isOpenReco);
   };

   return (
      <div className="App">
      <>
         <Header path=""/>
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
                     <Components.Title style={{marginBottom: "90px"}}>Criar cadastro</Components.Title>
                     <Components.Input {...formik.getFieldProps('username')} type='text' placeholder='Nome' />
                     <Components.Input {...formik.getFieldProps('email')} type='text' placeholder='Email' />
                     <Components.Input {...formik.getFieldProps('password')} type='text' placeholder='Senha' />
                     <Components.Input {...formik.getFieldProps('registrationNumber')} type='text' placeholder='Informe sua matrícula' />
                     <Components.Input {...formik.getFieldProps('course')} type='text' placeholder='Informe seu curso' />
                     <Components.Button type='submit'>Sign Up</Components.Button>
                  </Components.Form>
               </Components.SignUpContainer>

               <Components.SignInContainer signinIn={signIn}>
                  <Components.Form onSubmit={formikUser.handleSubmit}>
                     <Components.Title style={{marginBottom: "40px"}}>Sign in</Components.Title>
                     <Components.Input {...formikUser.getFieldProps('username')} type='text' placeholder='username' />
                     <Components.Input {...formikUser.getFieldProps('password')} type='text' placeholder='Senha' />
                     <Components.Anchor onClick={toggleOverlayRecovery}  href='#'>Esqueceu sua senha?</Components.Anchor>
                     <Components.Button  type='submit' >Sigin In</Components.Button>
                  </Components.Form>
               </Components.SignInContainer>

               <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>
                     <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title style={{marginBottom: "80px"}}>Bem Vindo Novamente!</Components.Title>
                        <Components.Paragraph>
                           Para permanecer conectado conosco favor logar com suas credenciais
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                           Sign In
                        </Components.GhostButton>
                     </Components.LeftOverlayPanel>
                     
                     <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title style={{marginBottom: "40px"}}>Bem vindos!</Components.Title>
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

         <OverlayRecovery isOpen={isOpenReco} onClose={toggleOverlayRecovery}>
            <ComponentsRecovery.Container>


               <ComponentsRecovery.SignInContainer signinIn={signIn}>
                  <ComponentsRecovery.Form onSubmit={onSubmit}>
                     <ComponentsRecovery.Title>Recuperar Senha</ComponentsRecovery.Title>
                     <ComponentsRecovery.Anchor >Enter OTP to recover password.</ComponentsRecovery.Anchor>
                     <ComponentsRecovery.Anchor2 > Enter 6 digit OTP sent to your email address.</ComponentsRecovery.Anchor2>
                     <ComponentsRecovery.Input onChange={(e) => setOTP(e.target.value) } type='text' placeholder='OTP' />

                     <ComponentsRecovery.Button  type='submit' >Recuperar</ComponentsRecovery.Button>
                  </ComponentsRecovery.Form>
                  <ComponentsRecovery.Button2 onClick={resendOTP} >Enviar código OTP</ComponentsRecovery.Button2>

               </ComponentsRecovery.SignInContainer>

             
            </ComponentsRecovery.Container>    
         </OverlayRecovery>
      </>
      </div>
   )
}

export default Home
