import * as React from 'react';
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

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 20,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div>
      <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon  />}
      >
          Enviar arquivos
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
            multiple
          />
      </Button>
    </div>
  );
}

export default UploadFile