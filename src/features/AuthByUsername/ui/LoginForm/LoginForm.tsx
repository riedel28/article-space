import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useForm } from '@tanstack/react-form';
import { Loader2 } from 'lucide-react';
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
import { Button } from '@/shared/ui/shadcn/Button';
import { Input } from '@/shared/ui/shadcn/Input';
import { Field, FieldLabel, FieldError } from '@/shared/ui/shadcn/Field';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
};

const LoginForm = ({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const forceUpdate = useForceUpdate();

    const form = useForm({
        defaultValues: {
            username: username || '',
            password: password || ''
        },
        onSubmit: async ({ value }) => {
            const result = await dispatch(
                loginByUsername({
                    username: value.username || '',
                    password: value.password || ''
                })
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
                forceUpdate();
            }
        }
    });

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className={className}
            >
                <div className="flex flex-col space-y-6">
                    <h2 className="text-lg font-semibold">
                        {t('Форма авторизации')}
                    </h2>
                    {error && (
                        <p className="text-sm font-medium text-destructive">
                            {t('Вы ввели неверный логин или пароль')}
                        </p>
                    )}
                    <form.Field name="username">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field
                                    data-invalid={isInvalid}
                                    className="flex flex-col space-y-2"
                                >
                                    <FieldLabel htmlFor={field.name}>
                                        {t('Username')}
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="text"
                                        placeholder={t('Введите username')}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                            dispatch(
                                                loginActions.setUsername(
                                                    e.target.value
                                                )
                                            );
                                        }}
                                        aria-invalid={isInvalid}
                                        autoFocus
                                        autoComplete="username"
                                    />
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors
                                                ?.map((e) =>
                                                    typeof e === 'string'
                                                        ? e
                                                        : String(e)
                                                )
                                                .filter((e): e is string =>
                                                    Boolean(e)
                                                )}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <form.Field name="password">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field
                                    data-invalid={isInvalid}
                                    className="flex flex-col space-y-2"
                                >
                                    <FieldLabel htmlFor={field.name}>
                                        {t('Password')}
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="password"
                                        placeholder={t('Введите пароль')}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                            dispatch(
                                                loginActions.setPassword(
                                                    e.target.value
                                                )
                                            );
                                        }}
                                        aria-invalid={isInvalid}
                                        autoComplete="current-password"
                                    />
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors
                                                ?.map((e) =>
                                                    typeof e === 'string'
                                                        ? e
                                                        : String(e)
                                                )
                                                .filter((e): e is string =>
                                                    Boolean(e)
                                                )}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                    <form.Subscribe
                        selector={(state) => [
                            state.canSubmit,
                            state.isSubmitting
                        ]}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                disabled={
                                    !canSubmit || isLoading || isSubmitting
                                }
                                className="w-full"
                            >
                                {(isLoading || isSubmitting) && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {t('Войти')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </form>
        </DynamicModuleLoader>
    );
};

export default LoginForm;
