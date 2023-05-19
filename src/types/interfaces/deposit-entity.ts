import BaseEntity from './base-entity';

interface DepositEntity extends BaseEntity {
  description: string;
  totalAmountToPay: number;
  date: Date;
}

export default DepositEntity;
