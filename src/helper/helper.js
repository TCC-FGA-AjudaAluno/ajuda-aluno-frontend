import axios from 'axios';
import {InvalidTokenError, jwtDecode } from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token');
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token);
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


        const { data : { msg }, status } = await axios.post(`/users`,   { 
            name: credentials.name,
            course: credentials.course,
            password: credentials.password,
            passwordConfirmation: credentials.passwordConfirmation,
            email: credentials.username,
            emailConfirmation: credentials.emailConfirmation,
            registrationNumber: credentials.registrationNumber,
            password: credentials.password
         });

         let { username, email } = credentials;


        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject(error)
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

/** create a post on subject */
export async function createPost(title, content, subjectId){
    console.log('token: ', localStorage.getItem('token'));
    console.log('subjectId: ', subjectId);
    console.log('content: ', content);
    console.log('postId: ', title);

    try {
        const { data } = await axios.post(`/subjects/${subjectId}/posts`, { 
            title,
            content,
        },
        {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": 'application/json'
            }
        });
        return { data }
    } catch (error) {
        return { error : "Couldn't Create Comment...!" }
    }
}

/** create a comment on a post */
export async function createPostComment({ content, postId }){
    console.log('token: ', localStorage.getItem('token'));
    console.log('content: ', content);
    console.log('postId: ', postId);

    try {
        const { data } = await axios.post('/comments', { 
            content,
            postId,
        },
        {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": 'application/json'
            }
        });
        return { data }
    } catch (error) {
        return { error : "Couldn't Create Comment...!" }
    }
}

/** enroll user in subject */
export async function enroll({ userId, subjectId }){
    console.log('userId: ', userId);
    console.log('subjectId: ', subjectId);

    try {
       const { data } = await axios.post('/subjects/enroll', { 
            userId,
            subjectId
        },
        {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": 'application/json'
            }
        }
        );
       return { data }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** unenroll user from subject */
export async function unenroll({ subjectId }){
    console.log('subjectId: ', subjectId);
    try {
       const res = await axios.delete(`/subjects/${subjectId}/enroll`,
        {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": 'application/json'
            }
        });
       return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

/* get rank list */
export async function getRankList(){

    try {
       const { data } = await axios.get('/users/rank',
        {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        );
        
       return { data };
    } catch (error) {
        return Promise.reject(error);
    }
}

/* get user tasks */
export async function getUserTasks(){

    try {
       const { data } = await axios.get('/todos',
        {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        );
        
       return { data };
    } catch (error) {
        return Promise.reject(error);
    }
}

/* create user tasks */
export async function createUserTasks({ title, description }){

    try {
       const { data } = await axios.post('/todos',
        {
            title,
            description
        },
        {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        );
        
       return { data };
    } catch (error) {
        return Promise.reject(error);
    }
}

/* update user tasks */
export async function updateTask(todoId){

    try {
       const res = await axios.patch(`/todos/${todoId}`,
        {
            done: true
        },
        {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        );
        
       return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

/* get subject events */
export async function getSubjectEvents(subjectId) {  
    try {
        const { data } = await axios.get("/events", {
            params: { subjectId }, 
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return { data };
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
}

/* get subject events */
export async function createSubjectEvents(event) {  
    try {
        const { data } = await axios.post("/events", {
            subjectId: event.subjectId,
            title: event.title,
            description: event.description,
            start: event.start.toString(),
            end: event.end.toString(),
            location: event.location
        },
        { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return { data };
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
}

/* upvote a post */
export async function upvotePost(postId) {  
    try {
        const { data } = await axios.post("/votes/upvotes", {
            postId
        },
        { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return { data };
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
}

/* downvote a post */
export async function downvotePost(postId) {  
    try {
        const { data } = await axios.post("/votes/downvotes", {
            postId
        },
        { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return { data };
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
}