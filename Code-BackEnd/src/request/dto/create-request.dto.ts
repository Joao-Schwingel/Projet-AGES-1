export class CreateRequestDto {
  crm: string;

  doctor: string;

  genericAccepted: boolean;

  observation?: string;

  amount: string;

  medicamentId: number;

  originInstitutionId: number;

  dateAndTime: Date;

  status: string;
}
