import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Divider } from "@/components/ui/divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    emphasis: {
      control: "select",
      options: ["low", "middle", "high"],
    },
    lineStyle: {
      control: "select",
      options: ["solid", "dashed"],
    },
  },
  args: {
    direction: "horizontal",
    emphasis: "low",
    lineStyle: "solid",
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <p className="text-sp-text-high mb-2">Above</p>
      <Divider {...args} />
      <p className="text-sp-text-high mt-2">Below</p>
    </div>
  ),
};

export const Emphasis: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <div>
        <p className="text-sp-text-low text-sm mb-2">Low</p>
        <Divider emphasis="low" />
      </div>
      <div>
        <p className="text-sp-text-low text-sm mb-2">Middle</p>
        <Divider emphasis="middle" />
      </div>
      <div>
        <p className="text-sp-text-low text-sm mb-2">High</p>
        <Divider emphasis="high" />
      </div>
    </div>
  ),
};

export const Dashed: Story = {
  args: {
    lineStyle: "dashed",
  },
  render: (args) => (
    <div className="w-[400px]">
      <Divider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-[60px]">
      <span className="text-sp-text-high">Left</span>
      <Divider direction="vertical" />
      <span className="text-sp-text-high">Right</span>
    </div>
  ),
};
