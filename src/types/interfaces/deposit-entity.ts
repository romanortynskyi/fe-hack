import BaseEntity from './base-entity';

interface DepositEntity extends BaseEntity {
  description: string;
  totalAmountToPay: number;
  startDate: Date;
  endDate: Date;
}

export default DepositEntity;
