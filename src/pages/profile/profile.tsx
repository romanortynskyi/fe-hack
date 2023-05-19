import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Progress from '~/components/progress';
import { UserForm } from '~/components/user-form';
import { authActions } from '~/redux/auth.slice';
import UserEntity from '~/types/interfaces/user-entity';
import { useDispatch, useSelector } from '~/redux/store';
import Routes from '~/types/enums/routes';
import { useUpdateUserMutation, useDeleteUserMutation } from '~/redux/user.api';
import AppError from '~/types/interfaces/app-error';
import LocalStorageKeys from '~/types/enums/local-storage-keys';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isFetchingGetMe } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && !isFetchingGetMe) {
      navigate(Routes.Login, { replace: true });
    }
  }, [user, isFetchingGetMe]);

  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleteUserLoading }] =
    useDeleteUserMutation();

  const onUpdateUser = async (
    data: Partial<UserEntity>,
    image: File | null,
    shouldDeleteImage: boolean
  ) => {
    const { firstName, lastName } = data;

    const formData = new FormData();
    formData.append('firstName', firstName || '');
    formData.append('lastName', lastName || '');
    formData.append('shouldDeleteImage', shouldDeleteImage.toString());

    if (image) {
      formData.append('image', image, image.name);
    }

    try {
      const updatedUser = await updateUser({
        id: user?.id || -1,
        body: formData,
      }).unwrap();
      dispatch(authActions.setUser(updatedUser));
    } catch (error) {
      dispatch(authActions.setError((error as AppError).data.message));
    }
  };

  const onDeleteUser = async () => {
    try {
      const id = user?.id || -1;
      await deleteUser(id).unwrap();
      dispatch(authActions.setUser(null));
      localStorage.removeItem(LocalStorageKeys.Token);
    } catch (error) {
      dispatch(authActions.setError((error as AppError).data.message));
    }
  };

  const contentJSX = isFetchingGetMe ? (
    <Progress />
  ) : (
    <Box sx={{ height: '100%', marginTop: 6 }}>
      <UserForm
        firstName={user?.firstName || ''}
        lastName={user?.lastName || ''}
        image={user?.imgSrc || ''}
        onUpdateUser={onUpdateUser}
        onDeleteUser={onDeleteUser}
        isLoadingUpdateUser={isUpdateUserLoading}
        isLoadingDeleteUser={isDeleteUserLoading}
      />
    </Box>
  );

  return contentJSX;
};

export default Profile;
