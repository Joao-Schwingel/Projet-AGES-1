import React, { useEffect, useState } from 'react';
import { TextField } from '../TextFields/textfield';
import { ButtonComponent } from 'components/Button/button';
import Box from '@mui/material/Box';
import { Modal } from 'components/Modal/modal';
import './medicationRegistration.scss';
import { medicamentService } from 'services';

interface MedicationRegistrationProps {
  open?: boolean;
  onClose?: () => void;
}

const getInitialData = () => ({
  name: { value: '', errorMsg: '' },
  activePrinciple: { value: '', errorMsg: '' },
  dosage: { value: '', errorMsg: '' },
});

export const MedicationRegistration: React.FC<MedicationRegistrationProps> = ({
  open,
  onClose,
}) => {
  const [formData, setFormData] = useState(getInitialData());

  const handleSubmitForm = async () => {
    const formFields = ['name', 'activePrinciple', 'dosage'] as const;
    let hasError = false;
    formFields.forEach((x) => {
      const field = formData[x];
      if (field.value === '') {
        field.errorMsg = 'Preencha este campo.';
        setFormData({ ...formData, [x]: field });
        hasError = true;
      } else {
        field.errorMsg = '';
        setFormData({ ...formData, [x]: field });
      }
    });

    if (!hasError) {
      await medicamentService.register({
        name: formData.name.value,
        principleActive: formData.activePrinciple.value,
        dosage: formData.dosage.value,
      });
      onClose?.();
    }
  };

  useEffect(() => {
    if (open) setFormData(getInitialData());
  }, [open]);

  return (
    <Modal title="Novo Medicamento" open={open} onClose={onClose}>
      <Box className="medication-registration-box">
        <div className="medicament-name">
          <TextField
            id="medicament-name"
            label="Nome"
            placeholder="Nome do Medicamento"
            required
            errormessage={formData.name.errorMsg}
            value={formData.name.value}
            onChange={(v) =>
              setFormData({
                ...formData,
                name: { ...formData.name, value: v },
              })
            }
          />
        </div>
        <div className="active-principle">
          <TextField
            id="active-principle"
            label="Princípio Ativo"
            placeholder="Princípio Ativo"
            required
            errormessage={formData.activePrinciple.errorMsg}
            value={formData.activePrinciple.value}
            onChange={(v) =>
              setFormData({
                ...formData,
                activePrinciple: {
                  ...formData.activePrinciple,
                  value: v,
                },
              })
            }
          />
        </div>
        <div className="dosage">
          <TextField
            id="dosage"
            label="Dosagem"
            placeholder="80mg"
            required
            errormessage={formData.dosage.errorMsg}
            value={formData.dosage.value}
            onChange={(v) =>
              setFormData({
                ...formData,
                dosage: { ...formData.dosage, value: v },
              })
            }
          />
        </div>
        <div className="buttons">
          <ButtonComponent
            type="secondary"
            id="cancel-register-medicament"
            onClick={() => onClose?.()}
            size={2}
            fullWidth
          >
            Cancelar
          </ButtonComponent>
          <ButtonComponent
            type="primary"
            id="confirm-register-medicament"
            onClick={handleSubmitForm}
            size={2}
            fullWidth
          >
            Cadastrar
          </ButtonComponent>
        </div>
      </Box>
    </Modal>
  );
};
