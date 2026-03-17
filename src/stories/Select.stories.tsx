import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "@/components/ui/select";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Disabled Option", value: "4", disabled: true },
];

const meta = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isInvalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    options,
    placeholder: "Select...",
    size: "md",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <Select {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[280px]">
      <Select options={options} size="sm" placeholder="Small" />
      <Select options={options} size="md" placeholder="Medium" />
      <Select options={options} size="lg" placeholder="Large" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="w-[280px]">
      <Select options={options} isInvalid />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[280px]">
      <Select options={options} disabled />
    </div>
  ),
};
