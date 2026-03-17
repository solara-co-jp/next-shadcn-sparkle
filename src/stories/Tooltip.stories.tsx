import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
  args: {
    content: "Tooltip message",
    position: "top",
    children: <Button variant="outline">Hover me</Button>,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-16">
      <Tooltip content="Top tooltip" position="top">
        <Button variant="outline" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="outline" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button variant="outline" size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button variant="outline" size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
};
