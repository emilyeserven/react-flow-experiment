import type { Meta, StoryObj } from '@storybook/react-vite';

import { ComboboxDemo } from './combobox';

const meta = {
  component: ComboboxDemo,
} satisfies Meta<typeof ComboboxDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};