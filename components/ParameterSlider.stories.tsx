import type { Meta, StoryObj } from '@storybook/react';
import ParameterSlider from './ParameterSlider';

const meta: Meta<typeof ParameterSlider> = { component: ParameterSlider, title: 'Controls/ParameterSlider' };
export default meta;
type Story = StoryObj<typeof ParameterSlider>;

export const Default: Story = { args: { label: 'Temperature', min: 0, max: 1, step: 0.1, value: 0.7, onChange: ()=>{} } };