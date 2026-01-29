import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Stack, TextInput, PasswordInput, Button, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser, IconLock, IconAlertCircle } from '@tabler/icons-react';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginReducer } from '../../model/slice/loginSlice';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

interface LoginFormValues {
  username: string;
  password: string;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const forceUpdate = useForceUpdate();

  const form = useForm<LoginFormValues>({
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: (value) =>
        value.trim().length < 1 ? t('Username is required') : null,
      password: (value) =>
        value.length < 1 ? t('Password is required') : null
    },
    validateInputOnBlur: true
  });

  const handleSubmit = useCallback(
    async (values: LoginFormValues) => {
      const result = await dispatch(
        loginByUsername({ username: values.username, password: values.password })
      );
      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess();
        forceUpdate();
      }
    },
    [dispatch, onSuccess, forceUpdate]
  );

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <form onSubmit={form.onSubmit(handleSubmit)} className={className}>
        <Stack gap="lg">
          {error && (
            <Alert
              variant="light"
              color="red"
              icon={<IconAlertCircle size={16} />}
              title={t('Ошибка при авторизации')}
            >
              {t('Вы ввели неверный логин или пароль')}
            </Alert>
          )}

          <TextInput
            data-autofocus
            label={t('Username')}
            placeholder={t('Введите username')}
            leftSection={<IconUser size={16} />}
            {...form.getInputProps('username')}
          />

          <PasswordInput
            label={t('Password')}
            placeholder={t('Введите пароль')}
            leftSection={<IconLock size={16} />}
            visibilityToggleButtonProps={{
              'aria-label': t('Toggle password visibility')
            }}
            {...form.getInputProps('password')}
          />

          <Button type="submit" fullWidth loading={isLoading} mt="xs">
            {t('Войти')}
          </Button>
        </Stack>
      </form>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
