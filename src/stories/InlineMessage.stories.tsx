import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InlineMessage } from "@/components/ui/inline-message";
import { fn } from "storybook/test";

const meta = {
  title: "Components/InlineMessage",
  component: InlineMessage,
  argTypes: {
    status: {
      control: "select",
      options: ["info", "success", "warning", "negative"],
    },
  },
  args: {
    status: "info",
    title: "Information",
    children: "This is a message body.",
  },
} satisfies Meta<typeof InlineMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[500px]">
      <InlineMessage {...args} />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[500px]">
      <InlineMessage status="info" title="Info">Informational message.</InlineMessage>
      <InlineMessage status="success" title="Success">Operation completed.</InlineMessage>
      <InlineMessage status="warning" title="Warning">Please be careful.</InlineMessage>
      <InlineMessage status="negative" title="Error">Something went wrong.</InlineMessage>
    </div>
  ),
};

export const WithClose: Story = {
  render: () => (
    <div className="w-[500px]">
      <InlineMessage status="info" title="Dismissible" onClose={fn()}>
        Click the close button to dismiss.
      </InlineMessage>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div className="w-[500px]">
      <InlineMessage status="success" title="Save completed!" />
    </div>
  ),
};
