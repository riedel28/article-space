import { User } from '@/entities/User';

import { ArticleType } from '../consts/articleConsts';

export interface Article {
  id: string;
  title: string;
  user: User;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  content?: string;
}
