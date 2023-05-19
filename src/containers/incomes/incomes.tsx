import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

import IncomesTable from '~/components/incomes-table'
import Progress from '~/components/progress'
import {
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useGetIncomesQuery,
  useUpdateIncomeMutation,
} from '~/redux/income.api'
import LocalStorageKeys from '~/types/enums/local-storage-keys'
import IncomeEntity from '~/types/interfaces/income-entity'
import { useSelector } from '~/redux/store'

const Incomes = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIncomeId, setSelectedIncomeId] = useState<number | null>(null)
  const [incomes, setIncomes] = useState<IncomeEntity[]>([])

  const { user } = useSelector((state) => state.auth)

  const { data: incomesFromQuery, isLoading: isIncomesLoading } = useGetIncomesQuery({
    token: localStorage.getItem(LocalStorageKeys.Token) || '',
    page,
    perPage,
  })

  const [updateIncome, { isLoading: isUpdateIncomeLoading }] = useUpdateIncomeMutation()
  const [addIncome, { isLoading: isAddIncomeLoading }] = useAddIncomeMutation()
  const [deleteIncome, { isLoading: isDeleteIncomeLoading }] = useDeleteIncomeMutation()

  const onIncomeEdit = (id: number) => {
    setSelectedIncomeId(id)
    setIsModalOpen(true)
  }

  const onAddIncome = () => {
    setIsModalOpen(true)
  }

  const onIncomeDelete = async (id: number) => {
    try {
      await deleteIncome(id).unwrap()
      const updatedIncomes = incomes.filter((income) => income.id !== id)
      setIncomes(updatedIncomes)
    }

    catch (err) {
      console.error(err)
    }
  } 

  const onModalClose = () => {
    setIsModalOpen(false)
  }

  const selectedIncome = useMemo(
    () => incomes?.find((income: IncomeEntity) => income.id === selectedIncomeId),
    [selectedIncomeId, incomes],
  )

  const onSubmit = async (values) => {
    try {
      if (selectedIncomeId) {
        const updatedIncome = await updateIncome({
          id: selectedIncomeId,
          body: {
            ...selectedIncome,
            ...formik.values,
            userId: user?.id || -1,
          },
        }).unwrap()

        const updatedIncomes = incomes.map((income) => income.id === selectedIncomeId ? updatedIncome : income)
        setIncomes(updatedIncomes)
        setSelectedIncomeId(null)
      }

      else {
        const newIncome = await addIncome({
          ...selectedIncome,
          ...formik.values,
          userId: user?.id || -1,
        }).unwrap()

        const updatedIncomes = [...incomes, newIncome]
        setIncomes(updatedIncomes)
        setIsModalOpen(false)
        setSelectedIncomeId(null)
      }

      setIsModalOpen(false)
    }
    
    catch (err) {
      console.error(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      description: selectedIncome?.description,
      amount: selectedIncome?.amount,
      date: selectedIncome?.date || new Date(),
    },
    onSubmit,
  })

  useEffect(() => {
    formik.setValues({
      description: selectedIncome?.description,
      amount: selectedIncome?.amount,
      date: selectedIncome?.date || new Date(),
    })
  }, [selectedIncome])

  useEffect(() => {
    if (incomesFromQuery) {
      setIncomes(incomesFromQuery)
    }
  }, [incomesFromQuery])

  return isIncomesLoading ? <Progress /> : (
    <>
      <IncomesTable
        incomes={incomes}
        onIncomeEdit={onIncomeEdit}
        onIncomeDelete={onIncomeDelete}
      />
      <Button
        onClick={onAddIncome}
        variant='contained'
      >Add income</Button>
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
            name='description'
            label={'Description'}
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description?.toString()}
            onChange={formik.handleChange}
            value={formik.values.description}
            sx={{ marginBottom: 2, width: 1 }}
            onBlur={formik.handleBlur}
          />
          <TextField
            type='number'
            name='amount'
            label={'Amount'}
            error={formik.touched.amount && !!formik.errors.amount}
            helperText={formik.touched.amount && formik.errors.amount?.toString()}
            onChange={formik.handleChange}
            value={formik.values.amount}
            sx={{ marginBottom: 2, width: 1 }}
            onBlur={formik.handleBlur}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={'Date'}
              onChange={(value) => formik.setFieldValue('date', value)}
              value={dayjs(formik.values.date)}
              sx={{ marginBottom: 2, width: 1 }}
            />
          </LocalizationProvider>

          <Button
            variant='contained'
            onClick={formik.submitForm}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default Incomes