import { ButtonComponent } from 'components/Button/button';
import { TextField } from 'components/TextFields/textfield';
import { TextareaAutosize } from '@mui/material';
import { Select } from 'components/Select/select';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from 'components/Layout/layout';
import './createRequest.scss';
import { medicamentService, requestService } from 'services';

const getInitialData = () => ({
  medicament: { value: '', errorMsg: '' },
  doctor: { value: '', errorMsg: '' },
  crm: { value: '', errorMsg: '' },
  principleActive: { value: '', errorMsg: '' },
  medicamentQuantity: { value: '', errorMsg: '' },
  dosageValue: { value: '', errorMsg: '' },
  dosageUnit: { value: 'ml', errorMsg: '' },
  genericAccepted: { value: false },
  observation: { value: '' },
});

export const CreateRequestPage = () => {
  const [formData, setFormData] = useState(getInitialData());
  const navigate = useNavigate();
  const [medicamentNames, setMedicamentNames] = useState<string[]>([]);

  const isValidNumber = (value?: string) => {
    if (!value) {
      return true; // Allow empty value
    }
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && value.length === String(num).length;
  };

  const handleCancelButton = () => {
    navigate(-1);
  };

  const handleCreateRequest = async () => {
    const formFields = [
      'medicament',
      'doctor',
      'crm',
      'principleActive',
      'medicamentQuantity',
      'dosageValue',
      'dosageUnit',
    ] as const;
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

    const crmField = formData['crm'];
    const idealCrmLength = 13;
    if (crmField.value.length < idealCrmLength) {
      crmField.errorMsg = 'O CRM deve ser completamente preenchido.';
      setFormData({ ...formData, crm: crmField });
      hasError = true;
    }

    if (!hasError) {
      await requestService.register({
        medicament: formData.medicament.value,
        doctor: formData.doctor.value,
        crm: formData.crm.value,
        amount: formData.medicamentQuantity.value,
        principleActive: formData.principleActive.value,
        medicamentQuantity: formData.medicamentQuantity.value,
        dosage: `${formData.dosageValue.value} ${formData.dosageUnit.value}`,
        genericAccepted: formData.genericAccepted.value,
        observation: formData.observation.value,
      });
      navigate(-1);
    }
  };

  useEffect(() => {
    const searchMedicaments = async () => {
      const medicaments = await medicamentService.search(
        formData.medicament.value
      );
      const medicamentNames = Array.from(
        new Set(medicaments.items.map((medicament) => medicament.name))
      );
      setMedicamentNames(medicamentNames);
    };
    searchMedicaments();
  }, [formData.medicament.value]);

  return (
    <Layout>
      <div className="main-wrapper">
        <div>
          <h1 className="title">Nova Requisição</h1>
          <p className="paragraph">
            Preencha o formulário abaixo para realizar uma nova requisição!
          </p>
        </div>
        <form className="form-wrapper">
          <div className="form-inside">
            <div className="form-control">
              <Select
                id="create-request-medicament-name"
                label="Medicamento"
                showArrow
                options={medicamentNames}
                placeholder="Ex.: Paracetamol"
                value={formData.medicament.value}
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    medicament: {
                      ...formData.medicament,
                      value: v,
                      errorMsg: '',
                    },
                  })
                }
                errorMessage={formData.medicament.errorMsg}
                required
              />
            </div>
            <div className="two-inputs">
              <div className="form-control">
                <TextField
                  id="create-request-doctor-name"
                  label="Nome do Médico"
                  placeholder="Ex.: Dr. João Guilherme"
                  required
                  errormessage={formData.doctor.errorMsg}
                  value={formData.doctor.value}
                  onChange={(v) =>
                    setFormData({
                      ...formData,
                      doctor: { ...formData.doctor, value: v },
                    })
                  }
                />
              </div>
              <div className="form-control small-control">
                <TextField
                  id="create-request-crm"
                  label="CRM"
                  placeholder="Ex.: CRM/SP 123456"
                  required
                  errormessage={formData.crm.errorMsg}
                  value={formData.crm.value}
                  mask="CRM/aa 999999"
                  onChange={(v) =>
                    setFormData({
                      ...formData,
                      crm: {
                        ...formData.crm,
                        value: v.slice(0, 6).toUpperCase() + v.slice(6),
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <TextField
                id="create-request-principle-active"
                label="Principio Ativo"
                placeholder="Ex.: Paracetamol"
                required
                errormessage={formData.principleActive.errorMsg}
                value={formData.principleActive.value}
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    principleActive: { ...formData.principleActive, value: v },
                  })
                }
              />
            </div>
            <div className="two-inputs">
              <div className="form-control">
                <TextField
                  id="create-request-medicament-quantity"
                  placeholder="Ex.: 1"
                  label="Quantidade"
                  value={formData.medicamentQuantity.value}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      medicamentQuantity: {
                        ...formData.medicamentQuantity,
                        value,
                      },
                    })
                  }
                  validate={isValidNumber}
                  required
                  errormessage={formData.medicamentQuantity.errorMsg}
                  endAdornment={
                    <div className="amount-adorment">caixas(s)</div>
                  }
                />
              </div>
              <div className="form-control">
                <TextField
                  id="input-select-style"
                  placeholder="Ex.: 70"
                  label="Dosagem"
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      dosageValue: {
                        ...formData.dosageValue,
                        value,
                      },
                    })
                  }
                  validate={isValidNumber}
                  required
                  errormessage={formData.dosageValue.errorMsg}
                  endAdornment={
                    <Select
                      id="input-selector"
                      options={['ml', 'mg', 'g']}
                      className="dosage-adornment"
                      showArrow
                      fixedWidth={80}
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          dosageUnit: {
                            ...formData.dosageUnit,
                            value,
                          },
                        })
                      }
                      value={formData.dosageUnit.value}
                    />
                  }
                />
              </div>
            </div>
            <div className="form-control small-control">
              <Select
                id="create-request-accept-generic"
                label="Aceita Genérico"
                showArrow
                options={['Sim', 'Não']}
                value={formData.genericAccepted.value ? 'Sim' : 'Não'}
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    genericAccepted: {
                      ...formData.genericAccepted,
                      value: v === 'Sim',
                    },
                  })
                }
                required
              />
            </div>
            <div className="form-control">
              <span className="label">Observações</span>
              <TextareaAutosize
                minRows={6}
                placeholder=" Insira alguma observação"
                className="custom-input"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    observation: {
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="button-wrapper">
            <ButtonComponent
              type="secondary"
              id="create-request-cancel-button"
              onClick={handleCancelButton}
              size={2}
              fullWidth
            >
              Cancelar
            </ButtonComponent>
            <ButtonComponent
              type="primary"
              id="create-request-finalize-button"
              onClick={handleCreateRequest}
              size={2}
              fullWidth
            >
              Finalizar
            </ButtonComponent>
          </div>
        </form>
      </div>
    </Layout>
  );
};
