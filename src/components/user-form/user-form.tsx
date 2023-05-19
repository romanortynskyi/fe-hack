import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, TextField, Button, CircularProgress } from '@mui/material';

import ImageInput from '~/components/image-input';
import UserEntity from '~/types/interfaces/user-entity';

interface UserFormProps {
  isLoadingUpdateUser: boolean;
  isLoadingDeleteUser: boolean;
  firstName: string;
  lastName: string;
  image: string;
  onUpdateUser: (
    data: Partial<UserEntity>,
    image: File | null,
    shouldDeleteImage: boolean,
    callback: () => void
  ) => void;
  onDeleteUser: () => void;
}

interface UserFormValues {
  firstName: string;
  lastName: string;
  image?: string | null;
}

export const UserForm = (props: UserFormProps) => {
  const {
    isLoadingUpdateUser,
    isLoadingDeleteUser,
    firstName,
    lastName,
    image,
    onUpdateUser,
    onDeleteUser,
  } = props;

  const [shouldDeleteImage, setShouldDeleteImage] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const afterUpdateUser = (values: UserFormValues) => {
    const { firstName, lastName, image } = values;

    formik.resetForm({
      values: {
        firstName,
        lastName,
        image: image || '',
      },
    });
  };

  const onSubmit = async (values: UserFormValues) => {
    const { firstName, lastName } = values;

    onUpdateUser(
      {
        firstName,
        lastName,
      },
      imageFile || null,
      shouldDeleteImage,
      () => afterUpdateUser(values)
    );
  };

  const formik = useFormik({
    initialValues: {
      image,
      firstName,
      lastName,
    },
    onSubmit,
  });

  useEffect(() => {
    setShouldDeleteImage(
      !!formik.touched.image && formik.values.image === null
    );
  }, [formik.touched.image, formik.values.image]);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImageLoading(true);

    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        formik.setFieldValue('image', reader.result);
        setIsImageLoading(false);
      };
    }

    formik.setFieldValue('image', e.target.files?.[0]);
    formik.setFieldTouched('image', true);
  };

  const onDeleteImage = () => {
    formik.setFieldValue('image', null);
    formik.setFieldTouched('image', true);
  };

  const submitButtonContent = isLoadingUpdateUser ? (
    <Box
      component="span"
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '20px',
      }}
    >
      <Box component="span">Зберегти</Box>
      <CircularProgress
        size="1rem"
        sx={{ position: 'absolute', left: 'calc(100% + 5px)' }}
      />
    </Box>
  ) : (
    'Зберегти'
  );

  const deleteButtonContent = isLoadingDeleteUser ? (
    <Box
      component="span"
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '20px',
      }}
    >
      <Box component="span">Видалити акаунт</Box>
      <CircularProgress
        size="1rem"
        sx={{ position: 'absolute', left: 'calc(100% + 5px)' }}
      />
    </Box>
  ) : (
    'Видалити акаунт'
  );

  return (
    <Box sx={{ width: '300px', margin: '0 auto' }}>
      <form onSubmit={formik.handleSubmit}>
        <ImageInput
          imgSrc={formik.values.image}
          isLoading={isImageLoading}
          onChange={onChangeImage}
          onDelete={onDeleteImage}
        />
        <TextField
          name="firstName"
          label={"Ім'я"}
          onChange={formik.handleChange}
          value={formik.values.firstName}
          sx={{ marginBottom: 2, width: 1 }}
        />
        <TextField
          name="lastName"
          label="Прізвище"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          sx={{ marginBottom: 2, width: 1 }}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={formik.submitForm}
          sx={{ marginBottom: 2, width: 1, height: '36.5px' }}
          disabled={isLoadingUpdateUser || !formik.dirty}
        >
          {submitButtonContent}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onDeleteUser}
          sx={{ marginBottom: 2, width: 1 }}
          disabled={isLoadingDeleteUser}
        >
          {deleteButtonContent}
        </Button>
      </form>
    </Box>
  );
};
