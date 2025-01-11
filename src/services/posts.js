import { makeRequest } from "./makeRequest";

export function getPosts(subjectId){
   //trocar para rota correta da API NestJS
   return makeRequest(`/posts/${subjectId}`)
}