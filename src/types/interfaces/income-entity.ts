import BaseEntity from './base-entity'

interface IncomeEntity extends BaseEntity {
  description: string
  amount: number
  date: Date
}

export default IncomeEntity
