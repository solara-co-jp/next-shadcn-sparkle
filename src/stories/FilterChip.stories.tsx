import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FilterChip } from "@/components/ui/filter-chip";

const meta = {
  title: "Components/FilterChip",
  component: FilterChip,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    selected: { control: "boolean" },
    isDropdown: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Filter",
    size: "md",
    selected: false,
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <FilterChip label="Small" size="sm" />
      <FilterChip label="Medium" size="md" />
      <FilterChip label="Large" size="lg" />
    </div>
  ),
};

export const SelectedSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <FilterChip label="Small" size="sm" selected />
      <FilterChip label="Medium" size="md" selected />
      <FilterChip label="Large" size="lg" selected />
    </div>
  ),
};

export const Dropdown: Story = {
  args: {
    label: "Category",
    isDropdown: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
