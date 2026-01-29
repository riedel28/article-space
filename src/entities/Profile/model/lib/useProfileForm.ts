import { useForm } from '@mantine/form';

export interface ProfileFormValues {
  first: string;
  lastname: string;
  username: string;
  avatar: string;
}

interface UseProfileFormOptions {
  initialValues?: Partial<ProfileFormValues>;
}

export function useProfileForm(options: UseProfileFormOptions = {}) {
  const { initialValues } = options;

  const form = useForm<ProfileFormValues>({
    mode: 'controlled',
    initialValues: {
      first: initialValues?.first ?? '',
      lastname: initialValues?.lastname ?? '',
      username: initialValues?.username ?? '',
      avatar: initialValues?.avatar ?? ''
    },
    validate: {
      first: (value) =>
        value.length < 2 ? 'First name must be at least 2 characters' : null,
      lastname: (value) =>
        value.length < 2 ? 'Last name must be at least 2 characters' : null,
      username: (value) =>
        value.length < 3 ? 'Username must be at least 3 characters' : null
    }
  });

  return form;
}
