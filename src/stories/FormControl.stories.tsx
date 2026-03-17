import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormControl } from "@/components/ui/form-control";
import { Input } from "@/components/ui/input";

const meta = {
  title: "Components/FormControl",
  component: FormControl,
  argTypes: {
    required: { control: "boolean" },
    error: { control: "boolean" },
  },
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    children: <Input placeholder="Enter text..." />,
  },
  render: (args) => (
    <div className="w-[320px]">
      <FormControl {...args} />
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: "Email",
    required: true,
    children: <Input placeholder="user@example.com" />,
  },
  render: (args) => (
    <div className="w-[320px]">
      <FormControl {...args} />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    helperText: "8 characters minimum",
    children: <Input placeholder="Enter password..." />,
  },
  render: (args) => (
    <div className="w-[320px]">
      <FormControl {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: "Email",
    required: true,
    error: true,
    errorText: "This field is required.",
    children: <Input isInvalid placeholder="user@example.com" />,
  },
  render: (args) => (
    <div className="w-[320px]">
      <FormControl {...args} />
    </div>
  ),
};

export const WithTooltip: Story = {
  args: {
    label: "Username",
    tooltip: "Your display name on the platform",
    children: <Input placeholder="Enter username..." />,
  },
  render: (args) => (
    <div className="w-[320px]">
      <FormControl {...args} />
    </div>
  ),
};
