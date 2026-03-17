import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "@/components/ui/avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
    },
  },
  args: {
    size: "md",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/120?img=3",
    alt: "User avatar",
  },
};

export const WithInitials: Story = {
  args: {
    name: "Tanaka",
    alt: "Tanaka",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" name="AB" />
      <Avatar size="sm" name="AB" />
      <Avatar size="md" name="AB" />
      <Avatar size="lg" name="AB" />
      <Avatar size="xl" name="AB" />
      <Avatar size="2xl" name="AB" />
      <Avatar size="3xl" name="AB" />
    </div>
  ),
};

export const FallbackIcon: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm" />
      <Avatar size="md" />
      <Avatar size="lg" />
    </div>
  ),
};
