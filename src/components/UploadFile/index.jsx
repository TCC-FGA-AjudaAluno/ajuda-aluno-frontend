import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getMaterials, Toast } from '../../helper/helper'; //trocar para funcao GET listar todos os materiais da materia
import { useLocation } from 'react-router-dom';
import styles from './UploadFile.module.css'


  
const UploadFile = () => {
  var teste = {};
  const location = useLocation()
  const pathname = location.pathname;
  const [files, setFiles] = useState([]); // Armazenar múltiplos arquivos
  // Definindo o estado para título e descrição
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Função para atualizar o título
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Função para atualizar a descrição
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Função para capturar os arquivos selecionados
  const handleFileChange = (e) => {
    setFiles(e.target.files);  // Pega todos os arquivos selecionados
  };


  const subjectid = pathname.split('/').filter(Boolean).pop();


  // Função para enviar os arquivos
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Selecione pelo menos um arquivo para enviar!");
      return;
    }

    const formData = new FormData();
    // Adiciona todos os arquivos ao FormData
      formData.append("subjectId", subjectid);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", files[0]);
    
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);  // Logando chave e valor
      }

    try {
      const response = await fetch("http://localhost:3000/materials", {
        method: "POST",
        headers : {"Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
      } ,
        body:formData,
     
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na requisição:", errorText); // Exibe erro no console
        throw new Error("Erro na requisição: " + errorText);
      }

      
      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: "Você ganhou +10 pontos!!"
        });
        alert("Arquivos enviados com sucesso!");
      } else {
        alert("Erro ao enviar os arquivos.");
      }
    } catch (error) {
      console.error("Erro de envio:", error);
      alert("Erro ao enviar os arquivos.");
    }
  };

  // Função para abrir a caixa de seleção de arquivos
  const handleClick = () => {
    document.getElementById('fileInput').click();  // Aciona o clique no input invisível
  };

  return (
    <div>      
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.labelFile} htmlFor="title">Nome do arquivo:</label>
       
          <input className={styles.inputFile}
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}  // Atualiza o título
            placeholder="Digite o título"
          />
        </div>

        <div>
          <label className={styles.labelFile} htmlFor="description">Descrição do arquivo:</label>
          
          <textarea className={styles.textareaFile}
            id="description"
            value={description}
            onChange={handleDescriptionChange}  // Atualiza a descrição
            placeholder="Digite a descrição"
          />
        </div>
 
        {/* Botão customizado */}
        <button className={styles.buttonSelect} type="button" onClick={handleClick}>Selecionar Arquivos</button>

        {/* Input de arquivo invisível */}
        <input 
          id="fileInput"
          type="file"
          multiple
          style={{ display: 'none' }}  // Esconde o input de arquivo
          onChange={handleFileChange}
        />
        
        <button className={styles.buttonSend} type="submit">Enviar</button>
        </form>

      <div>
        <h3>Arquivos Selecionados:</h3>
        <ul>
          {Array.from(files).map((file, index) => (
            <li  className={styles.liFile} key={index}>{file.name}</li>  // Exibe o nome de cada arquivo selecionado
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadFile;