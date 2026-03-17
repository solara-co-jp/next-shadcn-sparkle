import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tag } from "@/components/ui/tag";
import { fn } from "storybook/test";

const meta = {
  title: "Components/Tag",
  component: Tag,
  argTypes: {
    status: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "negative"],
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "subtle"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    children: "Tag",
    status: "neutral",
    variant: "subtle",
    size: "md",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["solid", "outline", "subtle"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-2">
          {(["neutral", "info", "success", "warning", "negative"] as const).map((status) => (
            <Tag key={status} status={status} variant={variant} size="md">
              {status}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tag size="sm" status="info" variant="solid">Small</Tag>
      <Tag size="md" status="info" variant="solid">Medium</Tag>
      <Tag size="lg" status="info" variant="solid">Large</Tag>
    </div>
  ),
};

export const Removable: Story = {
  args: {
    children: "Removable",
    status: "info",
    variant: "subtle",
    onRemove: fn(),
  },
};
