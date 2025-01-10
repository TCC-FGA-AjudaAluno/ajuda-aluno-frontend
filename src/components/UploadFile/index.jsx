import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getMaterials } from '../../helper/helper'; //trocar para funcao GET listar todos os materiais da materia


const columns = [
  { id: 'file', label: 'Arquivo', minWidth: 170 },
  { id: 'date', label: 'Data', minWidth: 170 }
];

function createData(file, date) {
  return {file, date};
}

function UploadFile() {
  const [data, setData] = React.useState([]);

  const fetchMaterials = () =>{
    var materials = [];
    setData(materials);
      /* chamada da rota de listar todos os materias de materia po id da materia
      getMaterials().then((res) => {
        materials.push(createData(nome_arquivo, data_de_envio));
        setData(materials);
    });
    */
  }

  const handleChangePage = (event, newPage) => {
    
  };

  const handleChangeRowsPerPage = (event) => {
    
  };

  React.useEffect(() => {
   fetchMaterials();
  }, []);

  return (
    <div/>
  );
}

export default UploadFile