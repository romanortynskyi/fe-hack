import BaseEntity from './base-entity';

interface CreditEntity extends BaseEntity {
  description: string;
  totalAmountToPay: number;
  date: Date;
}

export default CreditEntity;
