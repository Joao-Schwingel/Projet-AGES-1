import { ReactNode, useEffect, useState } from 'react';
import { Request } from 'models/requests';
import './myRequests.scss';
import { Badge } from 'components/Badge/badge';
import { Modal } from 'components/Modal/modal';
import { ButtonComponent } from 'components/Button/button';
import { TextField } from 'components/TextFields/textfield';
import { useLocation } from 'react-router-dom';
import { requestService } from 'services';
import { Driver, Pagination } from 'models';
import { driverService } from 'services/driverService';
import { Select } from 'components/Select/select';
import { useAuth } from 'hooks/auth';

interface Props {
  request: Request;
  isOpen: boolean;
  onClose: () => void;
  onTransportRegister: () => void;
  onReject?: () => void;
  onAccept?: () => void;
  onDone?: () => void;
}

const getInitialData = () => ({
  licensePlate: { value: '', errorMsg: '' },
  driver: { value: '', errorMsg: '' },
  cellphone: { value: '', errorMsg: '' },
  rg: { value: '', errorMsg: '' },
  description: { value: '' },
});

export const RequestModal = ({
  request,
  isOpen,
  onClose,
  onTransportRegister,
  onReject,
  onAccept,
  onDone,
}: Props) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(getInitialData());
  const date = new Date(request.dateAndTime);
  const badgeTypes = 'active' || 'accepted' || 'transport' || 'done';
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${date.getFullYear()} - ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  const [visibleButton, setShowButton] = useState(true);

  const createTransportButton =
    request.status === 'accepted' && visibleButton && user?.role === 'admin';
  const [showTransportModal, setTransportModal] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>();

  const { pathname } = useLocation();

  const DEFAULT_DRIVER_PAGE = 0;
  const DEFAULT_DRIVER_PAGE_SIZE = 100;

  const isActive = request.status === 'active';
  const isTransport = request.status === 'transport';
  const isReceivedPage = pathname.split('/').pop() === 'recebidas';
  const isSentPage = pathname.split('/').pop() === 'enviadas';

  const handleTransportModal = async () => {
    setTransportModal(true);
    setShowButton(false);
  };

  useEffect(() => {
    (async () => {
      if (showTransportModal) {
        const response: Pagination<Driver> = await driverService.getDrivers({
          generalRegister: formData.rg.value,
          page: DEFAULT_DRIVER_PAGE,
          pageSize: DEFAULT_DRIVER_PAGE_SIZE,
        });
        setDrivers(response.items ?? []);
      }
    })();
  }, [formData.rg.value, showTransportModal]);

  const handleAccept = async () => {
    await requestService.accept(request.requestId);
    await onAccept?.();
    onClose();
  };

  const handleDone = async () => {
    await requestService.done(request.requestId);
    await onDone?.();
    onClose();
  };

  const handleDenied = async () => {
    await requestService.reject(request.requestId);
    await onReject?.();
    onClose();
  };

  function showDriver() {
    if (request.delivery?.driver) {
      return (
        <div>
          <p className="titulo">Motorista</p>
          <div className="element-driver">
            <div className="containerL">
              <div className="element">
                <img src="/assets/user.svg" alt="icone" />
                <p className="container-field-component">
                  {request.delivery?.driver?.name}
                </p>
              </div>
            </div>
            <div className="containerR2">
              <div className="element">
                <p className="titulo-container">RG:</p>
                <p className="container-field-component">
                  {request.delivery?.driver?.generalRegister}
                </p>
              </div>
              <div className="element">
                <p className="titulo-container">Número:</p>
                <p className="container-field-component">
                  {request.delivery?.driver?.phoneNumber}
                </p>
              </div>

              <div className="element">
                <p className="titulo-container">Placa:</p>
                <p className="container-field-component">
                  {request.delivery?.licensePlate}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  const handleCreateTransport = async () => {
    const formFields = ['licensePlate', 'driver', 'cellphone', 'rg'] as const;
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
      await requestService.registerTransport(request.requestId, {
        description: formData.description.value,
        licensePlate: formData.licensePlate.value,
        driverName: formData.driver.value,
        phoneNumber: formData.cellphone.value,
        generalRegister: formData.rg.value,
      });
      await onTransportRegister?.();
      onClose?.();
    }
  };

  return (
    <div className="my-requests-modal">
      <Modal
        open={isOpen}
        onClose={onClose}
        badge={<Badge id="status" type={request.status as typeof badgeTypes} />}
        title={request.medicament.name}
      >
        <div className="myRequests-container">
          {request ? (
            <>
              <div className="informations">
                <p className="titulo">Hospital</p>
                <p className="field-component">
                  {request.originInstitution?.name}
                </p>

                <p className="titulo">Princípio ativo</p>
                <p className="field-component">
                  {request.medicament.principleActive}
                </p>

                <p className="titulo">Descrição</p>
                <p className="field-component">
                  {request.observation || 'Sem descrição disponível'}
                </p>

                <div className="container">
                  <div className="containerL">
                    <p className="titulo">Data</p>
                    <div className="element">
                      <img src="/assets/date-icon.svg" alt="icone" />
                      <p className="container-field-component">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                  <div className="containerR">
                    <div className="element">
                      <p className="titulo-container">Aceita Genérico?</p>
                      <p className="container-field-component">
                        {request.genericAccepted ? 'Sim' : 'Não'}
                      </p>
                    </div>
                    <div className="element">
                      <p className="titulo-container">Quantidade:</p>
                      <p className="container-field-component">
                        {request.amount} caixa(s)
                      </p>
                    </div>

                    <div className="element">
                      <p className="titulo-container">Dosagem:</p>
                      <p className="container-field-component">
                        {request.medicament.dosage}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="titulo">Requisitante</p>
                <div className="element-doctor">
                  <div className="element">
                    <img src="/assets/user.svg" alt="icone" />
                    <p className="field-doctor-component">{request.doctor}</p>
                  </div>
                  <div className="element">
                    <img src="/assets/CRM-icon.svg" alt="icone" />
                    <p className="field-doctor-component">{request.crm}</p>
                  </div>
                </div>
                {showDriver()}
                {createTransportButton && (
                  <div>
                    <ButtonComponent
                      type="primary"
                      id="create-register-transport"
                      onClick={handleTransportModal}
                      size={1}
                      fullWidth
                    >
                      Criar Transporte
                    </ButtonComponent>
                  </div>
                )}

                {showTransportModal && (
                  <Modal title="Novo Transporte" open>
                    <div>
                      <form className="formzao">
                        <div
                          style={{ zIndex: 999999999999 }}
                          className="new-transport-textfield"
                        >
                          <Select
                            id="new-transport-driver-rg"
                            label="RG"
                            options={
                              drivers?.map(
                                (driver) =>
                                  `${driver.generalRegister} (${driver.name})`
                              ) || []
                            }
                            placeholder="RG do motorista"
                            value={formData.rg.value}
                            onChange={(v) => {
                              const rg = v.split(' ')?.[0]?.trim();
                              const driver = drivers?.find(
                                (driver) => driver.generalRegister === rg
                              );
                              setFormData({
                                ...formData,
                                rg: {
                                  ...formData.rg,
                                  value: rg,
                                  errorMsg: '',
                                },
                                driver: {
                                  ...formData.driver,
                                  value: driver?.name ?? '',
                                  errorMsg: '',
                                },
                                cellphone: {
                                  ...formData.cellphone,
                                  value: driver?.phoneNumber ?? '',
                                  errorMsg: '',
                                },
                              });
                            }}
                            errorMessage={formData.rg.errorMsg}
                            required
                          />
                        </div>
                        <div className="new-transport-textfield">
                          <TextField
                            id="driver"
                            label="Motorista"
                            placeholder="Nome do Motorista"
                            required
                            errormessage={formData.driver.errorMsg}
                            value={formData.driver.value}
                            onChange={(v: any) =>
                              setFormData({
                                ...formData,
                                driver: { ...formData.driver, value: v },
                              })
                            }
                          />
                        </div>
                        <div className="new-transport-textfield">
                          <TextField
                            id="license-plate"
                            label="Placa do veículo"
                            placeholder="ABC1A22"
                            required
                            errormessage={formData.licensePlate.errorMsg}
                            value={formData.licensePlate.value}
                            onChange={(v: any) =>
                              setFormData({
                                ...formData,
                                licensePlate: {
                                  ...formData.licensePlate,
                                  value: v,
                                },
                              })
                            }
                          />
                        </div>

                        <div className="new-transport-textfield">
                          <TextField
                            id="cellphone"
                            label="Telefone"
                            placeholder="Telefone do Motorista"
                            required
                            errormessage={formData.cellphone.errorMsg}
                            mask="(99) 99999-9999"
                            value={formData.cellphone.value}
                            onChange={(v: any) =>
                              setFormData({
                                ...formData,
                                cellphone: { ...formData.cellphone, value: v },
                              })
                            }
                          />
                        </div>

                        <div className="new-transport-textfield">
                          <TextField
                            id="description"
                            label="Descrição"
                            placeholder=""
                            value={formData.description.value}
                            onChange={() =>
                              setFormData({
                                ...formData,
                              })
                            }
                          />
                        </div>
                      </form>

                      <div>
                        <ButtonComponent
                          type="primary"
                          id="confirm-register-transport"
                          onClick={handleCreateTransport}
                          size={1}
                          fullWidth
                        >
                          Registrar Transporte
                        </ButtonComponent>
                      </div>
                    </div>
                  </Modal>
                )}
              </div>
              <div className="buttons">
                {isActive && isReceivedPage ? (
                  <>
                    <ButtonComponent
                      type={'secondary'}
                      onClick={() => handleDenied()}
                      size={3}
                      id={'rejeitar'}
                    >
                      Rejeitar
                    </ButtonComponent>

                    <ButtonComponent
                      type={'primary'}
                      onClick={() => handleAccept()}
                      size={3}
                      id={'aceitar'}
                    >
                      Aceitar
                    </ButtonComponent>
                  </>
                ) : undefined}
                {isTransport && isSentPage ? (
                  <>
                    <ButtonComponent
                      type={'secondary'}
                      onClick={onClose}
                      size={3}
                      id={'voltar'}
                    >
                      Voltar
                    </ButtonComponent>

                    <ButtonComponent
                      type={'primary'}
                      onClick={() => handleDone()}
                      size={3}
                      id={'finalizar'}
                    >
                      Finalizar
                    </ButtonComponent>
                  </>
                ) : undefined}
              </div>
            </>
          ) : (
            'Carregando...'
          )}
        </div>
      </Modal>
    </div>
  );
};
