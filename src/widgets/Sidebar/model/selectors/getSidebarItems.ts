import { IconHome, IconUser, IconArticle } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';

import { SidebarItemType } from '../types/sidebar';
import {
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
    }
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteArticles(),
        Icon: IconArticle,
        text: 'Статьи',
        authOnly: true
      },
      {
        path: getRouteProfile(userData.id),
        Icon: IconUser,
        text: 'Профиль',
        authOnly: true
      }
    );
  }

  return sidebarItemsList;
};
