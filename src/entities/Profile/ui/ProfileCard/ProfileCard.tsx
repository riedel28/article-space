import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
  ProfileCardProps
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

export type { ProfileCardProps };

export const ProfileCard = (props: ProfileCardProps) => {
  const { isLoading, error } = props;

  if (isLoading) {
    return <ProfileCardRedesignedSkeleton />;
  }

  if (error) {
    return <ProfileCardRedesignedError />;
  }

  return <ProfileCardRedesigned {...props} />;
};
