import { useParams } from 'react-router-dom';
import { Container, Stack } from '@mantine/core';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/editableProfileCard';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page data-testid="ProfilePage" className={className}>
      <Container size="md" px={{ base: 'xs', sm: 'lg' }} py={{ base: 'md', sm: 'xl' }}>
        <Stack gap={24} w="100%">
          <EditableProfileCard id={id} />
        </Stack>
      </Container>
    </Page>
  );
};

export default ProfilePage;
