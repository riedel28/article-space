import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Card,
  Group,
  Stack,
  ThemeIcon,
  Box,
  Skeleton
} from '@mantine/core';
import {
  IconArticle,
  IconUsers,
  IconStar,
  IconLanguage,
  IconArrowRight
} from '@tabler/icons-react';
import { Page } from '@/widgets/Page';
import { getRouteArticles } from '@/shared/const/router';
import { ArticleList, ArticleView } from '@/entities/Article';
import { useLatestArticles } from '../api/latestArticlesApi';

const features = [
  {
    icon: IconArticle,
    titleKey: 'feature.articles.title',
    descriptionKey: 'feature.articles.description'
  },
  {
    icon: IconUsers,
    titleKey: 'feature.profiles.title',
    descriptionKey: 'feature.profiles.description'
  },
  {
    icon: IconStar,
    titleKey: 'feature.ratings.title',
    descriptionKey: 'feature.ratings.description'
  },
  {
    icon: IconLanguage,
    titleKey: 'feature.i18n.title',
    descriptionKey: 'feature.i18n.description'
  }
];

const MainPage = () => {
  const { t } = useTranslation('main');
  const navigate = useNavigate();
  const { data: articles, isLoading } = useLatestArticles(4);

  const handleExploreClick = () => {
    navigate(getRouteArticles());
  };

  return (
    <Page data-testid="MainPage">
      <Container size="lg" py="xl">
        {/* Hero Section */}
        <Stack align="center" gap="lg" mb={60}>
          <Title
            order={1}
            ta="center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            {t('hero.title')}
          </Title>
          <Text
            size="xl"
            c="dimmed"
            ta="center"
            maw={600}
          >
            {t('hero.subtitle')}
          </Text>
          <Group>
            <Button
              size="lg"
              onClick={handleExploreClick}
              rightSection={<IconArrowRight size={18} />}
            >
              {t('hero.cta')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              component="a"
              href="https://github.com"
              target="_blank"
            >
              {t('hero.github')}
            </Button>
          </Group>
        </Stack>

        {/* Features Section */}
        <Box mb={60}>
          <Title order={2} ta="center" mb="xl">
            {t('features.title')}
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
            {features.map((feature) => (
              <Card
                key={feature.titleKey}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <ThemeIcon
                  size={50}
                  radius="md"
                  variant="light"
                  color="brand"
                  mb="md"
                >
                  <feature.icon size={26} />
                </ThemeIcon>
                <Text fw={500} size="lg" mb="xs">
                  {t(feature.titleKey)}
                </Text>
                <Text size="sm" c="dimmed">
                  {t(feature.descriptionKey)}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* Latest Articles Section */}
        <Box>
          <Group justify="space-between" mb="xl">
            <Title order={2}>{t('latestArticles.title')}</Title>
            <Button
              variant="subtle"
              onClick={handleExploreClick}
              rightSection={<IconArrowRight size={16} />}
            >
              {t('latestArticles.viewAll')}
            </Button>
          </Group>
          {isLoading ? (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height={250} radius="md" />
              ))}
            </SimpleGrid>
          ) : (
            <ArticleList
              articles={articles || []}
              view={ArticleView.SMALL}
              target="_blank"
            />
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default memo(MainPage);
