import type { Meta, StoryObj } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import ProfilePage from './ProfilePage';

const meta: Meta<typeof ProfilePage> = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Normal: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      profile: {
        form: {
          username: 'admin',
          age: 22,
          country: Country.Ukraine,
          lastname: 'ulbi tv',
          first: 'asd',
          city: 'asf',
          currency: Currency.USD
        }
      }
    })
  ]
};

export const Dark: Story = {
  args: {},
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      profile: {
        form: {
          username: 'admin',
          age: 22,
          country: Country.Ukraine,
          lastname: 'ulbi tv',
          first: 'asd',
          city: 'asf',
          currency: Currency.USD
        }
      }
    })
  ]
};
