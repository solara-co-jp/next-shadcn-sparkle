import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressIndicator } from "@/components/ui/progress-indicator";

const meta = {
  title: "Components/ProgressIndicator",
  component: ProgressIndicator,
  argTypes: {
    variant: {
      control: "select",
      options: ["bar", "circle"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    value: { control: { type: "range", min: 0, max: 100 } },
    showValue: { control: "boolean" },
  },
  args: {
    value: 60,
    variant: "bar",
    size: "md",
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bar: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const BarWithLabel: Story = {
  render: () => (
    <div className="w-[320px]">
      <ProgressIndicator value={75} label="Uploading..." showValue />
    </div>
  ),
};

export const BarSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[320px]">
      <ProgressIndicator value={40} size="sm" label="Small" showValue />
      <ProgressIndicator value={60} size="md" label="Medium" showValue />
      <ProgressIndicator value={80} size="lg" label="Large" showValue />
    </div>
  ),
};

export const Circle: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <ProgressIndicator variant="circle" size="sm" value={30} />
      <ProgressIndicator variant="circle" size="md" value={60} label="60%" />
      <ProgressIndicator variant="circle" size="lg" value={100} label="Done" />
    </div>
  ),
};

export const Complete: Story = {
  render: () => (
    <div className="w-[320px]">
      <ProgressIndicator value={100} label="Complete!" showValue />
    </div>
  ),
};
