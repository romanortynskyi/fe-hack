import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import DepositsTable from '~/components/deposits-table';
import Progress from '~/components/progress';
import {
  useAddDepositMutation,
  useDeleteDepositMutation,
  useGetDepositsQuery,
  useUpdateDepositMutation,
} from '~/redux/deposit.api';
import LocalStorageKeys from '~/types/enums/local-storage-keys';
import DepositEntity from '~/types/interfaces/deposit-entity';
import { useSelector } from '~/redux/store';

const Deposits = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepositId, setSelectedDepositId] = useState<number | null>(
    null
  );
  const [deposits, setDeposits] = useState<DepositEntity[]>([]);

  const { user } = useSelector((state) => state.auth);

  const { data: depositsFromQuery, isLoading: isDepositsLoading } =
    useGetDepositsQuery({
      token: localStorage.getItem(LocalStorageKeys.Token) || '',
      page,
      perPage,
    });

  const [updateDeposit, { isLoading: isUpdateDepositLoading }] =
    useUpdateDepositMutation();
  const [addDeposit, { isLoading: isAddDepositLoading }] =
    useAddDepositMutation();
  const [deleteDeposit, { isLoading: isDeleteDepositLoading }] =
    useDeleteDepositMutation();

  const onDepositEdit = (id: number) => {
    setSelectedDepositId(id);
    setIsModalOpen(true);
  };

  const onAddDeposit = () => {
    setIsModalOpen(true);
  };

  const onDepositDelete = async (id: number) => {
    try {
      await deleteDeposit(id).unwrap();
      const updatedDeposits = deposits.filter((deposit) => deposit.id !== id);
      setDeposits(updatedDeposits);
    } catch (err) {
      console.error(err);
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const selectedDeposit = useMemo(
    () =>
      deposits?.find(
        (deposit: DepositEntity) => deposit.id === selectedDepositId
      ),
    [selectedDepositId, deposits]
  );

  const onSubmit = async (values) => {
    try {
      if (selectedDepositId) {
        const updatedDeposit = await updateDeposit({
          id: selectedDepositId,
          body: {
            ...selectedDeposit,
            ...formik.values,
            userId: user?.id || -1,
          },
        }).unwrap();

        const updatedDeposits = deposits.map((deposit) =>
          deposit.id === selectedDepositId ? updatedDeposit : deposit
        );
        setDeposits(updatedDeposits);
        setSelectedDepositId(null);
      } else {
        const newDeposit = await addDeposit({
          ...selectedDeposit,
          ...formik.values,
          userId: user?.id || -1,
        }).unwrap();

        const updatedDeposits = [...deposits, newDeposit];
        setDeposits(updatedDeposits);
        setIsModalOpen(false);
        setSelectedDepositId(null);
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      description: selectedDeposit?.description,
      totalAmountToPay: selectedDeposit?.totalAmountToPay,
      startDate: selectedDeposit?.startDate || new Date(),
      endDate: selectedDeposit?.endDate || new Date(),
    },
    onSubmit,
  });

  useEffect(() => {
    formik.setValues({
      description: selectedDeposit?.description,
      totalAmountToPay: selectedDeposit?.totalAmountToPay,
      startDate: selectedDeposit?.startDate || new Date(),
      endDate: selectedDeposit?.endDate || new Date(),
    });
  }, [selectedDeposit]);

  useEffect(() => {
    if (depositsFromQuery) {
      setDeposits(depositsFromQuery);
    }
  }, [depositsFromQuery]);

  return isDepositsLoading ? (
    <Progress />
  ) : (
    <>
      <DepositsTable
        deposits={deposits}
        onDepositEdit={onDepositEdit}
        onDepositDelete={onDepositDelete}
      />
      <Button onClick={onAddDeposit} variant="contained">
        Add deposit
      </Button>
      <Modal
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        open={isModalOpen}
        onClose={onModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ backgroundColor: '#FFF', p: 3 }}>
          <TextField
            multiline
            name="description"
            label={'Description'}
            error={formik.touched.description && !!formik.errors.description}
            helperText={
              formik.touched.description &&
              formik.errors.description?.toString()
            }
            onChange={formik.handleChange}
            value={formik.values.description}
            sx={{ marginBottom: 2, width: 1 }}
            onBlur={formik.handleBlur}
          />
          <TextField
            type="number"
            name="totalAmountToPay"
            label={'Amount'}
            error={formik.touched.totalAmountToPay && !!formik.errors.totalAmountToPay}
            helperText={
              formik.touched.totalAmountToPay && formik.errors.totalAmountToPay?.toString()
            }
            onChange={formik.handleChange}
            value={formik.values.totalAmountToPay}
            sx={{ marginBottom: 2, width: 1 }}
            onBlur={formik.handleBlur}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={'Start Date'}
              onChange={(value) => formik.setFieldValue('startDate', value)}
              value={dayjs(formik.values.startDate)}
              sx={{ marginBottom: 2, width: 1 }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={'End Date'}
              onChange={(value) => formik.setFieldValue('endDate', value)}
              value={dayjs(formik.values.endDate)}
              sx={{ marginBottom: 2, width: 1 }}
            />
          </LocalizationProvider>

          <Button variant="contained" onClick={formik.submitForm}>
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Deposits;
