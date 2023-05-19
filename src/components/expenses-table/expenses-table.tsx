import Edit from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC, MouseEventHandler } from 'react';
import ExpenseEntity from '~/types/interfaces/expense-entity';

const columns: GridColDef[] = [
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 90,
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    width: 130,
    valueGetter: (params) => new Date(params.value),
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        console.log(params);
      };

      return (
        <IconButton onClick={onClick}>
          <Edit />
        </IconButton>
      );
    },
  },
];

interface ExpensesTableProps {
  expenses: ExpenseEntity[];
}

const ExpensesTable: FC<ExpensesTableProps> = (props) => {
  const { expenses } = props;
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={expenses}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
      />
    </div>
  );
};
export default ExpensesTable;
