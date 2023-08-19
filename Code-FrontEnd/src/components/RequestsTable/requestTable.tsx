import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Badge } from 'components/Badge/badge';
import { TableCellImage } from 'components/TableCellImage/TableCellImage';
import { Request } from 'models';
import './requestTable.scss';
import { formatDateddmmyyyy, formatTimehhmm } from 'utils/formatDate';

interface TableProps {
  rows: Request[];
  status: string;
  onItemClick: (requestId: number) => void;
}
export function RequestTable(props: TableProps) {
  const { rows, status, onItemClick } = props;
  if (status === 'active') {
    const columns = [
      'Solicitante',
      'Medicamento',
      'Dosagem',
      'Aceita Gen.',
      'Data',
      'Status',
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
                onClick={() => onItemClick(row.requestId)}
                className={`${index % 2 ? 'dark-row' : 'light-row'} table-row`}
                key={row.requestId}
              >
                <TableCell align="left" component="th" scope="row">
                  <TableCellImage
                    id="teste"
                    subTitle="Instituição de saúde"
                    title={row.originInstitution.name}
                    image={row.originInstitution.photoURL || undefined}
                    type="institution"
                  />
                </TableCell>
                <TableCell align="left">
                  <TableCellImage
                    id="teste"
                    subTitle={`#${String(row.medicament.medicamentId).padStart(
                      4,
                      '0'
                    )}`}
                    title={row.medicament.name}
                    type="medicine"
                  />
                </TableCell>
                <TableCell align="left">{row.medicament.dosage}</TableCell>
                <TableCell align="left">
                  {row.genericAccepted ? 'Sim' : 'Não'}
                </TableCell>
                <TableCell align="left">
                  <div className="dateCell">
                    <div>{formatDateddmmyyyy(row.dateAndTime)}</div>
                    <div>{formatTimehhmm(row.dateAndTime)}</div>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <Badge id="teste2" type="active" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else if (status === 'accepted') {
    const columns = [
      'Solicitante',
      'Remetente',
      'Medicamento',
      'Data',
      'Status',
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
                onClick={() => onItemClick(row.requestId)}
                className={`${index % 2 ? 'dark-row' : 'light-row'} table-row`}
                key={row.requestId}
              >
                <TableCell align="left" component="th" scope="row">
                  <TableCellImage
                    id="teste"
                    subTitle="Instituição de saúde"
                    title={row.originInstitution.name}
                    type="institution"
                  />
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  <TableCellImage
                    id="teste"
                    subTitle="Instituição de saúde"
                    title={row.accepterUser?.name || '-'}
                    type="institution"
                  />
                </TableCell>
                <TableCell align="left">
                  <TableCellImage
                    id="teste"
                    subTitle={`#${String(row.medicament.medicamentId).padStart(
                      4,
                      '0'
                    )}`}
                    title={row.medicament.name}
                    type="medicine"
                  />
                </TableCell>
                <TableCell align="left">
                  <div className="dateCell">
                    <div>{formatDateddmmyyyy(row.dateAndTime)}</div>
                    <div>{formatTimehhmm(row.dateAndTime)}</div>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <Badge id="teste2" type="accepted" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else if (status === 'transport') {
    const columns = [
      'Solicitante',
      'Remetente',
      'Medicamento',
      'Motorista',
      'Data',
      'Status',
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
                onClick={() => onItemClick(row.requestId)}
                className={`${index % 2 ? 'dark-row' : 'light-row'} table-row`}
                key={row.requestId}
              >
                <TableCell align="left" component="th" scope="row">
                  <TableCellImage
                    id="teste"
                    subTitle="Instituição de saúde"
                    title={row.originInstitution.name}
                    type="institution"
                  />
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  <TableCellImage
                    id="teste"
                    subTitle="Instituição de saúde"
                    title={row.accepterUser?.name || '-'}
                    type="institution"
                  />
                </TableCell>
                <TableCell align="left">
                  <TableCellImage
                    id="teste"
                    subTitle={`#${String(row.medicament.medicamentId).padStart(
                      4,
                      '0'
                    )}`}
                    title={row.medicament.name}
                    type="medicine"
                  />
                </TableCell>
                <TableCell align="left">{row.delivery?.driver?.name}</TableCell>
                <TableCell align="left">
                  <div className="dateCell">
                    <div>{formatDateddmmyyyy(row.dateAndTime)}</div>
                    <div>{formatTimehhmm(row.dateAndTime)}</div>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <Badge id="teste2" type="transport" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    const columns = [
      'Solicitante',
      'Remetente',
      'Medicamento',
      'Motorista',
      'Data',
      'Status',
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
                onClick={() => onItemClick(row.requestId)}
                className={`${index % 2 ? 'dark-row' : 'light-row'} table-row`}
                key={row.requestId}
              >
                <TableCell align="left" component="th" scope="row">
                  <TableCellImage
                    id="teste"
                    subTitle="Instituição de saúde"
                    title={row.originInstitution.name}
                    type="institution"
                  />
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  <TableCellImage
                    id="teste"
                    subTitle="Instituição de saúde"
                    title={row.accepterUser?.name || '-'}
                    type="institution"
                  />
                </TableCell>
                <TableCell align="left">
                  <TableCellImage
                    id="teste"
                    subTitle={`#${String(row.medicament.medicamentId).padStart(
                      4,
                      '0'
                    )}`}
                    title={row.medicament.name}
                    type="medicine"
                  />
                </TableCell>
                <TableCell align="left">{row.delivery?.driver?.name}</TableCell>
                <TableCell align="left">
                  <div className="dateCell">
                    <div>{formatDateddmmyyyy(row.dateAndTime)}</div>
                    <div>{formatTimehhmm(row.dateAndTime)}</div>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <Badge id="teste2" type="done" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
