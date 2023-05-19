import { useState } from 'react';
import ExpensesTable from '~/components/expenses-table/expenses-table';

import Progress from '~/components/progress';
import { useGetExpensesQuery } from '~/redux/expense.api';
import LocalStorageKeys from '~/types/enums/local-storage-keys';

const Expenses = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data: expenses, isLoading: isExpensesLoading } = useGetExpensesQuery({
    token: localStorage.getItem(LocalStorageKeys.Token) || '',
    page,
    perPage,
  });

  return isExpensesLoading ? (
    <Progress />
  ) : (
    <ExpensesTable expenses={expenses} />
  );
};

export default Expenses;
