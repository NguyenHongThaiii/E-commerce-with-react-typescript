import { OrderByDirection, WhereFilterOp } from 'firebase/firestore'

export interface QueryCustom {
  field: string
  operand: WhereFilterOp
  value: string | number
}

export interface OrderCustom {
  field: string
  value: OrderByDirection
}
