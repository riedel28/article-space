import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import LoginForm from './LoginForm';
// @ts-expect-error - Storybook decorator import
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (args) => (
    <LoginForm {...args} onSuccess={() => {}} />
);

export const Primary = Template.bind({});
Primary.args = {
    onSuccess: () => {}
};
Primary.decorators = [
    StoreDecorator({
        loginForm: { username: '123', password: 'asd' }
    })
];

export const WithError = Template.bind({});
WithError.args = {
    onSuccess: () => {}
};
WithError.decorators = [
    StoreDecorator({
        loginForm: { username: '123', password: 'asd', error: 'ERROR' }
    })
];

export const Loading = Template.bind({});
Loading.args = {
    onSuccess: () => {}
};
Loading.decorators = [
    StoreDecorator({
        loginForm: { isLoading: true }
    })
];
