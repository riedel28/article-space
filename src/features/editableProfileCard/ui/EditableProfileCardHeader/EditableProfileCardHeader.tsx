import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Group, Title, Button as MantineButton } from '@mantine/core';
import { IconEdit, IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
      dispatch(updateProfileData());
    }, [dispatch]);

    return (
      <Card padding="24" fullWidth border="partial">
        <Group justify="space-between" w="100%" className={className} wrap="wrap"
gap="md">
          <Title order={2} size="h3" fw={600}>
            {t('Профиль')}
          </Title>
          {canEdit &&
            (readonly ? (
              <MantineButton
                onClick={onEdit}
                data-testid="EditableProfileCardHeader.EditButton"
                leftSection={<IconEdit size={18} />}
                variant="filled"
                size="md"
              >
                {t('Редактировать')}
              </MantineButton>
            ) : (
              <Group gap={12}>
                <MantineButton
                  onClick={onCancelEdit}
                  data-testid="EditableProfileCardHeader.CancelButton"
                  color="red"
                  variant="light"
                  leftSection={<IconX size={18} />}
                  size="md"
                >
                  {t('Отменить')}
                </MantineButton>
                <MantineButton
                  onClick={onSave}
                  data-testid="EditableProfileCardHeader.SaveButton"
                  color="green"
                  variant="filled"
                  leftSection={<IconDeviceFloppy size={18} />}
                  size="md"
                >
                  {t('Сохранить')}
                </MantineButton>
              </Group>
            ))}
        </Group>
      </Card>
    );
  }
);
