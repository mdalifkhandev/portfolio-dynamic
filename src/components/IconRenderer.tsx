import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as VscIcons from "react-icons/vsc";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";

export const getIcon = (iconName: string) => {
  if (!iconName) return null;
  if (iconName.startsWith("Si")) return (SiIcons as any)[iconName];
  if (iconName.startsWith("Fa")) return (FaIcons as any)[iconName];
  if (iconName.startsWith("Vsc")) return (VscIcons as any)[iconName];
  if (iconName.startsWith("Io")) return (Io5Icons as any)[iconName];
  if (iconName.startsWith("Md")) return (MdIcons as any)[iconName];
  return null;
};

export function IconRenderer({ iconName, color, size = 40 }: { iconName: string; color?: string; size?: number }) {
  const IconComponent = getIcon(iconName) || SiIcons.SiJavascript; // Fallback
  return <IconComponent size={size} color={color || "#f7df1e"} />;
}
