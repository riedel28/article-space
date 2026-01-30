import type { Meta, StoryObj } from '@storybook/react';

import { ArticleType, ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from './ArticleListItem';

const meta: Meta<typeof ArticleListItem> = {
  title: 'entities/Article/ArticleListItem',
  component: ArticleListItem,
};

export default meta;
type Story = StoryObj<typeof ArticleListItem>;

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
<p>Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.</p>
<p>JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js.</p>
<pre><code>const path = require('path');
const server = jsonServer.create();</code></pre>`
};

export const Big: Story = {
  args: {
    view: ArticleView.BIG,
    article
  }
};

export const Small: Story = {
  args: {
    view: ArticleView.SMALL,
    article
  }
};
