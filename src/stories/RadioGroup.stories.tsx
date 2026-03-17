import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioGroup } from "@/components/ui/radio-group";

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    direction: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    disabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
  },
  args: {
    options,
    size: "md",
    direction: "vertical",
    defaultValue: "a",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-12">
      <RadioGroup options={options} size="sm" defaultValue="a" />
      <RadioGroup options={options} size="md" defaultValue="a" />
      <RadioGroup options={options} size="lg" defaultValue="a" />
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
