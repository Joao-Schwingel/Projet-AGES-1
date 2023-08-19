import { useState } from 'react';
import { DropdownFilter } from './Components/DropdownFilter/dropdownFilter';
import { Datarange } from './Components/DataRange/dataRange';
import { TextFilterComponent } from './Components/TextFilter/textFilter';
import './requestFilter.scss';
import { RequestFilters } from 'services/requestService';

interface RequestFilterProps {
  value: RequestFilters;
  onChange: (value: RequestFilters) => void;
}

export const RequestFilter: React.FC<RequestFilterProps> = ({
  value,
  onChange,
}) => {
  const [status, setStatus] = useState('active');
  const [generic, setGeneric] = useState('');
  const [driver, setDriver] = useState('');
  const [sender, setSender] = useState('');
  const [requester, setRequester] = useState('');
  const [medicamentNameContains, setMedicamentNameContains] = useState('');
  const [day, setDay] = useState<Date>();

  return (
    <div className="request-filter-container">
      {status === 'transport' && (
        <>
          <TextFilterComponent
            value={requester}
            onChange={(requesterValue) => {
              setSender(requesterValue);
              onChange({ ...value, requesterNameContains: requesterValue });
            }}
            placeholder="Solicitante"
          ></TextFilterComponent>
          <TextFilterComponent
            value={sender}
            onChange={(senderValue) => {
              setRequester(senderValue);
              onChange({ ...value, senderNameContains: senderValue });
            }}
            placeholder="Remetente"
          ></TextFilterComponent>
        </>
      )}
      <TextFilterComponent
        value={medicamentNameContains}
        onChange={(medicationValue) => {
          setMedicamentNameContains(medicationValue);
          onChange({ ...value, medicamentNameContains: medicationValue });
        }}
        placeholder="Medicamento"
      ></TextFilterComponent>
      <DropdownFilter
        value={status}
        onChange={(statusValue) => {
          setStatus(statusValue);
          onChange({ ...value, status: statusValue });
        }}
        items={[
          { label: 'Ativo', value: 'active' },
          { label: 'Aceito', value: 'accepted' },
          { label: 'Em Transporte', value: 'transport' },
          { label: 'Encerrado', value: 'done' },
        ]}
        label="Status"
        clearable={false}
      ></DropdownFilter>
      {status === 'active' && (
        <DropdownFilter
          value={generic}
          onChange={(genericValue) => {
            setGeneric(genericValue);
            onChange({
              ...value,
              genericAccepted: !genericValue
                ? undefined
                : genericValue === 'generic',
            });
          }}
          items={[
            { label: 'Aceito', value: 'generic' },
            { label: 'Não Aceito', value: 'not-generic' },
          ]}
          label="Generico"
          width={165}
        ></DropdownFilter>
      )}

      {(status === 'transport' || status === 'done') && (
        <TextFilterComponent
          value={driver}
          onChange={(driverValue) => {
            setDriver(driverValue);
            onChange({ ...value, driverNameContains: driverValue });
          }}
          placeholder="Motorista"
        ></TextFilterComponent>
      )}

      <Datarange
        value={day}
        onChange={(dateValue) => {
          setDay(dateValue);
          onChange({ ...value, day: dateValue });
        }}
      ></Datarange>
    </div>
  );
};
