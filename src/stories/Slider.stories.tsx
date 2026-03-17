import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Slider } from "@/components/ui/slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    size: "md",
    "aria-label": "Slider",
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <Slider {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[320px]">
      <Slider size="sm" defaultValue={30} aria-label="Small" />
      <Slider size="md" defaultValue={50} aria-label="Medium" />
      <Slider size="lg" defaultValue={70} aria-label="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[320px]">
      <Slider defaultValue={40} disabled aria-label="Disabled" />
    </div>
  ),
};
