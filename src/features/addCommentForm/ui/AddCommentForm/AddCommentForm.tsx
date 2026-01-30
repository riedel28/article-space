import { useTranslation } from 'react-i18next';
import { memo, useCallback, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { Box, Group, Textarea, Button, Avatar, Stack } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  addCommentFormActions,
  addCommentFormReducer
} from '../../model/slices/addCommentFormSlice';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import { getUserAuthData } from '@/entities/User';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const authData = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch]
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSendHandler();
      }
    },
    [onSendHandler]
  );

  const userInitial = authData?.username?.charAt(0).toUpperCase() || '?';

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Box className={className} data-testid="AddCommentForm">
        <Group gap="md" wrap="nowrap" align="flex-start">
          <Avatar src={authData?.avatar} alt={authData?.username} radius="xl">
            {userInitial}
          </Avatar>
          <Stack gap="sm" flex={1}>
            <Textarea
              placeholder={t('Напишите комментарий...')}
              value={text}
              data-testid="AddCommentForm.Input"
              onChange={(event) => onCommentTextChange(event.currentTarget.value)}
              onKeyDown={onKeyDown}
              autosize
              minRows={4}
              maxRows={10}
              radius="lg"
            />
            <Group justify="flex-end">
              <Button
                data-testid="AddCommentForm.Button"
                onClick={onSendHandler}
                leftSection={<IconSend size={16} />}
                radius="md"
              >
                {t('Отправить')}
              </Button>
            </Group>
          </Stack>
        </Group>
      </Box>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
