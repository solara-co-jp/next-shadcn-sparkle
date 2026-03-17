import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputPassword } from "@/components/ui/input-password";

const meta = {
  title: "Components/InputPassword",
  component: InputPassword,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isInvalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    placeholder: "Enter password...",
    size: "md",
  },
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[320px]">
      <InputPassword size="sm" placeholder="Small" />
      <InputPassword size="md" placeholder="Medium" />
      <InputPassword size="lg" placeholder="Large" />
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    defaultValue: "wrongpassword",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
