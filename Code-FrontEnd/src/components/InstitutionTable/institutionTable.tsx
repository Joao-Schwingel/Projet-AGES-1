import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableCellImage } from 'components/TableCellImage/TableCellImage';
import { User } from 'models';

interface TableProps {
  rows: User[];
  onItemClick: (requestId: number) => void;
}
export function InstitutionTable(props: TableProps) {
  const { rows, onItemClick } = props;
  const columns = [
    'Instituição',
    'Cidade',
    'CEP',
    'Número',
    'Email',
    'Usuário',
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell className="textColor" align="left" key={column}>
                  {column}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              onClick={() => onItemClick(row.userId)}
              className={`${index % 2 ? 'dark-row' : 'light-row'} table-row`}
              key={row.userId}
            >
              <TableCell align="left" component="th" scope="row">
                <TableCellImage
                  id="teste"
                  subTitle="Instituição"
                  title={row.name}
                  image={row.photoURL || undefined}
                  type="institution"
                />
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {row.city ? row.city : 'não informado'}
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {row.postalCode ? row.postalCode : 'não informado'}
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {row.number ? row.number : 'não informado'}
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {row.username}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
