import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["normal", "emphasis"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    count: { control: "number" },
    isGapped: { control: "boolean" },
  },
  args: {
    variant: "normal",
    size: "md",
    count: 5,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="xs" />
      <Badge size="sm" />
      <Badge size="md" count={3} />
      <Badge size="lg" count={12} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="normal" count={5} />
      <Badge variant="emphasis" count={5} />
    </div>
  ),
};

export const Overflow: Story = {
  args: {
    count: 150,
    max: 99,
  },
};

export const Gapped: Story = {
  render: () => (
    <div className="relative inline-block">
      <div className="w-10 h-10 rounded-full bg-sp-neutral-200" />
      <span className="absolute -top-1 -right-1">
        <Badge size="sm" variant="emphasis" isGapped />
      </span>
    </div>
  ),
};
