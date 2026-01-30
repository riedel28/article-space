import { IconArticle,IconHome, IconUser } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/const/router';

import { SidebarItemType } from '../types/sidebar';

export const useSidebarItems = () => {
  const userData = useSelector(getUserAuthData);
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: IconHome,
      text: 'Главная'
    },
    {
      path: getRouteArticles(),
      Icon: IconArticle,
      text: 'Статьи'
    }
  ];

  if (userData) {
    sidebarItemsList.push({
      path: getRouteProfile(userData.id),
      Icon: IconUser,
      text: 'Профиль',
      authOnly: true
    });
  }

  return sidebarItemsList;
};
