import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableCellImage } from 'components/TableCellImage/TableCellImage';
import { Medicament } from 'models';

interface TableProps {
  rows: Medicament[];
  onItemClick: (requestId: number) => void;
}
export function MedicationTable(props: TableProps) {
  const { rows, onItemClick } = props;
  const columns = ['Nome', 'Princípio Ativo', 'Dosagem'];

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
              onClick={() => onItemClick(row.medicamentId)}
              className={`${index % 2 ? 'dark-row' : 'light-row'} table-row`}
              key={row.medicamentId}
            >
              <TableCell align="left" component="th" scope="row">
                <TableCellImage
                  id="teste"
                  subTitle="Medicamento"
                  title={row.name}
                  type="medicine"
                />
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {row.principleActive ? row.principleActive : 'não informado'}
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {row.dosage ? row.dosage : 'não informado'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
