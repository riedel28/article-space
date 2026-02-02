import { Container, Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/editableProfileCard';
import { Page } from '@/widgets/Page';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page data-testid="ProfilePage" className={className}>
      <Container size="md" px="xs" py={{ base: 'md', sm: 'xl' }}>
        <Stack gap={24} w="100%">
          <EditableProfileCard id={id} />
        </Stack>
      </Container>
    </Page>
  );
};

export default ProfilePage;
