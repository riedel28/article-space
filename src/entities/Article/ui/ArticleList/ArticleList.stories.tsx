import type { Meta, StoryObj } from '@storybook/react';

import { ArticleType, ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { ArticleList } from './ArticleList';

const meta: Meta<typeof ArticleList> = {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
};

export default meta;
type Story = StoryObj<typeof ArticleList>;

const article: Article = {
  id: '1',
  title: 'Javascript news asfasjf asfjkask f',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  user: {
    id: '1',
    username: 'Ulbi tv',
    avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg'
  },
  type: [ArticleType.IT, ArticleType.SCIENCE, ArticleType.ECONOMICS],
  content: `<h3>Заголовок этого блока</h3>
<p>Программа, которую по традиции называют «Hello, world!», очень проста.</p>
<p>JavaScript — это язык, программы на котором можно выполнять в разных средах.</p>`
};

export const LoadingBig: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.BIG
  }
};

export const LoadingSmall: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.SMALL
  }
};

export const ListSmall: Story = {
  args: {
    articles: new Array(9).fill(0).map((item, index) => ({
      ...article,
      id: String(index)
    })),
    isLoading: false,
    view: ArticleView.SMALL
  }
};

export const ListBig: Story = {
  args: {
    articles: new Array(9).fill(0).map((item, index) => ({
      ...article,
      id: String(index)
    })),
    isLoading: false,
    view: ArticleView.BIG
  }
};
