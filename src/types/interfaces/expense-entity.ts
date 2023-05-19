import BaseEntity from './base-entity';

interface ExpenseEntity extends BaseEntity {
  description: string;
  amount: number;
  date: Date;
}

export default ExpenseEntity;
