import BaseEntity from './base-entity';

interface CreditEntity extends BaseEntity {
  description: string;
  totalAmountToPay: number;
  startDate: Date;
  endDate: Date
}

export default CreditEntity;
