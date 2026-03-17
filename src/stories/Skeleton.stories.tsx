import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "@/components/ui/skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular"],
    },
  },
  args: {
    variant: "text",
    width: "200px",
    height: "20px",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: "48px",
    height: "48px",
  },
};

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: "300px",
    height: "120px",
  },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="flex items-start gap-4 p-4 w-[360px]">
      <Skeleton variant="circular" width="48px" height="48px" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton variant="text" width="60%" height="16px" />
        <Skeleton variant="text" width="100%" height="14px" />
        <Skeleton variant="text" width="80%" height="14px" />
      </div>
    </div>
  ),
};
