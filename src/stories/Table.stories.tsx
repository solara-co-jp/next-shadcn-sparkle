import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableHeaderCheckboxCell,
  TableCheckboxCell,
  TableDataCell,
} from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";

const meta = {
  title: "Components/Table",
  component: Table,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md"],
    },
  },
  args: {
    size: "md",
    children: null,
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: "1", name: "田中太郎", role: "エンジニア", status: "Active" as const },
  { id: "2", name: "佐藤花子", role: "デザイナー", status: "Active" as const },
  { id: "3", name: "鈴木一郎", role: "PM", status: "Away" as const },
];

export const Default: Story = {
  render: (args) => (
    <Table size={args.size}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>名前</TableHeaderCell>
          <TableHeaderCell>役職</TableHeaderCell>
          <TableHeaderCell align="right">ステータス</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableDataCell>{row.name}</TableDataCell>
            <TableDataCell>{row.role}</TableDataCell>
            <TableDataCell align="right">
              <Tag status={row.status === "Active" ? "success" : "warning"} size="sm">
                {row.status}
              </Tag>
            </TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const SizeXs: Story = {
  render: () => (
    <Table size="xs">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>名前</TableHeaderCell>
          <TableHeaderCell align="right">金額</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableDataCell>001</TableDataCell>
          <TableDataCell>商品A</TableDataCell>
          <TableDataCell align="right">¥1,000</TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell>002</TableDataCell>
          <TableDataCell>商品B</TableDataCell>
          <TableDataCell align="right">¥2,500</TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell>003</TableDataCell>
          <TableDataCell>商品C</TableDataCell>
          <TableDataCell align="right">¥800</TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const SizeSm: Story = {
  render: () => (
    <Table size="sm">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>名前</TableHeaderCell>
          <TableHeaderCell align="center">カテゴリ</TableHeaderCell>
          <TableHeaderCell align="right">金額</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableDataCell>001</TableDataCell>
          <TableDataCell>商品A</TableDataCell>
          <TableDataCell align="center">食品</TableDataCell>
          <TableDataCell align="right">¥1,000</TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell>002</TableDataCell>
          <TableDataCell>商品B</TableDataCell>
          <TableDataCell align="center">雑貨</TableDataCell>
          <TableDataCell align="right">¥2,500</TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell>003</TableDataCell>
          <TableDataCell>商品C</TableDataCell>
          <TableDataCell align="center">衣料</TableDataCell>
          <TableDataCell align="right">¥800</TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const SizeMd: Story = {
  render: () => (
    <Table size="md">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>名前</TableHeaderCell>
          <TableHeaderCell>メールアドレス</TableHeaderCell>
          <TableHeaderCell align="center">部署</TableHeaderCell>
          <TableHeaderCell align="right">ステータス</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableDataCell>田中太郎</TableDataCell>
          <TableDataCell>tanaka@example.com</TableDataCell>
          <TableDataCell align="center">開発部</TableDataCell>
          <TableDataCell align="right">
            <Tag status="success" size="sm">Active</Tag>
          </TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell>佐藤花子</TableDataCell>
          <TableDataCell>sato@example.com</TableDataCell>
          <TableDataCell align="center">デザイン部</TableDataCell>
          <TableDataCell align="right">
            <Tag status="success" size="sm">Active</Tag>
          </TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell>鈴木一郎</TableDataCell>
          <TableDataCell>suzuki@example.com</TableDataCell>
          <TableDataCell align="center">企画部</TableDataCell>
          <TableDataCell align="right">
            <Tag status="warning" size="sm">Away</Tag>
          </TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Table size="md">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>名前</TableHeaderCell>
          <TableHeaderCell>役職</TableHeaderCell>
          <TableHeaderCell align="right">ステータス</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableDataCell>田中太郎</TableDataCell>
          <TableDataCell>エンジニア</TableDataCell>
          <TableDataCell align="right">
            <Tag status="success" size="sm">Active</Tag>
          </TableDataCell>
        </TableRow>
        <TableRow disabled>
          <TableDataCell>佐藤花子</TableDataCell>
          <TableDataCell>デザイナー</TableDataCell>
          <TableDataCell align="right">
            <Tag status="negative" size="sm">Inactive</Tag>
          </TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell>鈴木一郎</TableDataCell>
          <TableDataCell>PM</TableDataCell>
          <TableDataCell align="right">
            <Tag status="warning" size="sm">Away</Tag>
          </TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

function WithCheckboxExample() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allChecked = selected.size === sampleData.length;
  const someChecked = selected.size > 0 && !allChecked;

  function toggleAll(checked: boolean) {
    if (checked) {
      setSelected(new Set(sampleData.map((d) => d.id)));
    } else {
      setSelected(new Set());
    }
  }

  function toggleRow(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <Table size="sm">
      <TableHeader>
        <TableRow>
          <TableHeaderCheckboxCell
            checked={allChecked}
            indeterminate={someChecked}
            onCheckedChange={toggleAll}
          />
          <TableHeaderCell>名前</TableHeaderCell>
          <TableHeaderCell>役職</TableHeaderCell>
          <TableHeaderCell align="right">ステータス</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id} data-state={selected.has(row.id) ? "selected" : undefined}>
            <TableCheckboxCell
              checked={selected.has(row.id)}
              onCheckedChange={(checked) => toggleRow(row.id, checked)}
            />
            <TableDataCell>{row.name}</TableDataCell>
            <TableDataCell>{row.role}</TableDataCell>
            <TableDataCell align="right">
              <Tag status={row.status === "Active" ? "success" : "warning"} size="sm">
                {row.status}
              </Tag>
            </TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const WithCheckbox: Story = {
  render: () => <WithCheckboxExample />,
};

export const Alignment: Story = {
  render: () => (
    <Table size="sm">
      <TableHeader>
        <TableRow>
          <TableHeaderCell align="left">Left</TableHeaderCell>
          <TableHeaderCell align="center">Center</TableHeaderCell>
          <TableHeaderCell align="right">Right</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableDataCell align="left">データ</TableDataCell>
          <TableDataCell align="center">データ</TableDataCell>
          <TableDataCell align="right">データ</TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell align="left">データ</TableDataCell>
          <TableDataCell align="center">データ</TableDataCell>
          <TableDataCell align="right">データ</TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
