import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Title, Text, Skeleton, Alert, Button, Stack } from '@mantine/core';
import { IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';
import { Page } from '@/widgets/Page';
import { ArticleEditForm, useGetArticleForEdit } from '@/features/articleEditor';
import { getRouteArticleDetails } from '@/shared/const/router';
import classes from './ArticleEditPage.module.css';

type ArticleEditPageProps = object;

const ArticleEditPage = memo((_props: ArticleEditPageProps) => {
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
        <Container size="md">
          <Alert icon={<IconAlertCircle size={16} />} title={t('Error')} color="red">
            {t('Article ID is required')}
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
              <Title order={2}>{t('Edit Article')}</Title>
              <Text c="dimmed" size="sm">
                {t('Make changes to your article')}
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

            {error && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title={t('Error')}
                color="red"
                data-testid="ArticleEditPage.Error"
              >
                {t('Failed to load article. Please try again.')}
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
