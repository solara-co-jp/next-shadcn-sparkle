"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { FormControl } from "@/components/ui/form-control";
import { InlineMessage } from "@/components/ui/inline-message";
import { Modal } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/alert-dialog";
import { Drawer } from "@/components/ui/sheet";
import { Tooltip } from "@/components/ui/tooltip";
import { Popover } from "@/components/ui/popover";
import { Menu, MenuItem, MenuCheckboxItem, MenuGroup, MenuSeparator } from "@/components/ui/dropdown-menu";
import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";
import { VerticalTabs, VerticalTabList, VerticalTab, VerticalTabPanel } from "@/components/ui/vertical-tabs";
import { Card, ClickableCard, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableDataCell } from "@/components/ui/table";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { Stepper } from "@/components/ui/stepper";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { SideNavigation, SideNavItem, SideNavGroup } from "@/components/ui/side-navigation";
import { FilterChip } from "@/components/ui/filter-chip";
import { InputChip } from "@/components/ui/input-chip";
import { InputDate } from "@/components/ui/input-date";
import { InputTime } from "@/components/ui/input-time";
import { InputFile } from "@/components/ui/input-file";
import { InputNumber } from "@/components/ui/input-number";
import { InputPassword } from "@/components/ui/input-password";
import { InputSearch } from "@/components/ui/input-search";
import { InformationList } from "@/components/ui/information-list";
import { Overlay } from "@/components/ui/overlay";
import { Stack } from "@/components/ui/stack";
import { Slot } from "@/components/ui/slot";
import { Link } from "@/components/ui/link";
import { Calendar } from "@/components/ui/calendar";
import { showToast, Toast } from "@/components/ui/toast";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-[var(--sp-16)]">
      <h2 className="text-sp-6 font-bold leading-[var(--lh-6)] text-sp-text-high font-[family-name:var(--font-family-base)] border-b border-sp-divider-middle pb-[var(--sp-8)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-[var(--sp-8)]">
      <h3 className="text-sp-3 font-bold leading-[var(--lh-3)] text-sp-text-middle font-[family-name:var(--font-family-base)]">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogNeutralOpen, setDialogNeutralOpen] = useState(false);
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
  const [dialogNegativeOpen, setDialogNegativeOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuCheckA, setMenuCheckA] = useState(true);
  const [menuCheckB, setMenuCheckB] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [segmentValue, setSegmentValue] = useState("a");
  const [chipValues, setChipValues] = useState(["React", "Next.js"]);
  const [sliderValue, setSliderValue] = useState(50);
  const [toastOpen, setToastOpen] = useState(false);
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<
    { hour: number; minute: number } | undefined
  >(undefined);

  return (
    <div className="min-h-screen bg-sp-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-sp-white border-b border-sp-divider-low">
        <div className="max-w-[1280px] mx-auto px-[var(--sp-24)] py-[var(--sp-16)] flex items-center justify-between">
          <h1 className="text-sp-5 font-bold leading-[var(--lh-5)] text-sp-text-high font-[family-name:var(--font-family-base)]">
            Sparkle Design × shadcn/ui
          </h1>
          <Badge variant="normal" size="md" count={1} />
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-[var(--sp-24)] py-[var(--sp-40)] space-y-[var(--sp-56)]">
        {/* ── Button ── */}
        <Section title="Button">
          {(["primary", "neutral", "negative"] as const).map((theme) => (
            <SubSection key={theme} title={`Theme: ${theme}`}>
              <div className="space-y-[var(--sp-8)]">
                {/* enable */}
                <div className="flex items-center gap-[var(--sp-8)] flex-wrap">
                  {(["sm", "md", "lg"] as const).map((size) => (
                    <Button key={`f-${size}`} theme={theme} variant="fill" size={size}>
                      <Icon name="edit" size={size} />
                      ラベル
                    </Button>
                  ))}
                  {(["sm", "md", "lg"] as const).map((size) => (
                    <Button key={`o-${size}`} theme={theme} variant="outline" size={size}>
                      <Icon name="edit" size={size} />
                      ラベル
                    </Button>
                  ))}
                  {(["sm", "md", "lg"] as const).map((size) => (
                    <Button key={`g-${size}`} theme={theme} variant="ghost" size={size}>
                      <Icon name="edit" size={size} />
                      ラベル
                    </Button>
                  ))}
                </div>
                {/* loading */}
                <div className="flex items-center gap-[var(--sp-8)] flex-wrap">
                  {(["sm", "md", "lg"] as const).map((size) => (
                    <Button key={`fl-${size}`} theme={theme} variant="fill" size={size} isLoading />
                  ))}
                  {(["sm", "md", "lg"] as const).map((size) => (
                    <Button key={`ol-${size}`} theme={theme} variant="outline" size={size} isLoading />
                  ))}
                  {(["sm", "md", "lg"] as const).map((size) => (
                    <Button key={`gl-${size}`} theme={theme} variant="ghost" size={size} isLoading />
                  ))}
                </div>
                {/* disabled */}
                <div className="flex items-center gap-[var(--sp-8)] flex-wrap">
                  {(["sm", "md", "lg"] as const).map((size) => (
                    <Button key={`fd-${size}`} theme={theme} variant="fill" size={size} disabled>
                      <Icon name="edit" size={size} />
                      ラベル
                    </Button>
                  ))}
                  {(["sm", "md", "lg"] as const).map((size) => (
                    <Button key={`od-${size}`} theme={theme} variant="outline" size={size} disabled>
                      <Icon name="edit" size={size} />
                      ラベル
                    </Button>
                  ))}
                  {(["sm", "md", "lg"] as const).map((size) => (
                    <Button key={`gd-${size}`} theme={theme} variant="ghost" size={size} disabled>
                      <Icon name="edit" size={size} />
                      ラベル
                    </Button>
                  ))}
                </div>
              </div>
            </SubSection>
          ))}
        </Section>

        {/* ── IconButton ── */}
        <Section title="IconButton">
          <div className="flex items-center gap-[var(--sp-8)]">
            <IconButton
              icon={<Icon name="edit" size="sm" />}
              label="Edit"
              size="sm"
            />
            <IconButton
              icon={<Icon name="delete" size="md" />}
              label="Delete"
              size="md"
            />
            <IconButton
              icon={<Icon name="settings" size="lg" />}
              label="Settings"
              size="lg"
            />
          </div>
        </Section>

        {/* ── Badge ── */}
        <Section title="Badge">
          <SubSection title="Normal (sizes)">
            <div className="flex items-center gap-[var(--sp-12)]">
              <Badge variant="normal" size="xs" />
              <Badge variant="normal" size="sm" />
              <Badge variant="normal" size="md" count={13} />
              <Badge variant="normal" size="lg" count={13} />
            </div>
          </SubSection>
          <SubSection title="Emphasis (sizes)">
            <div className="flex items-center gap-[var(--sp-12)]">
              <Badge variant="emphasis" size="xs" />
              <Badge variant="emphasis" size="sm" />
              <Badge variant="emphasis" size="md" count={13} />
              <Badge variant="emphasis" size="lg" count={13} />
            </div>
          </SubSection>
          <SubSection title="Gapped (for overlay use)">
            <div className="flex items-center gap-[var(--sp-12)]">
              <Badge variant="normal" size="xs" isGapped />
              <Badge variant="normal" size="sm" isGapped />
              <Badge variant="normal" size="md" count={13} isGapped />
              <Badge variant="normal" size="lg" count={13} isGapped />
            </div>
          </SubSection>
        </Section>

        {/* ── Tag ── */}
        <Section title="Tag">
          <SubSection title="Status × Variant">
            <div className="flex items-center gap-[var(--sp-8)] flex-wrap">
              {(
                ["neutral", "info", "success", "warning", "negative"] as const
              ).map((status) => (
                <Tag key={status} status={status} variant="subtle">
                  {status}
                </Tag>
              ))}
            </div>
            <div className="flex items-center gap-[var(--sp-8)] flex-wrap">
              {(
                ["neutral", "info", "success", "warning", "negative"] as const
              ).map((status) => (
                <Tag key={status} status={status} variant="outline">
                  {status}
                </Tag>
              ))}
            </div>
            <div className="flex items-center gap-[var(--sp-8)] flex-wrap">
              {(
                ["neutral", "info", "success", "warning", "negative"] as const
              ).map((status) => (
                <Tag key={status} status={status} variant="solid">
                  {status}
                </Tag>
              ))}
            </div>
          </SubSection>
          <SubSection title="Sizes">
            <div className="flex items-center gap-[var(--sp-8)]">
              <Tag status="info" variant="solid" size="sm">sm</Tag>
              <Tag status="info" variant="solid" size="md">md</Tag>
              <Tag status="info" variant="solid" size="lg">lg</Tag>
            </div>
          </SubSection>
          <SubSection title="Removable">
            <Tag status="info" onRemove={() => {}}>
              Removable
            </Tag>
          </SubSection>
        </Section>

        {/* ── Icon ── */}
        <Section title="Icon">
          <div className="flex items-center gap-[var(--sp-16)]">
            <Icon name="home" size="sm" />
            <Icon name="settings" size="md" />
            <Icon name="favorite" size="lg" filled />
            <Icon
              name="check_circle"
              size="lg"
              filled
              color="text-sp-success-500"
            />
            <Icon
              name="error"
              size="lg"
              filled
              color="text-sp-negative-500"
            />
          </div>
        </Section>

        {/* ── InlineMessage ── */}
        <Section title="InlineMessage">
          <div className="space-y-[var(--sp-8)]">
            <InlineMessage status="info" title="タイトル" onClose={() => {}}>
              デスクリプション
            </InlineMessage>
            <InlineMessage status="success" title="タイトル" onClose={() => {}}>
              デスクリプション
            </InlineMessage>
            <InlineMessage status="warning" title="タイトル" onClose={() => {}}>
              デスクリプション
            </InlineMessage>
            <InlineMessage status="negative" title="タイトル" onClose={() => {}}>
              デスクリプション
            </InlineMessage>
          </div>
        </Section>

        <Divider emphasis="high" />

        {/* ── Input ── */}
        <Section title="Input">
          <div className="space-y-[var(--sp-16)]">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <div key={sz}>
                <p className="text-[length:var(--font-size-sp-1)] text-sp-text-low mb-[var(--sp-4)] font-[family-name:var(--font-family-base)]">{sz}</p>
                <div className="max-w-[400px] space-y-[var(--sp-8)]">
                  <Input size={sz} placeholder="入力内容" />
                  <Input size={sz} placeholder="入力内容" isInvalid />
                  <Input size={sz} placeholder="入力内容" disabled />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── InputSearch ── */}
        <Section title="InputSearch">
          <div className="space-y-[var(--sp-16)]">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <div key={sz}>
                <p className="text-[length:var(--font-size-sp-1)] text-sp-text-low mb-[var(--sp-4)] font-[family-name:var(--font-family-base)]">{sz}</p>
                <div className="max-w-[400px]">
                  <InputSearch size={sz} placeholder="入力内容" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── InputPassword ── */}
        <Section title="InputPassword">
          <div className="space-y-[var(--sp-16)]">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <div key={sz}>
                <p className="text-[length:var(--font-size-sp-1)] text-sp-text-low mb-[var(--sp-4)] font-[family-name:var(--font-family-base)]">{sz}</p>
                <div className="max-w-[400px]">
                  <InputPassword size={sz} placeholder="入力内容" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── InputNumber ── */}
        <Section title="InputNumber">
          <div className="space-y-[var(--sp-16)]">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <div key={sz}>
                <p className="text-[length:var(--font-size-sp-1)] text-sp-text-low mb-[var(--sp-4)] font-[family-name:var(--font-family-base)]">{sz}</p>
                <div className="max-w-[200px]">
                  <InputNumber size={sz} placeholder="0" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── InputDate ── */}
        <Section title="InputDate">
          <div className="space-y-[var(--sp-16)]">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <div key={sz}>
                <p className="text-[length:var(--font-size-sp-1)] text-sp-text-low mb-[var(--sp-4)] font-[family-name:var(--font-family-base)]">{sz}</p>
                <InputDate
                  size={sz}
                  value={dateValue}
                  onChange={setDateValue}
                  className="w-[280px]"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* ── InputTime ── */}
        <Section title="InputTime">
          <div className="space-y-[var(--sp-16)]">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <div key={sz}>
                <p className="text-[length:var(--font-size-sp-1)] text-sp-text-low mb-[var(--sp-4)] font-[family-name:var(--font-family-base)]">{sz}</p>
                <InputTime
                  size={sz}
                  value={timeValue}
                  onChange={setTimeValue}
                  className="w-[200px]"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* ── InputFile ── */}
        <Section title="InputFile">
          <div className="space-y-[var(--sp-16)]">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <div key={sz}>
                <p className="text-[length:var(--font-size-sp-1)] text-sp-text-low mb-[var(--sp-4)] font-[family-name:var(--font-family-base)]">{sz}</p>
                <div className="max-w-[400px]">
                  <InputFile size={sz} accept=".pdf,.png,.jpg" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Textarea ── */}
        <Section title="Textarea">
          <div className="max-w-[400px]">
            <Textarea
              placeholder="テキストを入力..."
              maxLength={200}
              showCounter
            />
          </div>
        </Section>

        {/* ── Select ── */}
        <Section title="Select">
          <div className="max-w-[300px]">
            <Select
              options={[
                { label: "Option A", value: "a" },
                { label: "Option B", value: "b" },
                { label: "Option C (disabled)", value: "c", disabled: true },
              ]}
              placeholder="選択してください"
            />
          </div>
        </Section>

        {/* ── Checkbox ── */}
        <Section title="Checkbox">
          <div className="space-y-[var(--sp-8)]">
            <Checkbox label="Default checkbox" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Indeterminate" indeterminate />
            <Checkbox label="Invalid" isInvalid />
            <Checkbox label="Invalid + Checked" isInvalid defaultChecked />
            <Checkbox label="Disabled" disabled />
          </div>
        </Section>

        {/* ── Radio ── */}
        <Section title="RadioGroup">
          <div className="flex gap-[var(--sp-32)]">
            <RadioGroup
              name="demo-radio"
              options={[
                { label: "Option A", value: "a" },
                { label: "Option B", value: "b" },
                { label: "Option C (disabled)", value: "c", disabled: true },
              ]}
              defaultValue="a"
            />
            <RadioGroup
              name="demo-radio-invalid"
              options={[
                { label: "Invalid A", value: "a" },
                { label: "Invalid B", value: "b" },
              ]}
              defaultValue="a"
              isInvalid
            />
          </div>
        </Section>

        {/* ── Switch ── */}
        <Section title="Switch">
          <div className="space-y-[var(--sp-8)]">
            <Switch label="Default switch" />
            <Switch label="Checked" defaultChecked />
            <Switch label="Disabled" disabled />
          </div>
        </Section>

        {/* ── Slider ── */}
        <Section title="Slider">
          <div className="max-w-[400px]">
            <Slider
              value={sliderValue}
              onChange={setSliderValue}
              min={0}
              max={100}
            />
            <p className="text-sp-2 text-sp-text-low mt-[var(--sp-4)]">
              Value: {sliderValue}
            </p>
          </div>
        </Section>

        {/* ── FilterChip ── */}
        <Section title="FilterChip">
          <SubSection title="isSelected: false">
            <div className="grid grid-cols-[auto_auto_auto] gap-x-[var(--sp-12)] gap-y-[var(--sp-8)] w-fit items-center">
              <span className="text-sp-1 text-sp-text-low">sm</span>
              <span className="text-sp-1 text-sp-text-low">md</span>
              <span className="text-sp-1 text-sp-text-low">lg</span>
              <FilterChip size="sm" label="ラベル" />
              <FilterChip size="md" label="ラベル" />
              <FilterChip size="lg" label="ラベル" />
              <FilterChip size="sm" label="ラベル" disabled />
              <FilterChip size="md" label="ラベル" disabled />
              <FilterChip size="lg" label="ラベル" disabled />
            </div>
          </SubSection>
          <SubSection title="isSelected: true">
            <div className="grid grid-cols-[auto_auto_auto] gap-x-[var(--sp-12)] gap-y-[var(--sp-8)] w-fit items-center">
              <span className="text-sp-1 text-sp-text-low">sm</span>
              <span className="text-sp-1 text-sp-text-low">md</span>
              <span className="text-sp-1 text-sp-text-low">lg</span>
              <FilterChip size="sm" label="ラベル" selected />
              <FilterChip size="md" label="ラベル" selected />
              <FilterChip size="lg" label="ラベル" selected />
              <FilterChip size="sm" label="ラベル" selected disabled />
              <FilterChip size="md" label="ラベル" selected disabled />
              <FilterChip size="lg" label="ラベル" selected disabled />
            </div>
          </SubSection>
          <SubSection title="Dropdown">
            <div className="flex flex-wrap items-center gap-[var(--sp-8)]">
              <FilterChip size="sm" label="ラベル" isDropdown />
              <FilterChip size="md" label="ラベル" isDropdown />
              <FilterChip size="lg" label="ラベル" isDropdown />
            </div>
          </SubSection>
        </Section>

        {/* ── InputChip ── */}
        <Section title="InputChip">
          <div className="max-w-[400px]">
            <InputChip
              values={chipValues}
              onChange={setChipValues}
              placeholder="タグを追加..."
            />
          </div>
        </Section>

        {/* ── FormControl ── */}
        <Section title="FormControl">
          <div className="max-w-[400px] space-y-[var(--sp-16)]">
            <FormControl
              label="メールアドレス"
              required
              tooltip="企業ドメインのアドレスをご使用ください"
              helperText="企業のメールアドレスを入力してください"
            >
              <Input placeholder="email@example.com" />
            </FormControl>
            <FormControl
              label="パスワード"
              required
              error
              errorText="パスワードは8文字以上にしてください"
            >
              <Input isInvalid placeholder="パスワード" />
            </FormControl>
          </div>
        </Section>

        <Divider emphasis="high" />

        {/* ── Card ── */}
        <Section title="Card">
          <SubSection title="Card（静的）">
            <div className="max-w-[320px]">
              <Card>
                <CardHeader>
                  <CardTitle>タイトル</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sp-2 text-sp-text-middle">
                    カードコンテンツのテキストです。ここに自由な内容を配置できます。
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="ghost" theme="neutral">
                    キャンセル
                  </Button>
                  <Button size="sm" variant="fill" theme="primary">
                    保存
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </SubSection>
          <SubSection title="Clickable Card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--sp-16)] max-w-[1024px]">
              <ClickableCard onClick={() => {}}>
                <CardHeader>
                  <CardTitle>クリック可能</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sp-2 text-sp-text-middle">
                    ホバーで影が大きくなります。
                  </p>
                </CardContent>
              </ClickableCard>
              <ClickableCard onClick={() => {}}>
                <CardHeader>
                  <CardTitle>遷移トリガー</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sp-2 text-sp-text-middle">
                    クリックやD&Dに対応。
                  </p>
                </CardContent>
              </ClickableCard>
              <ClickableCard disabled>
                <CardHeader>
                  <CardTitle>無効状態</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sp-2 text-sp-text-middle">
                    操作できません。
                  </p>
                </CardContent>
              </ClickableCard>
            </div>
          </SubSection>
        </Section>

        {/* ── Table ── */}
        <Section title="Table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>名前</TableHeaderCell>
                <TableHeaderCell>役職</TableHeaderCell>
                <TableHeaderCell align="right">
                  ステータス
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableDataCell>田中太郎</TableDataCell>
                <TableDataCell>エンジニア</TableDataCell>
                <TableDataCell align="right">
                  <Tag status="success" size="sm">
                    Active
                  </Tag>
                </TableDataCell>
              </TableRow>
              <TableRow>
                <TableDataCell>佐藤花子</TableDataCell>
                <TableDataCell>デザイナー</TableDataCell>
                <TableDataCell align="right">
                  <Tag status="success" size="sm">
                    Active
                  </Tag>
                </TableDataCell>
              </TableRow>
              <TableRow>
                <TableDataCell>鈴木一郎</TableDataCell>
                <TableDataCell>PM</TableDataCell>
                <TableDataCell align="right">
                  <Tag status="warning" size="sm">
                    Away
                  </Tag>
                </TableDataCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* ── InformationList ── */}
        <Section title="InformationList">
          <SubSection title="Label (with data)">
            <div className="max-w-[500px]">
              <InformationList
                items={[
                  { description: "デスクリプション", title: "タイトル", value: "データ", leadingSlot: <Icon name="person" size="md" /> },
                  { description: "デスクリプション", title: "タイトル", value: "データ", leadingSlot: <Icon name="mail" size="md" /> },
                  { description: "デスクリプション", title: "タイトル", value: "データ", leadingSlot: <Icon name="work" size="md" /> },
                ]}
              />
            </div>
          </SubSection>
          <SubSection title="Simple">
            <div className="max-w-[500px]">
              <InformationList
                items={[
                  { label: "名前", value: "田中太郎" },
                  { label: "メール", value: "tanaka@example.com" },
                  { label: "部署", value: "エンジニアリング" },
                  { label: "入社日", value: "2024-04-01" },
                ]}
              />
            </div>
          </SubSection>
          <SubSection title="Accordion (isExpandTrigger)">
            <div className="max-w-[500px]">
              <InformationList
                items={[
                  {
                    description: "アカウント",
                    title: "ユーザー設定",
                    value: "3件",
                    isExpandTrigger: true,
                    leadingSlot: <Icon name="person" size="md" />,
                    expandContent: (
                      <div className="flex flex-col gap-[var(--sp-8)] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] text-sp-text-middle font-[family-name:var(--font-family-base)]">
                        <p>プロフィール画像の変更</p>
                        <p>表示名の変更</p>
                        <p>パスワードの変更</p>
                      </div>
                    ),
                  },
                  {
                    description: "通知",
                    title: "通知設定",
                    value: "ON",
                    isExpandTrigger: true,
                    leadingSlot: <Icon name="notifications" size="md" />,
                    expandContent: (
                      <div className="flex flex-col gap-[var(--sp-8)] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] text-sp-text-middle font-[family-name:var(--font-family-base)]">
                        <p>メール通知を受け取る</p>
                        <p>プッシュ通知を受け取る</p>
                      </div>
                    ),
                  },
                  {
                    description: "セキュリティ",
                    title: "二段階認証",
                    isExpandTrigger: true,
                    leadingSlot: <Icon name="lock" size="md" />,
                    trailingSlot: <span className="text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)] text-sp-success-500 font-bold font-[family-name:var(--font-family-base)]">有効</span>,
                    expandContent: (
                      <div className="text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] text-sp-text-middle font-[family-name:var(--font-family-base)]">
                        <p>認証アプリを使用した二段階認証が有効です。</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </SubSection>
        </Section>

        <Divider emphasis="high" />

        {/* ── Tabs ── */}
        <Section title="Tabs">
          <SubSection title="Solid variant">
            <Tabs defaultValue="stab1" variant="solid">
              <TabList>
                <Tab value="stab1"><Icon name="home" size="sm" /> ホーム</Tab>
                <Tab value="stab2"><Icon name="settings" size="sm" /> 設定</Tab>
                <Tab value="stab3"><Icon name="person" size="sm" /> プロフィール</Tab>
              </TabList>
              <TabPanel value="stab1">
                <p className="text-sp-2 text-sp-text-middle">
                  Solid variant - タブ 1 のコンテンツです。
                </p>
              </TabPanel>
              <TabPanel value="stab2">
                <p className="text-sp-2 text-sp-text-middle">
                  Solid variant - タブ 2 のコンテンツです。
                </p>
              </TabPanel>
              <TabPanel value="stab3">
                <p className="text-sp-2 text-sp-text-middle">
                  Solid variant - タブ 3 のコンテンツです。
                </p>
              </TabPanel>
            </Tabs>
          </SubSection>
          <SubSection title="Line variant">
            <Tabs defaultValue="ltab1" variant="line">
              <TabList>
                <Tab value="ltab1"><Icon name="home" size="sm" /> ホーム</Tab>
                <Tab value="ltab2"><Icon name="settings" size="sm" /> 設定</Tab>
                <Tab value="ltab3"><Icon name="person" size="sm" /> プロフィール</Tab>
              </TabList>
              <TabPanel value="ltab1">
                <p className="text-sp-2 text-sp-text-middle">
                  Line variant - タブ 1 のコンテンツです。
                </p>
              </TabPanel>
              <TabPanel value="ltab2">
                <p className="text-sp-2 text-sp-text-middle">
                  Line variant - タブ 2 のコンテンツです。
                </p>
              </TabPanel>
              <TabPanel value="ltab3">
                <p className="text-sp-2 text-sp-text-middle">
                  Line variant - タブ 3 のコンテンツです。
                </p>
              </TabPanel>
            </Tabs>
          </SubSection>
          <SubSection title="Ghost variant">
            <Tabs defaultValue="gtab1" variant="ghost">
              <TabList>
                <Tab value="gtab1"><Icon name="home" size="sm" /> ホーム</Tab>
                <Tab value="gtab2"><Icon name="settings" size="sm" /> 設定</Tab>
                <Tab value="gtab3"><Icon name="person" size="sm" /> プロフィール</Tab>
              </TabList>
              <TabPanel value="gtab1">
                <p className="text-sp-2 text-sp-text-middle">
                  Ghost variant - タブ 1 のコンテンツです。
                </p>
              </TabPanel>
              <TabPanel value="gtab2">
                <p className="text-sp-2 text-sp-text-middle">
                  Ghost variant - タブ 2 のコンテンツです。
                </p>
              </TabPanel>
              <TabPanel value="gtab3">
                <p className="text-sp-2 text-sp-text-middle">
                  Ghost variant - タブ 3 のコンテンツです。
                </p>
              </TabPanel>
            </Tabs>
          </SubSection>
        </Section>

        {/* ── VerticalTabs ── */}
        <Section title="VerticalTabs">
          <VerticalTabs defaultValue="vtab1">
            <VerticalTabList>
              <VerticalTab value="vtab1"><Icon name="settings" size="sm" /> 設定</VerticalTab>
              <VerticalTab value="vtab2"><Icon name="person" size="sm" /> プロフィール</VerticalTab>
              <VerticalTab value="vtab3"><Icon name="notifications" size="sm" /> 通知</VerticalTab>
            </VerticalTabList>
            <VerticalTabPanel value="vtab1">
              <p className="text-sp-2 text-sp-text-middle">設定画面です。</p>
            </VerticalTabPanel>
            <VerticalTabPanel value="vtab2">
              <p className="text-sp-2 text-sp-text-middle">
                プロフィール画面です。
              </p>
            </VerticalTabPanel>
            <VerticalTabPanel value="vtab3">
              <p className="text-sp-2 text-sp-text-middle">通知画面です。</p>
            </VerticalTabPanel>
          </VerticalTabs>
        </Section>

        {/* ── SegmentedControl ── */}
        <Section title="SegmentedControl">
          <SegmentedControl
            options={[
              { value: "a", label: "日" },
              { value: "b", label: "週" },
              { value: "c", label: "月" },
            ]}
            value={segmentValue}
            onChange={setSegmentValue}
          />
        </Section>

        {/* ── Breadcrumb ── */}
        <Section title="Breadcrumb">
          <Breadcrumb
            items={[
              { label: "ホーム", href: "/" },
              { label: "プロジェクト", href: "/" },
              { label: "設定" },
            ]}
          />
        </Section>

        {/* ── Pagination ── */}
        <Section title="Pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onChange={setCurrentPage}
          />
        </Section>

        {/* ── Stepper ── */}
        <Section title="Stepper">
          <Stepper
            steps={[
              { label: "入力", description: "情報を入力" },
              { label: "確認", description: "内容を確認" },
              { label: "完了", description: "送信完了" },
            ]}
            currentStep={1}
          />
        </Section>

        <Divider emphasis="high" />

        {/* ── SideNavigation ── */}
        <Section title="SideNavigation">
          <div className="border border-sp-divider-low rounded-sp-action inline-block">
            <SideNavigation>
              <SideNavGroup>
                <SideNavItem
                  label="ダッシュボード"
                  icon="dashboard"
                  active
                />
                <SideNavItem label="プロジェクト" icon="folder" />
                <SideNavItem label="メッセージ" icon="mail" badge={<Badge variant="normal" size="xs" count={3} />} />
              </SideNavGroup>
              <SideNavGroup title="設定">
                <SideNavItem label="一般" icon="settings" />
                <SideNavItem label="チーム" icon="group" />
                <SideNavItem
                  label="通知"
                  icon="notifications"
                  disabled
                />
              </SideNavGroup>
            </SideNavigation>
          </div>
        </Section>

        {/* ── Avatar ── */}
        <Section title="Avatar">
          <div className="flex items-end gap-[var(--sp-12)]">
            <Avatar name="田中" size="xs" />
            <Avatar name="佐藤" size="sm" />
            <Avatar name="花子" size="md" />
            <Avatar name="鈴木" size="lg" />
            <Avatar name="高橋" size="xl" />
            <Avatar name="伊藤" size="2xl" />
            <Avatar name="渡辺" size="3xl" />
          </div>
          <div className="flex items-end gap-[var(--sp-12)]">
            <Avatar size="xs" />
            <Avatar size="sm" />
            <Avatar size="md" />
            <Avatar src="https://i.pravatar.cc/120?img=3" alt="User" size="lg" />
            <Avatar src="https://i.pravatar.cc/120?img=5" alt="User" size="xl" />
          </div>
        </Section>

        {/* ── Spinner ── */}
        <Section title="Spinner">
          <div className="flex items-center gap-[var(--sp-16)]">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </Section>

        {/* ── Skeleton ── */}
        <Section title="Skeleton">
          <div className="space-y-[var(--sp-8)] max-w-[400px]">
            <Skeleton variant="text" width="100%" height="20px" />
            <Skeleton variant="text" width="75%" height="20px" />
            <div className="flex items-center gap-[var(--sp-12)]">
              <Skeleton
                variant="circular"
                width="40px"
                height="40px"
              />
              <div className="flex-1 space-y-[var(--sp-4)]">
                <Skeleton variant="text" width="60%" height="16px" />
                <Skeleton variant="text" width="40%" height="16px" />
              </div>
            </div>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="120px"
            />
          </div>
        </Section>

        {/* ── ProgressIndicator ── */}
        <Section title="ProgressIndicator">
          <div className="max-w-[400px] space-y-[var(--sp-12)]">
            {/* Bar variants */}
            <ProgressIndicator value={25} label="Upload" showValue />
            <ProgressIndicator value={60} label="Processing" showValue />
            <ProgressIndicator value={100} label="Complete" showValue />
            {/* Circle variants */}
            <div className="flex items-center gap-[var(--sp-16)]">
              <ProgressIndicator variant="circle" value={25} size="md" />
              <ProgressIndicator variant="circle" value={50} size="md" />
              <ProgressIndicator variant="circle" value={75} size="md" />
              <ProgressIndicator variant="circle" value={100} size="md" />
            </div>
          </div>
        </Section>

        {/* ── Divider ── */}
        <Section title="Divider">
          <div className="space-y-[var(--sp-16)]">
            <Divider emphasis="low" />
            <Divider emphasis="middle" />
            <Divider emphasis="high" />
            <Divider emphasis="middle" lineStyle="dashed" />
          </div>
        </Section>

        {/* ── Calendar ── */}
        <Section title="Calendar">
          <div className="inline-block">
            <Calendar />
          </div>
        </Section>

        <Divider emphasis="high" />

        {/* ── Tooltip ── */}
        <Section title="Tooltip">
          <div className="flex gap-[var(--sp-16)]">
            <Tooltip content="上のツールチップ" position="top">
              <Button variant="outline" theme="neutral" size="sm">
                Top
              </Button>
            </Tooltip>
            <Tooltip content="下のツールチップ" position="bottom">
              <Button variant="outline" theme="neutral" size="sm">
                Bottom
              </Button>
            </Tooltip>
            <Tooltip content="右のツールチップ" position="right">
              <Button variant="outline" theme="neutral" size="sm">
                Right
              </Button>
            </Tooltip>
          </div>
        </Section>

        {/* ── Popover ── */}
        <Section title="Popover">
          <div className="flex gap-[var(--sp-8)]">
            <Popover
              trigger={
                <Button variant="outline" theme="neutral" size="sm">
                  Popover (md)
                </Button>
              }
              title="ポップオーバータイトル"
              size="md"
              onSave={() => {}}
            >
              <p className="text-sp-2 text-sp-text-middle">
                ポップオーバーの内容です。
              </p>
            </Popover>
            <Popover
              trigger={
                <Button variant="outline" theme="neutral" size="sm">
                  Popover (sm)
                </Button>
              }
              title="小さいポップオーバー"
              size="sm"
              onSave={() => {}}
            >
              <p className="text-sp-2 text-sp-text-middle">
                小さいサイズです。
              </p>
            </Popover>
            <Popover
              trigger={
                <Button variant="outline" theme="neutral" size="sm">
                  Popover (lg)
                </Button>
              }
              title="大きいポップオーバー"
              size="lg"
              onSave={() => {}}
            >
              <p className="text-sp-2 text-sp-text-middle">
                大きいサイズです。
              </p>
            </Popover>
          </div>
        </Section>

        {/* ── Menu ── */}
        <Section title="Menu">
          <div className="flex gap-[var(--sp-16)]">
            <Menu
              trigger={
                <Button variant="outline" theme="neutral" size="sm">
                  Open Menu
                </Button>
              }
            >
              <MenuGroup label="グループ名">
                <MenuItem label="編集" icon="edit" onClick={() => {}} />
                <MenuItem
                  label="複製"
                  icon="content_copy"
                  onClick={() => {}}
                />
              </MenuGroup>
              <MenuSeparator />
              <MenuGroup label="その他">
                <MenuItem
                  label="無効な項目"
                  icon="block"
                  disabled
                  onClick={() => {}}
                />
                <MenuItem
                  label="削除"
                  icon="delete"
                  destructive
                  onClick={() => {}}
                />
              </MenuGroup>
            </Menu>
            <Menu
              trigger={
                <Button variant="outline" theme="neutral" size="sm">
                  Checkbox Menu
                </Button>
              }
            >
              <MenuCheckboxItem
                label="オプション A"
                checked={menuCheckA}
                onCheckedChange={setMenuCheckA}
              />
              <MenuCheckboxItem
                label="オプション B"
                checked={menuCheckB}
                onCheckedChange={setMenuCheckB}
              />
            </Menu>
          </div>
        </Section>

        {/* ── Modal ── */}
        <Section title="Modal">
          <Button
            variant="outline"
            theme="neutral"
            onClick={() => setModalOpen(true)}
          >
            Open Modal
          </Button>
          <Modal
            open={modalOpen}
            onOpenChange={setModalOpen}
            title="モーダルタイトル"
            size="md"
            footer={
              <div className="flex justify-end gap-[var(--sp-8)]">
                <Button
                  variant="outline"
                  theme="neutral"
                  onClick={() => setModalOpen(false)}
                >
                  キャンセル
                </Button>
                <Button onClick={() => setModalOpen(false)}>
                  保存
                </Button>
              </div>
            }
          >
            <p className="text-sp-2 text-sp-text-middle">
              モーダルの中身のコンテンツです。
            </p>
          </Modal>
        </Section>

        {/* ── Dialog ── */}
        <Section title="Dialog">
          <div className="flex gap-[var(--sp-8)]">
            <Button
              variant="outline"
              theme="neutral"
              onClick={() => setDialogNeutralOpen(true)}
            >
              Neutral Dialog
            </Button>
            <Button
              variant="outline"
              theme="neutral"
              onClick={() => setDialogWarningOpen(true)}
            >
              Warning Dialog
            </Button>
            <Button
              variant="outline"
              theme="neutral"
              onClick={() => setDialogNegativeOpen(true)}
            >
              Negative Dialog
            </Button>
          </div>
          <Dialog
            open={dialogNeutralOpen}
            onOpenChange={setDialogNeutralOpen}
            onConfirm={() => setDialogNeutralOpen(false)}
            status="neutral"
            title="接続を再試行"
            description="サーバーとの接続に失敗しました。再試行しますか？"
            confirmLabel="再試行"
          />
          <Dialog
            open={dialogWarningOpen}
            onOpenChange={setDialogWarningOpen}
            onConfirm={() => setDialogWarningOpen(false)}
            status="warning"
            title="未保存の変更があります"
            description="変更を保存せずにページを離れますか？"
            confirmLabel="保存"
          />
          <Dialog
            open={dialogNegativeOpen}
            onOpenChange={setDialogNegativeOpen}
            onConfirm={() => setDialogNegativeOpen(false)}
            status="negative"
            title="データを削除しますか？"
            description="この操作は取り消せません。本当に削除してもよろしいですか？"
            confirmLabel="破棄"
          />
        </Section>

        {/* ── Drawer ── */}
        <Section title="Drawer">
          <Button
            variant="outline"
            theme="neutral"
            onClick={() => setDrawerOpen(true)}
          >
            Open Drawer
          </Button>
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            title="Drawer タイトル"
            size="md"
            description="ドロワーの説明テキスト"
            statusBadge={<Tag status="info" size="sm">下書き</Tag>}
            footer={
              <>
                <Button
                  variant="outline"
                  theme="neutral"
                  onClick={() => setDrawerOpen(false)}
                >
                  キャンセル
                </Button>
                <Button onClick={() => setDrawerOpen(false)}>
                  保存
                </Button>
              </>
            }
          >
            <div className="p-[var(--sp-16)]">
              <p className="text-sp-2 text-sp-text-middle">
                ドロワーのコンテンツです。
              </p>
            </div>
          </Drawer>
        </Section>

        {/* ── Toast ── */}
        <Section title="Toast">
          <div className="flex gap-[var(--sp-8)]">
            <Button
              size="sm"
              variant="outline"
              theme="neutral"
              onClick={() =>
                showToast({ message: "タイトル", description: "デスクリプション", status: "neutral" })
              }
            >
              Neutral Toast
            </Button>
            <Button
              size="sm"
              variant="outline"
              theme="neutral"
              onClick={() =>
                showToast({ message: "タイトル", description: "デスクリプション", status: "success" })
              }
            >
              Success Toast
            </Button>
            <Button
              size="sm"
              variant="outline"
              theme="neutral"
              onClick={() =>
                showToast({ message: "タイトル", description: "デスクリプション", status: "negative" })
              }
            >
              Negative Toast
            </Button>
          </div>
        </Section>

        {/* ── Overlay ── */}
        <Section title="Overlay">
          <Button
            variant="outline"
            theme="neutral"
            onClick={() => setOverlayOpen(true)}
          >
            Open Overlay
          </Button>
          <Overlay open={overlayOpen} onClose={() => setOverlayOpen(false)}>
            <div className="bg-sp-white rounded-sp-modal p-[var(--sp-24)] max-w-[400px] space-y-[var(--sp-16)]">
              <h3 className="text-sp-4 font-bold text-sp-text-high">
                Overlay Content
              </h3>
              <p className="text-sp-2 text-sp-text-middle">
                オーバーレイの上に配置されたコンテンツです。
              </p>
              <Button onClick={() => setOverlayOpen(false)}>
                閉じる
              </Button>
            </div>
          </Overlay>
        </Section>

        <Divider emphasis="high" />

        {/* ── Stack ── */}
        <Section title="Stack">
          <SubSection title="Vertical">
            <Stack gap="var(--sp-8)">
              <div className="bg-sp-primary-50 p-[var(--sp-8)] rounded-sp-notice text-sp-2">
                Item 1
              </div>
              <div className="bg-sp-primary-50 p-[var(--sp-8)] rounded-sp-notice text-sp-2">
                Item 2
              </div>
              <div className="bg-sp-primary-50 p-[var(--sp-8)] rounded-sp-notice text-sp-2">
                Item 3
              </div>
            </Stack>
          </SubSection>
          <SubSection title="Horizontal">
            <Stack direction="horizontal" gap="var(--sp-8)">
              <div className="bg-sp-primary-50 p-[var(--sp-8)] rounded-sp-notice text-sp-2">
                Item 1
              </div>
              <div className="bg-sp-primary-50 p-[var(--sp-8)] rounded-sp-notice text-sp-2">
                Item 2
              </div>
              <div className="bg-sp-primary-50 p-[var(--sp-8)] rounded-sp-notice text-sp-2">
                Item 3
              </div>
            </Stack>
          </SubSection>
        </Section>

        {/* ── Slot ── */}
        <Section title="Slot">
          <div className="flex gap-[var(--sp-8)]">
            <Slot />
            <Slot>
              <Icon name="star" />
            </Slot>
          </div>
        </Section>

        {/* ── Link ── */}
        <Section title="Link">
          <div className="flex gap-[var(--sp-16)]">
            <Link href="/">内部リンク</Link>
            <Link href="https://example.com" isOpenInNew>
              外部リンク
            </Link>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-sp-divider-low">
        <div className="max-w-[1280px] mx-auto px-[var(--sp-24)] py-[var(--sp-24)] text-center">
          <p className="text-sp-2 text-sp-text-low">
            Sparkle Design × shadcn/ui × Next.js Template
          </p>
        </div>
      </footer>
    </div>
  );
}
