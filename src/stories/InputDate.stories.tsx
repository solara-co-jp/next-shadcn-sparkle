import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputDate } from "@/components/ui/input-date";

const meta = {
  title: "Components/InputDate",
  component: InputDate,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isInvalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof InputDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <InputDate {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[280px]">
      <InputDate size="sm" />
      <InputDate size="md" />
      <InputDate size="lg" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="w-[280px]">
      <InputDate isInvalid />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[280px]">
      <InputDate disabled />
    </div>
  ),
};
