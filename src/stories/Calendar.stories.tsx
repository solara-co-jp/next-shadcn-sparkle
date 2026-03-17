import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();
    return <Calendar value={date} onChange={setDate} />;
  },
};

export const WithValue: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 2, 15));
    return <Calendar value={date} onChange={setDate} />;
  },
};
