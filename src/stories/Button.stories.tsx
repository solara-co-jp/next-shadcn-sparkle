import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    theme: {
      control: "select",
      options: ["primary", "neutral", "negative"],
    },
    variant: {
      control: "select",
      options: ["fill", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    theme: "primary",
    variant: "fill",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Themes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button theme="primary">Primary</Button>
      <Button theme="neutral">Neutral</Button>
      <Button theme="negative">Negative</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="fill">Fill</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllThemeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["primary", "neutral", "negative"] as const).map((theme) => (
        <div key={theme} className="flex items-center gap-4">
          <Button theme={theme} variant="fill">{theme} fill</Button>
          <Button theme={theme} variant="outline">{theme} outline</Button>
          <Button theme={theme} variant="ghost">{theme} ghost</Button>
        </div>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Saving...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
