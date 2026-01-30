import {
  Button,
  Card,
  Drawer,
  Group,
  Modal,
  Rating,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title} from '@mantine/core';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    onAccept,
    feedbackTitle,
    hasFeedback,
    onCancel,
    title = 'Оцените статью',
    rate = 0
  } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const displayTitle = starsCount ? t('Спасибо за оценку!') : t(title);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      acceptHandle();
    },
    [acceptHandle]
  );

  return (
    <Card className={className} p={{ base: 'md', sm: 'lg' }} radius="md" w="100%"
data-testid="RatingCard">
      <Stack align="center" gap="sm">
        <Text size="lg" fw={500} ta="center">
          {displayTitle}
        </Text>
        <Rating
          value={starsCount}
          onChange={onSelectStars}
          size="xl"
          highlightSelectedOnly={false}
          data-testid="RatingCard.Stars"
        />
      </Stack>

      <BrowserView>
        <Modal
          opened={isModalOpen}
          onClose={cancelHandle}
          title={
            <Title fz="md" order={2}>
              {t('Оставить отзыв')}
            </Title>
          }
          centered
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <Stack gap="md">
                <Text>{feedbackTitle}</Text>
                <Textarea
                  autosize
                  minRows={4}
                  maxRows={10}
                  data-testid="RatingCard.Input"
                  value={feedback}
                  onChange={(event) => setFeedback(event.currentTarget.value)}
                  placeholder={t('Ваш отзыв')}
                />
              </Stack>
              <Group justify="flex-end" gap="md">
                <Button
                  variant="default"
                  data-testid="RatingCard.Close"
                  onClick={cancelHandle}
                  type="button"
                >
                  {t('Закрыть')}
                </Button>
                <Button data-testid="RatingCard.Send" type="submit">
                  {t('Отправить')}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer
          opened={isModalOpen}
          onClose={cancelHandle}
          position="bottom"
          title={t('Оставить отзыв')}
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <Stack gap="md">
                <Text fw={500}>{feedbackTitle}</Text>
                <TextInput
                  data-testid="RatingCard.Input"
                  value={feedback}
                  onChange={(event) => setFeedback(event.currentTarget.value)}
                  placeholder={t('Ваш отзыв')}
                />
              </Stack>
              <Button fullWidth data-testid="RatingCard.Send" type="submit">
                {t('Отправить')}
              </Button>
            </Stack>
          </form>
        </Drawer>
      </MobileView>
    </Card>
  );
});
