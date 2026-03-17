import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputTime } from "@/components/ui/input-time";

const meta = {
  title: "Components/InputTime",
  component: InputTime,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isInvalid: { control: "boolean" },
    disabled: { control: "boolean" },
    minuteStep: { control: "number" },
  },
  args: {
    size: "md",
    minuteStep: 1,
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof InputTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[200px]">
      <InputTime {...args} />
    </div>
  ),
};

export const Step15: Story = {
  render: () => (
    <div className="w-[200px]">
      <InputTime minuteStep={15} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[200px]">
      <InputTime size="sm" />
      <InputTime size="md" />
      <InputTime size="lg" />
    </div>
  ),
};
