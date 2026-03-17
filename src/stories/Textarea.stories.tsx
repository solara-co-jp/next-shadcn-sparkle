import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "@/components/ui/textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isInvalid: { control: "boolean" },
    disabled: { control: "boolean" },
    showCounter: { control: "boolean" },
  },
  args: {
    placeholder: "Enter text...",
    size: "md",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <Textarea {...args} />
    </div>
  ),
};

export const WithCounter: Story = {
  render: () => (
    <div className="w-[400px]">
      <Textarea maxLength={200} showCounter placeholder="Max 200 characters" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="w-[400px]">
      <Textarea isInvalid defaultValue="Invalid content" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[400px]">
      <Textarea disabled defaultValue="Disabled textarea" />
    </div>
  ),
};
