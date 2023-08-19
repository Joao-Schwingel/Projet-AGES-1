import {
  Delivery,
  Driver,
  Medicament,
  PrismaClient,
  Request,
  User,
  DeniedRequests,
} from '@prisma/client';
import { create } from 'domain';

//initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('Deleting all database data');
  await prisma.delivery.deleteMany();
  await prisma.request.deleteMany();
  await prisma.user.deleteMany();
  await prisma.medicament.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.deniedRequests.deleteMany();

  const createUser = async (data: Omit<User, 'userId'>) => {
    const user = await prisma.user.create({ data });
    console.log('User inserted!', user.username);
    return user;
  };

  const createMedicament = async (data: Omit<Medicament, 'medicamentId'>) => {
    const medicament = await prisma.medicament.create({ data });
    console.log('Medicament inserted!', medicament.name);
    return medicament;
  };

  const createDriver = async (data: Omit<Driver, 'driverId'>) => {
    const driver = await prisma.driver.create({ data });
    console.log('Driver inserted!', driver.generalRegister);
    return driver;
  };

  const createRequest = async (data: Omit<Request, 'requestId'>) => {
    const request = await prisma.request.create({ data });
    console.log('Request inserted!', String(request.requestId));
    return request;
  };

  const createDelivery = async (data: Omit<Delivery, 'deliveryId'>) => {
    const delivery = await prisma.delivery.create({ data });
    console.log('Delivery inserted!', String(delivery.deliveryId));
    return delivery;
  };

  const createDeniedRequest = async (
    data: Omit<DeniedRequests, 'deniedId'>,
  ) => {
    const deniedRequests = await prisma.deniedRequests.create({ data });
    console.log('DeniedRequest inserted!', String(deniedRequests.deniedId));
    return deniedRequests;
  };

  const admin1 = await createUser({
    email: 'connectpharmacy@connectpharmacy.com',
    username: 'connectpharmacy',
    cnpj: '123-123-123-123',
    name: 'David K. Brown',
    role: 'admin',
    password: 'admin',
    phone: '(51) 95551-2123',
    state: 'Rio Grande do Sul',
    city: 'Porto Alegre',
    street: 'Rua Vinte e Quatro de Outubro',
    number: '400',
    complement: 'Loja 202',
    postalCode: '90510-000',
    neighborhood: 'Moinhos de Vento',
    photoURL: null,
    dateAndTime: new Date(2021, 0, 3, 17, 21, 30, 0),
  });

  const institution1 = await createUser({
    email: 'institution1@portoalegrehealth.com',
    username: 'institution',
    cnpj: '11.111.111/0001-11',
    name: 'Hospital de Clínicas de Porto Alegre',
    role: 'institution',
    password: 'institution',
    phone: '(51) 93359-8000',
    state: 'Rio Grande do Sul',
    city: 'Porto Alegre',
    street: 'R. Ramiro Barcelos, 2350',
    number: '',
    complement: '',
    postalCode: '90035-903',
    neighborhood: 'Santa Cecília',
    photoURL:
      'data:image/jpeg;base64,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',
    dateAndTime: new Date(2023, 0, 3, 17, 21, 30, 0),
  });

  const institution2 = await createUser({
    email: 'institution2@portoalegrehealth.com',
    username: 'institution2',
    cnpj: '22.222.222/0001-22',
    name: 'Hospital Moinhos de Vento',
    role: 'institution',
    password: 'institution',
    phone: '(51) 93314-3434',
    state: 'Rio Grande do Sul',
    city: 'Porto Alegre',
    street: 'R. Ramiro Barcelos, 910',
    number: '',
    complement: '',
    postalCode: '90035-001',
    neighborhood: 'Moinhos de Vento',
    photoURL: null,
    dateAndTime: new Date(2022, 0, 3, 17, 21, 30, 0),
  });

  const institution3 = await createUser({
    email: 'institution3@portoalegrehealth.com',
    username: 'institution3',
    cnpj: '33.333.333/0001-33',
    name: 'Hospital Ernesto Dornelles',
    role: 'institution',
    password: 'institution',
    phone: '(51) 93320-6000',
    state: 'Rio Grande do Sul',
    city: 'Porto Alegre',
    street: 'Av. Ipiranga, 1801',
    number: '',
    complement: '',
    postalCode: '90160-093',
    neighborhood: 'Azenha',
    photoURL: null,
    dateAndTime: new Date(2023, 0, 3, 17, 21, 30, 0),
  });

  const institution4 = await createUser({
    email: 'institution4@portoalegrehealth.com',
    username: 'institution4',
    cnpj: '44.444.444/0001-44',
    name: 'Hospital São Lucas da PUCRS',
    role: 'institution',
    password: 'institution',
    phone: '(51) 93320-3700',
    state: 'Rio Grande do Sul',
    city: 'Porto Alegre',
    street: 'Av. Ipiranga, 6690',
    number: '',
    complement: '',
    postalCode: '90610-000',
    neighborhood: 'Partenon',
    photoURL: null,
    dateAndTime: new Date(2021, 0, 3, 17, 21, 30, 0),
  });

  const institution5 = await createUser({
    email: 'institution5@portoalegrehealth.com',
    username: 'institution5',
    cnpj: '55.555.555/0001-55',
    name: 'Hospital Divina Providência',
    role: 'institution',
    password: 'institution',
    phone: '(51) 93361-3100',
    state: 'Rio Grande do Sul',
    city: 'Porto Alegre',
    street: 'Rua da Gruta, 145',
    number: '',
    complement: '',
    postalCode: '91710-060',
    neighborhood: 'Cascata',
    photoURL: null,
    dateAndTime: new Date(2021, 0, 3, 17, 21, 30, 0),
  });

  const institution6 = await createUser({
    email: 'santacasa@santacasa.com.br',
    username: 'santacasa',
    cnpj: '92.662.181/0001-05',
    role: 'institution',
    password: 'institution',
    phone: '(51) 93214-8000',
    state: 'Rio grande do sul',
    city: 'Porto Alegre',
    street: 'Av. Independência',
    number: '75',
    complement: '',
    postalCode: '90035-075',
    neighborhood: 'Independência',
    name: 'Santa Casa de Misericórdia de Porto Alegre',
    photoURL: null,
    dateAndTime: new Date(2021, 0, 3, 17, 21, 30, 0),
  });

  const institution7 = await createUser({
    email: 'hc@hc.com.br',
    username: 'hc',
    cnpj: '93.048.196/0001-56',
    role: 'institution',
    password: 'institution',
    phone: '(51) 93359-8111',
    state: 'Rio grande do sul',
    city: 'Porto Alegre',
    street: 'R. Professor Annes Dias',
    number: '285',
    complement: '',
    postalCode: '90020-090',
    neighborhood: 'Centro Histórico',
    name: 'Hospital de Clínicas de Porto Alegre',
    photoURL: null,
    dateAndTime: new Date(2021, 0, 3, 17, 21, 30, 0),
  });

  const institution8 = await createUser({
    email: 'saojose@saojose.com.br',
    username: 'saojose',
    cnpj: '92.055.292/0001-80',
    role: 'institution',
    password: 'institution',
    phone: '(51) 93230-2121',
    state: 'Rio grande do sul',
    city: 'Porto Alegre',
    street: 'R. Dom Pedro II',
    number: '1180',
    complement: '',
    postalCode: '90230-090',
    neighborhood: 'São José',
    name: 'Hospital São José',
    photoURL: null,
    dateAndTime: new Date(2021, 0, 3, 17, 21, 30, 0),
  });

  const institution9 = await createUser({
    email: 'moinhos@moinhos.com.br',
    username: 'moinhos',
    cnpj: '92.641.064/0001-80',
    role: 'institution',
    password: 'institution',
    phone: '(51) 93314-3435',
    state: 'Rio grande do sul',
    city: 'Porto Alegre',
    street: 'R. Ramiro Barcelos',
    number: '910',
    complement: '',
    postalCode: '90035-001',
    neighborhood: 'Moinhos de Vento',
    name: 'Hospital Moinhos de Vento',
    photoURL: null,
    dateAndTime: new Date(2021, 0, 3, 17, 21, 30, 0),
  });

  const institution10 = await createUser({
    email: 'conceicao@conceicao.com.br',
    username: 'conceicao',
    cnpj: '94.277.826/0001-45',
    role: 'institution',
    password: 'institution',
    phone: '(51) 93357-2000',
    state: 'Rio grande do sul',
    city: 'Porto Alegre',
    street: 'Av. Francisco Trein',
    number: '596',
    complement: '',
    postalCode: '91350-200',
    neighborhood: 'Boa Vista',
    name: 'Hospital Nossa Senhora da Conceição',
    photoURL: null,
    dateAndTime: new Date(2021, 0, 3, 17, 21, 30, 0),
  });

  const medicament1 = await createMedicament({
    name: 'Tylenol',
    principleActive: 'Tylenol',
    dosage: '10 mg',
    photoURL: null,
  });

  const medicament2 = await createMedicament({
    name: 'Paracetamol',
    principleActive: 'Paracetamol',
    dosage: '20 mg',
    photoURL: null,
  });

  const medicament3 = await createMedicament({
    name: 'Ibuprofeno',
    principleActive: 'Ibuprofeno',
    dosage: '30 mg',
    photoURL: null,
  });

  const medicament4 = await createMedicament({
    name: 'Aspirin',
    principleActive: 'Acetylsalicylic acid',
    dosage: '50 mg',
    photoURL: null,
  });

  const medicament5 = await createMedicament({
    name: 'Zyrtec',
    principleActive: 'Cetirizine',
    dosage: '5 mg',
    photoURL: null,
  });

  const medicament6 = await createMedicament({
    name: 'Claritin',
    principleActive: 'Loratadine',
    dosage: '10 mg',
    photoURL: null,
  });

  const medicament7 = await createMedicament({
    name: 'Advil',
    principleActive: 'Ibuprofen',
    dosage: '20 mg',
    photoURL: null,
  });

  const medicament8 = await createMedicament({
    name: 'Naproxen',
    principleActive: 'Naproxen',
    dosage: '25 mg',
    photoURL: null,
  });

  const medicament9 = await createMedicament({
    name: 'Allegra',
    principleActive: 'Fexofenadine',
    dosage: '15 mg',
    photoURL: null,
  });

  const medicament10 = await createMedicament({
    name: 'Benadryl',
    principleActive: 'Diphenhydramine',
    dosage: '10 mg',
    photoURL: null,
  });

  const medicament11 = await createMedicament({
    name: 'Robitussin',
    principleActive: 'Dextromethorphan',
    dosage: '15 mg',
    photoURL: null,
  });

  const medicament12 = await createMedicament({
    name: 'Mucinex',
    principleActive: 'Guaifenesin',
    dosage: '20 mg',
    photoURL: null,
  });

  const medicament13 = await createMedicament({
    name: 'Flonase',
    principleActive: 'Fluticasone',
    dosage: '5 mg',
    photoURL: null,
  });

  const driver1 = await createDriver({
    name: 'João Pedro',
    generalRegister: '40.028.057-9',
    phoneNumber: '(12) 93412-3412',
  });

  const driver2 = await createDriver({
    name: 'Marcos pereira',
    generalRegister: '18.349.543-6',
    phoneNumber: '(12) 93443-4321',
  });

  const driver3 = await createDriver({
    name: 'Larissa Souza',
    generalRegister: '41.654.321-0',
    phoneNumber: '(12) 91212-1212',
  });

  const driver4 = await createDriver({
    name: 'Pedro Henrique',
    generalRegister: '21.007.641-0',
    phoneNumber: '(34) 93434-3434',
  });

  const driver5 = await createDriver({
    name: 'Thiago Silva',
    generalRegister: '39.102.007-6',
    phoneNumber: '(56) 95656-5656',
  });

  const driver6 = await createDriver({
    name: 'Aline Pereira',
    generalRegister: '46.762.841-2',
    phoneNumber: '(78) 97878-7878',
  });

  const driver7 = await createDriver({
    name: 'Gabriel Alves',
    generalRegister: '17.623.549-3',
    phoneNumber: '(90) 99090-9090',
  });

  const driver8 = await createDriver({
    name: 'Fernanda Oliveira',
    generalRegister: '36.842.310-8',
    phoneNumber: '(51) 95151-5151',
  });

  const driver9 = await createDriver({
    name: 'Leonardo Santos',
    generalRegister: '46.902.847-7',
    phoneNumber: '(53) 95353-5353',
  });

  const driver10 = await createDriver({
    name: 'Carla Fernandes',
    generalRegister: '23.582.194-0',
    phoneNumber: '(47) 94747-4747',
  });

  const driver11 = await createDriver({
    name: 'Renato Xavier',
    generalRegister: '19.407.303-4',
    phoneNumber: '(54) 95454-5454',
  });

  const driver12 = await createDriver({
    name: 'Vitoria Oliveira',
    generalRegister: '30.239.506-6',
    phoneNumber: '(48) 94848-4848',
  });

  const request1 = await createRequest({
    accepterUserId: institution1.userId,
    amount: '5 caixas',
    crm: '9238471221',
    dateAndTime: new Date(2023, 0, 3, 17, 21, 30, 0),
    doctor: 'Alessandro Pereira',
    genericAccepted: false,
    medicamentId: medicament1.medicamentId,
    observation: null,
    originInstitutionId: institution2.userId,
    status: 'accepted',
  });

  const request2 = await createRequest({
    accepterUserId: institution2.userId,
    amount: '3 caixas',
    crm: '8347123121',
    dateAndTime: new Date(2023, 0, 4, 10, 45, 0, 0),
    doctor: 'Maria Silva',
    genericAccepted: false,
    medicamentId: medicament2.medicamentId,
    observation: null,
    originInstitutionId: institution3.userId,
    status: 'accepted',
  });

  const request3 = await createRequest({
    accepterUserId: institution3.userId,
    amount: '10 frascos',
    crm: '7218738192',
    dateAndTime: new Date(2023, 1, 5, 8, 0, 0, 0),
    doctor: 'Pedro Rodrigues',
    genericAccepted: false,
    medicamentId: medicament3.medicamentId,
    observation: 'Paciente hipertenso',
    originInstitutionId: institution1.userId,
    status: 'accepted',
  });

  const request4 = await createRequest({
    accepterUserId: null,
    amount: '7 frascos',
    crm: '1029837201',
    dateAndTime: new Date(2023, 2, 6, 14, 30, 0, 0),
    doctor: 'Luciana Souza',
    genericAccepted: false,
    medicamentId: medicament4.medicamentId,
    observation: null,
    originInstitutionId: institution4.userId,
    status: 'active',
  });

  const request5 = await createRequest({
    accepterUserId: null,
    amount: '2 caixas',
    crm: '9218301920',
    dateAndTime: new Date(2023, 1, 7, 16, 0, 0, 0),
    doctor: 'Fernando Ribeiro',
    genericAccepted: false,
    medicamentId: medicament5.medicamentId,
    observation: 'Paciente diabético',
    originInstitutionId: institution2.userId,
    status: 'active',
  });

  const request6 = await createRequest({
    accepterUserId: null,
    amount: '15 frascos',
    crm: '2873152831',
    dateAndTime: new Date(2023, 2, 8, 9, 30, 0, 0),
    doctor: 'Mariana Oliveira',
    genericAccepted: false,
    medicamentId: medicament6.medicamentId,
    observation: 'Paciente idoso',
    originInstitutionId: institution3.userId,
    status: 'active',
  });

  const request7 = await createRequest({
    accepterUserId: null,
    amount: '4 caixas',
    crm: '1278382193',
    dateAndTime: new Date(2023, 1, 9, 11, 0, 0, 0),
    doctor: 'Juliana Castro',
    genericAccepted: false,
    medicamentId: medicament7.medicamentId,
    observation: null,
    originInstitutionId: institution6.userId,
    status: 'active',
  });

  const request8 = await createRequest({
    accepterUserId: null,
    amount: '10 frascos',
    crm: '2938172398',
    dateAndTime: new Date(2023, 2, 10, 14, 30, 0, 0),
    doctor: 'Rafaela Silva',
    genericAccepted: false,
    medicamentId: medicament8.medicamentId,
    observation: null,
    originInstitutionId: institution8.userId,
    status: 'active',
  });

  const request9 = await createRequest({
    accepterUserId: null,
    amount: '5 caixas',
    crm: '1278382193',
    dateAndTime: new Date(2023, 1, 11, 16, 0, 0, 0),
    doctor: 'Lucas Souza',
    genericAccepted: false,
    medicamentId: medicament9.medicamentId,
    observation: 'Paciente com alergia a outros medicamentos',
    originInstitutionId: institution7.userId,
    status: 'active',
  });

  const request10 = await createRequest({
    accepterUserId: null,
    amount: '20 frascos',
    crm: '1029837201',
    dateAndTime: new Date(2023, 0, 12, 9, 30, 0, 0),
    doctor: 'Gabriela Santos',
    genericAccepted: false,
    medicamentId: medicament10.medicamentId,
    observation: 'Paciente com doença renal crônica',
    originInstitutionId: institution1.userId,
    status: 'active',
  });

  const request11 = await createRequest({
    accepterUserId: null,
    amount: '8 caixas',
    crm: '9218301920',
    dateAndTime: new Date(2023, 0, 13, 11, 0, 0, 0),
    doctor: 'Julio Silva',
    genericAccepted: false,
    medicamentId: medicament11.medicamentId,
    observation: 'Paciente gestante',
    originInstitutionId: institution1.userId,
    status: 'active',
  });

  const request12 = await createRequest({
    accepterUserId: null,
    amount: '12 frascos',
    crm: '2873152831',
    dateAndTime: new Date(2023, 0, 14, 14, 30, 0, 0),
    doctor: 'Laura Mendes',
    genericAccepted: false,
    medicamentId: medicament12.medicamentId,
    observation: null,
    originInstitutionId: institution5.userId,
    status: 'active',
  });

  const request13 = await createRequest({
    accepterUserId: null,
    amount: '3 caixas',
    crm: '2938172398',
    dateAndTime: new Date(2023, 2, 15, 16, 0, 0, 0),
    doctor: 'Renato Almeida',
    genericAccepted: false,
    medicamentId: medicament13.medicamentId,
    observation: 'Paciente com doença hepática',
    originInstitutionId: institution10.userId,
    status: 'active',
  });

  const request14 = await createRequest({
    accepterUserId: null,
    amount: '3 caixas',
    crm: '2938172398',
    dateAndTime: new Date(2023, 2, 15, 16, 0, 0, 0),
    doctor: 'Renato Almeida',
    genericAccepted: false,
    medicamentId: medicament13.medicamentId,
    observation: 'Paciente com doença hepática',
    originInstitutionId: institution10.userId,
    status: 'transport',
  });

  const delivery1 = await createDelivery({
    description: 'Entrega de medicação',
    driverId: driver1.driverId,
    licensePlate: 'ABC123',
    requestId: request14.requestId,
    status: 'Em Transporte',
  });

  const deniedRequests1 = await createDeniedRequest({
    userUserId: institution1.userId,
    requestId: request13.requestId,
  });
}

//execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    //close Prisma Client at the end
    await prisma.$disconnect();
  });
