import { useEffect, useState } from 'react';
import { TextField } from 'components/TextFields/textfield';
import { ButtonComponent } from 'components/Button/button';
import { Modal } from 'components/Modal/modal';
import './registerInstitutionForm.scss';
import { institutionService } from 'services';

interface RegisterInstitutionFormProps {
  open?: boolean;
  onClose?: () => void;
}

const getInitialData = () => ({
  name: { value: '', errorMsg: '' },
  user: { value: '', errorMsg: '' },
  cnpj: { value: '', errorMsg: '' },
  pass: { value: '', errorMsg: '' },
  passConf: { value: '', errorMsg: '' },
  email: { value: '', errorMsg: '' },
  photoURL: { value: '', errorMsg: '' },
  phone: { value: '', errorMsg: '' },
  postal: { value: '', errorMsg: '' },
  street: { value: '', errorMsg: '' },
  number: { value: '', errorMsg: '' },
  neigh: { value: '', errorMsg: '' },
  city: { value: '', errorMsg: '' },
  state: { value: '', errorMsg: '' },
  comp: { value: '', errorMsg: '' },
});

export const RegisterInstitutionForm: React.FC<
  RegisterInstitutionFormProps
> = ({ open, onClose }) => {
  const [formData, setFormData] = useState(getInitialData());
  const handleSubmit = async () => {
    let hasError = false;
    const availableField = [
      'name',
      'user',
      'pass',
      'email',
      'phone',
      'postal',
      'street',
      'number',
      'neigh',
      'city',
      'state',
      'cnpj',
    ] as const;

    availableField.forEach((x) => {
      const field = formData[x];
      if (field.value === '') {
        field.errorMsg = 'Preencha este campo.';
        setFormData({ ...formData, [x]: field });
        hasError = true;
        return;
      } else {
        field.errorMsg = '';
        setFormData({ ...formData, [x]: field });
      }
    });

    if (formData.pass.value !== formData.passConf.value) {
      formData.passConf.errorMsg = 'As senhas devem coincidir';
      setFormData({ ...formData, passConf: { ...formData.passConf } });
      hasError = true;
      return;
    } else {
      formData.passConf.errorMsg = '';
      setFormData({ ...formData, passConf: { ...formData.passConf } });
    }

    if (!hasError) {
      await institutionService.register({
        email: formData.email.value,
        name: formData.name.value,
        username: formData.user.value,
        cnpj: formData.cnpj.value,
        password: formData.pass.value,
        phone: formData.phone.value,
        photoURL: formData.photoURL.value,
        state: formData.state.value,
        city: formData.city.value,
        street: formData.street.value,
        number: formData.number.value,
        postalCode: formData.postal.value,
        neighborhood: formData.neigh.value,
        complement: formData.comp.value,
      });
      onClose?.();
    }
  };

  useEffect(() => {
    if (open) setFormData(getInitialData());
  }, [open]);

  return (
    <div className="register-institution-container">
      <Modal title="Nova Instituição" open={open} onClose={onClose}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="register-institution-form-container"
        >
          <p className="register-institution-form-subtitle">
            Informações Gerais
          </p>
          <div className="register-institution-form-inputs-container">
            <TextField
              id="register-institution-name-field"
              label="Nome"
              placeholder="Ex.: Hospital São Lucas da PUCRS"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  name: { ...formData.name, value: v },
                })
              }
              errormessage={formData.name.errorMsg}
              required
            />
            <TextField
              id="register-institution-user-field"
              label="Usuário"
              placeholder="Ex.: hsldpucrs12"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  user: { ...formData.user, value: v },
                })
              }
              errormessage={formData.user.errorMsg}
              required
            />
            <TextField
              id="register-institution-cnpj-field"
              label="CNPJ"
              placeholder="Insira o CNPJ"
              mask="99.999.999/9999-99"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  cnpj: { ...formData.cnpj, value: v },
                })
              }
              errormessage={formData.cnpj.errorMsg}
              required
            />
            <TextField
              id="register-institution-photoURL-field"
              label="Link imagem"
              placeholder="Insira o link da imagem"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  photoURL: { ...formData.photoURL, value: v },
                })
              }
              errormessage={formData.photoURL.errorMsg}
            />
            <TextField
              id="register-institution-password-field"
              label="Senha"
              placeholder="Insira a sua senha"
              hidepassword
              onChange={(v) =>
                setFormData({
                  ...formData,
                  pass: { ...formData.pass, value: v },
                })
              }
              errormessage={formData.pass.errorMsg}
              required
            />
            <TextField
              id="register-institution-password-confirm-field"
              label="Confirmar senha"
              placeholder="Insira novamente a sua senha"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  passConf: { ...formData.passConf, value: v },
                })
              }
              errormessage={formData.passConf.errorMsg}
              hidepassword
              required
            />
            <TextField
              id="register-institution-email-field"
              label="E-mail"
              placeholder="Ex.: h.saolucas@pucrs.br"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  email: { ...formData.email, value: v },
                })
              }
              errormessage={formData.email.errorMsg}
              required
            />
            <TextField
              id="register-institution-phone-field"
              label="Telefone"
              placeholder="(99) 99999-9999"
              mask="(99) 99999-9999"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  phone: { ...formData.phone, value: v },
                })
              }
              errormessage={formData.phone.errorMsg}
              required
            />
          </div>
          <p className="register-institution-form-subtitle">Endereço</p>
          <div className="register-institution-form-inputs-container">
            <TextField
              id="register-institution-postal-field"
              label="CEP"
              placeholder="99999-999"
              mask="99999-999"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  postal: { ...formData.postal, value: v },
                })
              }
              errormessage={formData.postal.errorMsg}
              required
            />
            <TextField
              id="register-institution-street-field"
              label="Rua"
              placeholder="Ex.: Av.Ipiranga"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  street: { ...formData.street, value: v },
                })
              }
              errormessage={formData.street.errorMsg}
              required
            />
            <div className="register-institution-form-inputs-flex">
              <TextField
                id="register-institution-number-field"
                label="Número"
                placeholder="Ex.: 123"
                number
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    number: { ...formData.number, value: v },
                  })
                }
                errormessage={formData.number.errorMsg}
                required
              />
              <TextField
                id="register-institution-neighborhood-field"
                label="Bairro"
                placeholder="Ex.: Partenon"
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    neigh: { ...formData.neigh, value: v },
                  })
                }
                errormessage={formData.neigh.errorMsg}
                required
              />
            </div>

            <TextField
              id="register-institution-city-field"
              label="Cidade"
              placeholder="Ex.: Porto Alegre"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  city: { ...formData.city, value: v },
                })
              }
              errormessage={formData.city.errorMsg}
              required
            />
            <TextField
              id="register-institution-state-field"
              label="Estado"
              placeholder="Ex.: Insira o seu Estado"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  state: { ...formData.state, value: v },
                })
              }
              errormessage={formData.state.errorMsg}
              required
            />
            <TextField
              id="register-institution-complement-field"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  comp: { ...formData.comp, value: v },
                })
              }
              label="Complemento"
              placeholder="Ex.: Prédio 92B"
            />
          </div>
          <div className="register-institution-form-buttons-container">
            <ButtonComponent
              id="register-institution-form-button-cancel"
              onClick={() => onClose?.()}
              size={2}
              type="secondary"
            >
              Cancelar
            </ButtonComponent>
            <ButtonComponent
              id="register-institution-form-button-finish"
              onClick={handleSubmit}
              size={2}
              type="primary"
            >
              Finalizar
            </ButtonComponent>
          </div>
        </form>
      </Modal>
    </div>
  );
};
