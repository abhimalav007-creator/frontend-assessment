import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI/Button',
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

// Primary Button
export const Primary: Story = {
  args: {
    children: 'Click Me',
    className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
    disabled: false,
  },
};

// Secondary Button
export const Secondary: Story = {
  args: {
    children: 'Click Me',
    className: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600',
    disabled: false,
  },
};

// Disabled Button
export const Disabled: Story = {
  args: {
    children: 'Click Me',
    className: 'bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed',
    disabled: true,
  },
};

// Custom Button Example
export const Custom: Story = {
  args: {
    children: 'Custom Button',
    className: 'bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600',
    disabled: false,
  },
};
