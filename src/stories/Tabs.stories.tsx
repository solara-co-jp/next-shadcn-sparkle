import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    variant: {
      control: "select",
      options: ["line", "solid", "ghost"],
    },
  },
  args: {
    variant: "line",
    defaultValue: "tab1",
    children: null,
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
  render: (args) => (
    <div className="w-[500px]">
      <Tabs {...args}>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel value="tab1">Content for Tab 1</TabPanel>
        <TabPanel value="tab2">Content for Tab 2</TabPanel>
        <TabPanel value="tab3">Content for Tab 3</TabPanel>
      </Tabs>
    </div>
  ),
};

export const Solid: Story = {
  render: () => (
    <div className="w-[500px]">
      <Tabs variant="solid" defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel value="tab1">Content for Tab 1</TabPanel>
        <TabPanel value="tab2">Content for Tab 2</TabPanel>
        <TabPanel value="tab3">Content for Tab 3</TabPanel>
      </Tabs>
    </div>
  ),
};

export const Ghost: Story = {
  render: () => (
    <div className="w-[500px]">
      <Tabs variant="ghost" defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel value="tab1">Content for Tab 1</TabPanel>
        <TabPanel value="tab2">Content for Tab 2</TabPanel>
        <TabPanel value="tab3">Content for Tab 3</TabPanel>
      </Tabs>
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <div className="w-[500px]">
      <Tabs variant="line" defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Enabled</Tab>
          <Tab value="tab2" disabled>Disabled</Tab>
          <Tab value="tab3">Enabled</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
        <TabPanel value="tab3">Content 3</TabPanel>
      </Tabs>
    </div>
  ),
};
