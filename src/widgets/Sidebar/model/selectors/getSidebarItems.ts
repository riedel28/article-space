import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';

import MainIcon from '@/shared/assets/icons/home.svg?react';
import ArticleIcon from '@/shared/assets/icons/article.svg?react';
import AboutIcon from '@/shared/assets/icons/Info.svg?react';
import ProfileIcon from '@/shared/assets/icons/avatar.svg?react';

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
      Icon: MainIcon,
      text: 'Главная'
    },
    {
      path: getRouteAbout(),
      Icon: AboutIcon,
      text: 'О сайте'
    }
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: ProfileIcon,
        text: 'Профиль',
        authOnly: true
      },
      {
        path: getRouteArticles(),
        Icon: ArticleIcon,
        text: 'Статьи',
        authOnly: true
      }
    );
  }

  return sidebarItemsList;
};
