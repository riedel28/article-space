import { Button as MantineButton,Group, Title } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from '@/shared/ui/redesigned/Card';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
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

  return (
    <Card padding="24" fullWidth border="partial">
      <Group justify="space-between" w="100%" className={className} wrap="wrap"
gap="md">
        <Title order={2} size="h3" fw={600}>
          {t('Profile')}
        </Title>
        {canEdit && readonly && (
          <MantineButton
            onClick={onEdit}
            data-testid="EditableProfileCardHeader.EditButton"
            leftSection={<IconEdit size={18} />}
            variant="filled"
            size="md"
          >
            {t('Edit')}
          </MantineButton>
        )}
      </Group>
    </Card>
  );
});
