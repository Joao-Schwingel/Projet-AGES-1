export interface RequestFilterDto {
  userId?: number;
  page?: number;
  pageSize?: number;
  status: string;
  medicamentNameContains?: string;
  driverNameContains?: string;
  day?: Date;
  minDay?: Date;
  maxDay?: Date;
  genericAccepted?: boolean;
  senderNameContains?: string;
  requesterNameContains?: string;
}
