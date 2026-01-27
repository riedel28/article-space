import {
  IconHome,
  IconInfoCircle,
  IconUser,
  IconArticle
} from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';

import { SidebarItemType } from '../types/sidebar';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile
} from '@/shared/const/router';

export const useSidebarItems = () => {
  const userData = useSelector(getUserAuthData);
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: IconHome,
      text: 'Главная'
    },
    {
      path: getRouteAbout(),
      Icon: IconInfoCircle,
      text: 'О сайте'
    }
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: IconUser,
        text: 'Профиль',
        authOnly: true
      },
      {
        path: getRouteArticles(),
        Icon: IconArticle,
        text: 'Статьи',
        authOnly: true
      }
    );
  }

  return sidebarItemsList;
};
