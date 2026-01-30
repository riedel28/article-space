import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ActionIcon, Button, Group, Tooltip } from '@mantine/core';
import { IconArrowLeft, IconPencil } from '@tabler/icons-react';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { getArticleDetailsData } from '@/entities/Article';
import { getCanEditArticle } from '../../model/selectors/article';
import classes from './ArticleDetailsPageHeader.module.css';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  return (
    <Group className={className} justify="space-between">
      <Button
        variant="transparent"
        size="sm"
        leftSection={<IconArrowLeft size={16} />}
        onClick={onBackToList}
        className={classes.backButton}
      >
        {t('Назад к списку')}
      </Button>

      {canEdit && (
        <Tooltip label={t('Редактировать')} hiddenFrom="lg">
          <ActionIcon
            variant="light"
            color="brand"
            size="lg"
            onClick={onEditArticle}
            hiddenFrom="lg"
          >
            <IconPencil size={18} />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
});
