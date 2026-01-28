import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Group } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { getRouteArticles } from '@/shared/const/router';
import classes from './ArticleDetailsPageHeader.module.css';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    return (
      <Group className={className}>
        <Button
          variant="transparent"
          size="sm"
          leftSection={<IconArrowLeft size={16} />}
          onClick={onBackToList}
          className={classes.backButton}
        >
          {t('Назад к списку')}
        </Button>
      </Group>
    );
  }
);
