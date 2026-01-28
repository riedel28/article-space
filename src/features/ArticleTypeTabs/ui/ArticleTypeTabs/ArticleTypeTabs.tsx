import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Box, Chip, Group, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { ArticleType } from '@/entities/Article';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation();

  const typeTabs = [
    {
      value: ArticleType.ALL,
      content: t('Все статьи')
    },
    {
      value: ArticleType.IT,
      content: t('Айти')
    },
    {
      value: ArticleType.ECONOMICS,
      content: t('Экономика')
    },
    {
      value: ArticleType.SCIENCE,
      content: t('Наука')
    }
  ];

  const onTabClick = useCallback(
    (value: string | string[]) => {
      onChangeType(value as ArticleType);
    },
    [onChangeType]
  );

  return (
    <Box className={className}>
      <Text component="label" fz="sm" fw={500} mb={4}>
        {t('Topics')}
      </Text>
      <Chip.Group value={value} onChange={onTabClick}>
        <Group gap="xs">
          {typeTabs.map((tab) => (
            <Chip
              key={tab.value}
              value={tab.value}
              variant="light"
              icon={<IconCheck size={16} stroke={1.8} />}
            >
              {tab.content}
            </Chip>
          ))}
        </Group>
      </Chip.Group>
    </Box>
  );
});
