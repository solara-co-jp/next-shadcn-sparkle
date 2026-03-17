import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fn } from "storybook/test";
import { useState } from "react";

const meta = {
  title: "Components/Modal",
  component: Modal,
  args: {
    open: false,
    onOpenChange: fn(),
    title: "Modal Title",
    children: <p>Modal content</p>,
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Modal Title"
          footer={
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          }
        >
          <p className="text-sp-text-middle font-[family-name:var(--font-family-base)]">
            This is the modal body content. You can put any content here.
          </p>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const [openSize, setOpenSize] = useState<string | null>(null);
    return (
      <div className="flex gap-2">
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <div key={size}>
            <Button variant="outline" size="sm" onClick={() => setOpenSize(size)}>
              {size.toUpperCase()}
            </Button>
            <Modal
              open={openSize === size}
              onOpenChange={(v) => !v && setOpenSize(null)}
              title={`${size.toUpperCase()} Modal`}
              size={size}
            >
              <p className="text-sp-text-middle font-[family-name:var(--font-family-base)]">
                This is a {size} modal.
              </p>
            </Modal>
          </div>
        ))}
      </div>
    );
  },
};
