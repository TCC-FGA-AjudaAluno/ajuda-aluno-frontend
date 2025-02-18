import React, { useState } from 'react';
import axios from 'axios';

const FileDownloadButton = ({ filename }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Requisição para pegar o arquivo
      const response = await axios.get(`http://localhost:3001///:${filename}`, {
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
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Baixando...' : 'Baixar Arquivo'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileDownloadButton;
