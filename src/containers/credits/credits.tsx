import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import CreditsTable from '~/components/credits-table';
import Progress from '~/components/progress';
import {
  useAddCreditMutation,
  useDeleteCreditMutation,
  useGetCreditsQuery,
  useUpdateCreditMutation,
} from '~/redux/credit.api';
import LocalStorageKeys from '~/types/enums/local-storage-keys';
import CreditEntity from '~/types/interfaces/credit-entity';
import { useSelector } from '~/redux/store';

const Credits = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCreditId, setSelectedCreditId] = useState<number | null>(null);
  const [credits, setCredits] = useState<CreditEntity[]>([]);

  const { user } = useSelector((state) => state.auth);

  const { data: creditsFromQuery, isLoading: isCreditsLoading } =
    useGetCreditsQuery({
      token: localStorage.getItem(LocalStorageKeys.Token) || '',
      page,
      perPage,
    });

  const [updateCredit, { isLoading: isUpdateCreditLoading }] =
    useUpdateCreditMutation();
  const [addCredit, { isLoading: isAddCreditLoading }] = useAddCreditMutation();
  const [deleteCredit, { isLoading: isDeleteCreditLoading }] =
    useDeleteCreditMutation();

  const onCreditEdit = (id: number) => {
    setSelectedCreditId(id);
    setIsModalOpen(true);
  };

  const onAddCredit = () => {
    setIsModalOpen(true);
  };

  const onCreditDelete = async (id: number) => {
    try {
      await deleteCredit(id).unwrap();
      const updatedCredits = credits.filter((credit) => credit.id !== id);
      setCredits(updatedCredits);
    } catch (err) {
      console.error(err);
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const selectedCredit = useMemo(
    () =>
      credits?.find((credit: CreditEntity) => credit.id === selectedCreditId),
    [selectedCreditId, credits]
  );

  const onSubmit = async (values) => {
    try {
      if (selectedCreditId) {
        const updatedCredit = await updateCredit({
          id: selectedCreditId,
          body: {
            ...selectedCredit,
            ...formik.values,
            userId: user?.id || -1,
          },
        }).unwrap();

        const updatedCredits = credits.map((credit) =>
          credit.id === selectedCreditId ? updatedCredit : credit
        );
        setCredits(updatedCredits);
        setSelectedCreditId(null);
      } 
      
      else {
        const newCredit = await addCredit({
          ...selectedCredit,
          ...formik.values,
          userId: user?.id || -1,
        }).unwrap();

        const updatedCredits = [...credits, newCredit];
        setCredits(updatedCredits);
        setIsModalOpen(false);
        setSelectedCreditId(null);
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      description: selectedCredit?.description,
      totalAmountToPay: selectedCredit?.totalAmountToPay,
      startDate: selectedCredit?.startDate || new Date(),
      endDate: selectedCredit?.endDate || new Date(),
    },
    onSubmit,
  });

  useEffect(() => {
    formik.setValues({
      description: selectedCredit?.description,
      totalAmountToPay: selectedCredit?.totalAmountToPay,
      startDate: selectedCredit?.startDate || new Date(),
      endDate: selectedCredit?.endDate || new Date(),
    });
  }, [selectedCredit]);

  useEffect(() => {
    if (creditsFromQuery) {
      setCredits(creditsFromQuery);
    }
  }, [creditsFromQuery]);

  return isCreditsLoading ? (
    <Progress />
  ) : (
    <>
      <CreditsTable
        credits={credits}
        onCreditEdit={onCreditEdit}
        onCreditDelete={onCreditDelete}
      />
      <Button onClick={onAddCredit} variant="contained">
        Add credit
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

export default Credits;
