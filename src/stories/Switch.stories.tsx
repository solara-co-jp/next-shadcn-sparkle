import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "@/components/ui/switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Switch label",
    size: "md",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Small" size="sm" />
      <Switch label="Medium" size="md" defaultChecked />
      <Switch label="Large" size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};
