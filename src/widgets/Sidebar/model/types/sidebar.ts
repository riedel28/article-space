import { Icon } from '@tabler/icons-react';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: Icon;
  authOnly?: boolean;
}
