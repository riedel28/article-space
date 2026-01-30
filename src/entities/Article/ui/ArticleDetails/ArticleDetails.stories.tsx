import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleType } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { ArticleDetails } from './ArticleDetails';

const meta: Meta<typeof ArticleDetails> = {
  title: 'entities/Article/ArticleDetails',
  component: ArticleDetails,
};

export default meta;
type Story = StoryObj<typeof ArticleDetails>;

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
<p>JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js.</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;body&gt;
    &lt;p id="hello"&gt;&lt;/p&gt;
    &lt;script&gt;
      document.getElementById("hello").innerHTML = "Hello, world!";
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<h3>Заголовок этого блока</h3>
<p>Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.</p>`
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

export const Loading: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      articleDetails: {
        isLoading: true
      }
    })
  ]
};

export const Error: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      articleDetails: {
        error: 'error'
      }
    })
  ]
};
