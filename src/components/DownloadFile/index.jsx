import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import FileDownloadButton from '../../components/DownloadFile'

const DownloadFile = () => {
  const [files, setFiles] = useState([]);
  const location = useLocation()
  const pathname = location.pathname;
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Função para obter arquivos do backend
    const fetchFiles = async () => {
        const token = await localStorage.getItem('token');
        const subjectid = pathname.split('/').filter(Boolean).pop();
        setLoading2(true);

      try {
        const response = await axios.get(`http://localhost:3000/materials?subjectId=${subjectid}` , {
         headers : {
            Authorization: `Bearer ${token}`
        } });
        setFiles(response.data);
      } catch (error) {
        console.error('Erro ao carregar os arquivos', error);
      }finally {
        setLoading2(false); // Finaliza o carregamento
      }
    };

    fetchFiles();
  }, []);

  if (loading2) {
    return <div>Carregando arquivos...</div>;
  }

  const renderIcon = (fileType) => {
    switch (fileType) {
      case 'image/png':
        return '🖼️'; // Ícone de imagem
      case 'pdf':
        return '📄'; // Ícone de PDF
      case 'word':
        return '📃'; // Ícone de Word
      case 'text/plain':
        return '📑'; // Ícone de texto
      default:
        return '📦'; // Ícone de arquivo genérico
    }
  };



  const handleDownload = async (filename) => {
    const token = await localStorage.getItem('token');

    setLoading(true);
    setError('');
    console.log("file",filename)
    try {
      // Requisição para pegar o arquivo
      const response = await axios.get(`http://localhost:3000/materials/${filename}`, { headers : {
        Authorization: `Bearer ${token}`
    } ,
        responseType: 'blob', // Importante para arquivos binários
      });

      // Criar um link temporário para download
      const blob = response.data;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename; // Define o nome do arquivo para download
      link.click();
      
      setLoading(false);
    } catch (err) {
      setError('Erro ao baixar o arquivo');
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Lista de Arquivos</h1>
      <ul>
        {files.map((file) => (
          <li key={file.title} style={{ marginBottom: '10px' }}>
            {/* Exibindo o ícone e o nome do arquivo */}
            <span style={{ marginRight: '10px' }}>
              {renderIcon(file.mimetype)} 
              <div>
                <button onClick={() => handleDownload(file.id)} disabled={loading}    >
                    {loading ? 'Baixando...' : `Baixar Arquivo `}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </span>
            <span>{file.title}</span>
            
            <div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DownloadFile;