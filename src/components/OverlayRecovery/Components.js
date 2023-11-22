import styled from 'styled-components';

export const Container = styled.div`
background-color: #fff;
border-radius: 10px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
width: 678px;
max-width: 100%;
min-height: 400px;
`;


export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 -100px;
height: 100%;
margin: 0px 0px -10px 0px;
text-align: center;
`;

export const Anchor = styled.a`
color: #333;
font-size: 14px;
text-decoration: none;
margin: 0px 0px 40px 0px;
`;

export const Anchor2 = styled.a`
color: #333;
font-size: 10px;
text-decoration: none;
margin: 100px 0px 0px 0px;
`;

export const Button2 = styled.a`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 0%;
text-align: center;
color: #333;
font-size: 13px;
text-decoration: none;
margin: 0px 0px -50px 0px;
cursor: pointer;
&:hover {
    color: rgb(341, 078, 078);
    }
`;



export const Button = styled.button`
  border-radius: 10px;
   border: 1px   #0251a1;
   background-color:  #0251a1;
   margin: 10px 0px 0px 0px;
   color: #ffffff;
   cursor: pointer;
   font-size: 12px;
   font-weight: bold;
   padding: 15px 35px;
   letter-spacing: 1px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   width: 80%;

   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;

export const SignInContainer = styled.div`
position: absolute;
top: -7%;
height: 100%;
transition: all 0.6s ease-in-out;
left: 25%;
width: 50%;
z-index: 2;
${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;



export const Title = styled.h1`
font-weight: bold;
margin: 0px 0px 10px 0px;

`;

export const Input = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
width: 80%;
margin: 0px 0px 0px 0px;
border-radius: 10px
`;



export const GhostButton = styled(Button)`
background-color: transparent;
border-color: #ffffff;
`;



export const OverlayRecovery = styled.div`
background:  #0251a1;
background: -webkit-linear-gradient(to right,  #0251a1,  #0251a1);
background: linear-gradient(to right,  #006633,  #0251a1);
background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;



export const Paragraph = styled.p`
font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px
`;