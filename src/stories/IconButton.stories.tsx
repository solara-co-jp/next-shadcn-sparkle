import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconButton } from "@/components/ui/icon-button";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    icon: "settings",
    label: "Settings",
    size: "md",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon="settings" label="Settings" size="sm" />
      <IconButton icon="settings" label="Settings" size="md" />
      <IconButton icon="settings" label="Settings" size="lg" />
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon="edit" label="Edit" />
      <IconButton icon="delete" label="Delete" />
      <IconButton icon="search" label="Search" />
      <IconButton icon="more_vert" label="More" />
      <IconButton icon="close" label="Close" />
      <IconButton icon="add" label="Add" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
