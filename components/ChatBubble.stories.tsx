import type { Meta, StoryObj } from '@storybook/react';
import ChatBubble from './ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  component: ChatBubble,
  title: 'UI/ChatBubble',
};
export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const User: Story = { args: { role: 'user', text: 'Hello AI!' } };
export const Assistant: Story = { args: { role: 'assistant', text: 'Hi! How can I help you?' } };
