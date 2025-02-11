import axios from 'axios';
import {InvalidTokenError, jwtDecode } from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(values){
    try {
        return await axios.post('/auth/token', { 
            email: values.username,
            password: values.password
         });
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser({ id, token }){
    try {
        const { data } = await axios.get(`/users/${id}`, {
            headers : {
                Authorization: `Bearer ${token}`
            } 
        });
        return { data };
    } catch (error) {
        return { error : "User doesn't exist...!"}
    }
}

/** get Subject details */
export async function getSubject(id){
    try {
        var { data } = await axios.get(`/subjects/${id}`, {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            } 
        });
        return { data }
    } catch (error) {
        return { error : "Subject doesn't Match...!"}
    }
}

/** get a single post from Subject */
export async function getPost(postId){
    try {
        var { data } = await axios.get(`/subjects/:subjectId/posts/${postId}`, {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            } 
        });
        return { data }
    } catch (error) {
        return { error : "Could not fetch posts for the specified subject!"}
    }
}

/** get all Posts from Subject */
export async function getSubjectPosts(subjectId){
    try {
        var { data } = await axios.get(`/subjects/${subjectId}/posts`, {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            } 
        });
        return { data }
    } catch (error) {
        return { error : "Could not fetch posts for the specified subject!"}
    }
}

/** get Subject details */
export async function getAllSubject(){
    try {
        var { data } = await axios.get(`/subjects`, {
            params: {
                enrolled: false
            },
            headers : {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            } 
        });
        return { data } ;
    } catch (error) {
        console.log("Error getAllSubject: ", error);
        return { error : "Subject doesn't Match...!"}
    }
}

/** get Subject details */
export async function getSubjectByUser(username){
    try {
        const { data } = await axios.get(`/api/subjects/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** get all Users details */
export async function getUsers(){
    try {
        const { data } = await axios.get('/users');
        return { data };
    } catch (error) {
        return { error : "No user data available...!"}
    }
}

/** get Email details */
export async function getEmail( email ){
    try {
        const { data :  status } = await axios.get(`/api/email/${email}`);
        return { status };
    } catch (error) {
        return { error : "Email doesn't Match...!"}
    }
}


/** register user function */
export async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`/api/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}


/** login function */
export async function verifyPassword(token){
    try {
        if(token){
            console.log('token: ', token);
            const { data } = await axios.post('/auth/introspect', { token });
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}


/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}


/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}


/** update user profile function */
export async function updateUserSubject(subject){
    try {
        
        const username = await localStorage.getItem('username');
        const status = await axios.put('/api/userSubject', { username , subject });

        return Promise.resolve({ status })
    } catch (error) {
        return Promise.reject({ status : "Couldn't Update Profile...!"})
    }
}
