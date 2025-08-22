import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = { component: Modal, title: 'UI/Modal' };
export default meta;
type Story = StoryObj<typeof Modal>;

export const Open: Story = { args: { open: true, onClose: ()=>{}, title: 'My Modal', children: 'Content' } };