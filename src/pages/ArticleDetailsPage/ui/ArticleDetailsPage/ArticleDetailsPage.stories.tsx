import type { Meta, StoryObj } from '@storybook/react';

import { Article, ArticleType } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticleDetailsPage from './ArticleDetailsPage';

const meta: Meta<typeof ArticleDetailsPage> = {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
  component: ArticleDetailsPage,
};

export default meta;
type Story = StoryObj<typeof ArticleDetailsPage>;

const article: Article = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  type: [ArticleType.IT],
  user: {
    id: '1',
    username: 'Ulbi tv'
  },
  content: `<h3>Заголовок этого блока</h3>
<p>Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.</p>
<p>JavaScript — это язык, программы на котором можно выполнять в разных средах.</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;body&gt;
    &lt;p id="hello"&gt;&lt;/p&gt;
    &lt;script&gt;
      document.getElementById("hello").innerHTML = "Hello, world!";
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>`
};

export const Normal: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      articleDetails: {
        data: article
      }
    })
  ]
};
