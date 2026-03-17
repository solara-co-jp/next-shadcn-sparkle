import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputChip } from "@/components/ui/input-chip";
import { fn } from "storybook/test";
import { useState } from "react";

const meta = {
  title: "Components/InputChip",
  component: InputChip,
  argTypes: {
    size: {
      control: "select",
      options: ["md", "lg"],
    },
    isInvalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    values: ["React", "TypeScript"],
    onChange: fn(),
    placeholder: "Enter tags...",
    size: "md",
  },
} satisfies Meta<typeof InputChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [values, setValues] = useState(["React", "TypeScript"]);
    return (
      <div className="w-[400px]">
        <InputChip values={values} onChange={setValues} placeholder="Enter tags..." />
      </div>
    );
  },
};

export const Empty: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="w-[400px]">
        <InputChip values={values} onChange={setValues} placeholder="Type and press Enter" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[400px]">
      <InputChip values={["React", "TypeScript"]} onChange={() => {}} disabled />
    </div>
  ),
};
