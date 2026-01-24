import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Stack, TextInput, Button, Alert } from '@mantine/core';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const forceUpdate = useForceUpdate();

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      forceUpdate();
    }
  }, [dispatch, username, password, onSuccess, forceUpdate]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onLoginClick();
    },
    [onLoginClick]
  );

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <form onSubmit={onSubmit}>
        <Stack gap="md" w={400} className={className}>
          {error && (
            <Alert
              variant="light"
              color="red"
              title={t('Ошибка при авторизации')}
            >
              {t('Вы ввели неверный логин или пароль')}
            </Alert>
          )}

          <TextInput
            autoFocus
            type="text"
            label={t('Username')}
            placeholder={t('Введите username')}
            onChange={(e) => onChangeUsername(e.currentTarget.value)}
            value={username}
          />
          <TextInput
            type="password"
            label={t('Password')}
            placeholder={t('Введите пароль')}
            onChange={(e) => onChangePassword(e.currentTarget.value)}
            value={password}
          />
          <Button
            type="submit"
            mt="xs"
            ml="auto"
            fullWidth
            disabled={isLoading}
          >
            {t('Войти')}
          </Button>
        </Stack>
      </form>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
