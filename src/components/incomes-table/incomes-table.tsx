import { FC, MouseEventHandler } from 'react';
import Edit from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IncomeEntity from '~/types/interfaces/income-entity';
import { Delete } from '@mui/icons-material';

interface IncomesTableProps {
  incomes: IncomeEntity[];
  onIncomeEdit: (id: number) => void;
  onIncomeDelete: (id: number) => void;
}

const IncomesTable: FC<IncomesTableProps> = (props) => {
  const { incomes, onIncomeEdit, onIncomeDelete } = props;

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
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
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      renderCell: (params) => {
        const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
          e.stopPropagation();
          onIncomeEdit(params.row.id);
        };

        return (
          <IconButton onClick={onClick}>
            <Edit />
          </IconButton>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      renderCell: (params) => {
        const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
          e.stopPropagation();
          onIncomeDelete(params.row.id);
        };

        return (
          <IconButton onClick={onClick}>
            <Delete />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={incomes}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default IncomesTable;
