import * as icons from '@ant-design/icons';

const all: Record<string, any> = icons;

export default function Icon({ name }: { name: string }) {
  const SelectedIcon = all[name];
  
  if (!SelectedIcon) {
    // 处理图标未找到的情况
    return null;
  }
  
  return <SelectedIcon />;
}
