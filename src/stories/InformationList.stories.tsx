import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InformationList } from "@/components/ui/information-list";

const Icon = ({ name }: { name: string }) => (
  <span className="font-[family-name:var(--font-family-icon)] text-[24px] leading-none select-none text-sp-text-low">
    {name}
  </span>
);

const meta = {
  title: "Components/InformationList",
  component: InformationList,
} satisfies Meta<typeof InformationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    items: [
      { label: "Name", value: "Tanaka Taro" },
      { label: "Email", value: "tanaka@example.com" },
      { label: "Department", value: "Engineering" },
      { label: "Joined", value: "2024-04-01" },
    ],
  },
  render: (args) => (
    <div className="w-[500px]">
      <InformationList {...args} />
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    items: [
      { description: "Description", title: "Title", value: "Data", leadingSlot: <Icon name="person" /> },
      { description: "Description", title: "Title", value: "Data", leadingSlot: <Icon name="mail" /> },
      { description: "Description", title: "Title", value: "Data", leadingSlot: <Icon name="calendar_today" /> },
    ],
  },
  render: (args) => (
    <div className="w-[500px]">
      <InformationList {...args} />
    </div>
  ),
};

export const Accordion: Story = {
  args: {
    items: [
      {
        description: "Account",
        title: "User Settings",
        value: "3 items",
        leadingSlot: <Icon name="person" />,
        isExpandTrigger: true,
        expandContent: (
          <ul className="list-disc list-inside text-sp-text-middle text-sm space-y-1">
            <li>Profile image change</li>
            <li>Display name change</li>
            <li>Password change</li>
          </ul>
        ),
      },
      {
        description: "Notifications",
        title: "Notification Settings",
        value: "ON",
        leadingSlot: <Icon name="notifications" />,
        isExpandTrigger: true,
        expandContent: (
          <p className="text-sp-text-middle text-sm">
            Email notifications and push notifications are enabled.
          </p>
        ),
      },
      {
        description: "Security",
        title: "Two-Factor Auth",
        leadingSlot: <Icon name="lock" />,
        isExpandTrigger: true,
        expandContent: (
          <p className="text-sp-text-middle text-sm">
            Two-factor authentication is currently enabled.
          </p>
        ),
      },
    ],
  },
  render: (args) => (
    <div className="w-[500px]">
      <InformationList {...args} />
    </div>
  ),
};
