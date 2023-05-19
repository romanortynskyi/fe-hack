import { FC, MouseEventHandler } from 'react';
import Edit from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepositEntity from '~/types/interfaces/deposit-entity';
import { Delete } from '@mui/icons-material';

interface DepositsTableProps {
  deposits: DepositEntity[];
  onDepositEdit: (id: number) => void;
  onDepositDelete: (id: number) => void;
}

const DepositsTable: FC<DepositsTableProps> = (props) => {
  const { deposits, onDepositEdit, onDepositDelete } = props;

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
      field: 'totalAmountToPay',
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
          onDepositEdit(params.row.id);
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
          onDepositDelete(params.row.id);
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
        rows={deposits}
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

export default DepositsTable;
