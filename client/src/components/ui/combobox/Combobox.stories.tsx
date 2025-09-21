import type { Meta, StoryObj } from "@storybook/react-vite";

import { Combobox } from "./Combobox.tsx";

const meta = {
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
