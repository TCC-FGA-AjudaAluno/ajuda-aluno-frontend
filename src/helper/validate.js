import toast from 'react-hot-toast'
import { authenticate , getEmail } from './helper.js';

/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if(values){
        // check user exist or not
        const res = await authenticate(values);
        console.log('res: ', res);
        if(res.status !== 201){
            errors.exist = toast.error('User does not exist...!')
        }else{
            console.log('RES TOKEN: ', res.data.accessToken);
            console.log("Limpando localStorage");
            localStorage.clear();
            localStorage.setItem('token', res.data.accessToken);
        }
    }
    passwordVerify(errors, values);


    return errors;
}

/** validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/** validate register form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);

    if(values.username){
        // check user exist or not
        const response = await authenticate(values.username);
        
        if(response.status == 200){
            errors.exist = toast.error('Username already exist...!')
        }
    }
    
    if(values.email){
        // check user exist or not
        const response = await getEmail(values.email);

        if(response.status.msg){
            errors.exist = toast.error('Email already exist...!')
        } else {
            emailVerify(errors, values);
            passwordVerify(errors, values);
        }

        return errors;
    }
    
}

/** validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

/** validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}

/** validate password */
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}


/** validate email */
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}