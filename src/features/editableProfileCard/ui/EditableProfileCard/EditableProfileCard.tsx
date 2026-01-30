import { Alert,Stack } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ProfileCard, ProfileFormValues } from '@/entities/Profile';
import { getUserAuthData } from '@/entities/User';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { ValidateProfileError } from '../../model/consts/consts';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';

interface EditableProfileCardProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  profile: profileReducer
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className, id } = props;
  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const profileData = useSelector(getProfileData);
  const authData = useSelector(getUserAuthData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);

  const canEdit = authData?.id === profileData?.id;

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст')
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onSubmit = useCallback(
    (values: ProfileFormValues) => {
      dispatch(
        profileActions.updateProfile({
          first: values.first,
          lastname: values.lastname,
          username: values.username,
          avatar: values.avatar
        })
      );
      dispatch(updateProfileData());
    },
    [dispatch]
  );

  const onCancel = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Stack gap={16} w="100%" className={className}>
        {validateErrors?.length ? (
          <Alert
            icon={<IconAlertCircle size={20} />}
            title={t('Ошибки валидации')}
            color="red"
            variant="light"
          >
            <Stack gap={4}>
              {validateErrors.map((err) => (
                <div key={err} data-testid="EditableProfileCard.Error.Paragraph">
                  {validateErrorTranslates[err]}
                </div>
              ))}
            </Stack>
          </Alert>
        ) : null}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          canEdit={canEdit}
          onSubmit={onSubmit}
          onCancel={onCancel}
          onEdit={onEdit}
        />
      </Stack>
    </DynamicModuleLoader>
  );
});
