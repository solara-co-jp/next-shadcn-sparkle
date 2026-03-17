import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputSearch } from "@/components/ui/input-search";

const meta = {
  title: "Components/InputSearch",
  component: InputSearch,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    placeholder: "Search...",
    size: "md",
  },
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[320px]">
      <InputSearch size="sm" placeholder="Small" />
      <InputSearch size="md" placeholder="Medium" />
      <InputSearch size="lg" placeholder="Large" />
    </div>
  ),
};
