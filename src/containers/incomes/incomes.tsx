import { useState } from 'react'

import IncomesTable from '~/components/incomes-table'
import Progress from '~/components/progress'
import { useGetIncomesQuery } from '~/redux/income.api'
import LocalStorageKeys from '~/types/enums/local-storage-keys'

const Incomes = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  const { data: incomes, isLoading: isIncomesLoading } = useGetIncomesQuery({
    token: localStorage.getItem(LocalStorageKeys.Token) || '',
    page,
    perPage,
  })

  return isIncomesLoading ? <Progress /> : (
    <IncomesTable incomes={incomes} />
  )
}

export default Incomes
