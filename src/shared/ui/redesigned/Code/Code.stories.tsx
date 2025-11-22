import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as Meta<typeof Code>;

const Template: StoryFn<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    text:
        'export default {\n' +
        "    title: 'shared/Code',\n" +
        '    component: Code,\n' +
        '    argTypes: {\n' +
        "        backgroundColor: { control: 'color' },\n" +
        '    },\n' +
        '} as Meta<typeof Code>;\n' +
        '\n' +
        'const Template: StoryFn<typeof Code> = (args) => <Code {...args} />;\n' +
        '\n' +
        'export const Normal = Template.bind({});'
};
