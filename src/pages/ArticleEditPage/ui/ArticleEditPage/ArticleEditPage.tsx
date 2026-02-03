import { Alert, Button, Card, Container, Skeleton, Stack, Text, Title } from '@mantine/core';
import { IconAlertCircle, IconArrowLeft } from '@tabler/icons-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { ArticleEditForm, useGetArticleForEdit } from '@/features/articleEditor';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Page } from '@/widgets/Page';

import classes from './ArticleEditPage.module.css';

const ArticleEditPage = memo(() => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: article,
    isLoading,
    error
  } = useGetArticleForEdit(id ?? '', {
    skip: !id
  });

  const onBackToArticle = useCallback(() => {
    if (id) {
      navigate(getRouteArticleDetails(id));
    }
  }, [navigate, id]);

  if (!id) {
    return (
      <Page>
        <Container size="md" px="xs">
          <Alert icon={<IconAlertCircle size={16} />} title={t('Ошибка')} color="red">
            {t('Требуется ID статьи')}
          </Alert>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container size="md" pb="xl">
        <Button
          variant="transparent"
          size="sm"
          leftSection={<IconArrowLeft size={16} />}
          onClick={onBackToArticle}
          className={classes.backButton}
          mb="md"
          data-testid="ArticleEditPage.BackLink"
        >
          {t('Назад к статье')}
        </Button>

        <Card padding="lg" radius="lg" withBorder>
          <Stack gap="md">
            <div>
              <Title order={2}>{t('Редактирование статьи')}</Title>
              <Text c="dimmed" size="sm">
                {t('Внесите изменения в вашу статью')}
              </Text>
            </div>

            {isLoading && (
              <Stack gap="md" data-testid="ArticleEditPage.Skeleton">
                <Skeleton height={36} />
                <Skeleton height={36} />
                <Skeleton height={36} />
                <Skeleton height={200} />
                <Skeleton height={36} width={200} ml="auto" />
              </Stack>
            )}

            {!!error && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title={t('Ошибка')}
                color="red"
                data-testid="ArticleEditPage.Error"
              >
                {t('Не удалось загрузить статью. Попробуйте снова.')}
              </Alert>
            )}

            {article && !isLoading && <ArticleEditForm article={article} />}
          </Stack>
        </Card>
      </Container>
    </Page>
  );
});

ArticleEditPage.displayName = 'ArticleEditPage';

export default ArticleEditPage;
