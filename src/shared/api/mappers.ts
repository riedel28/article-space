/* eslint-disable ulbi-tv-plugin/layer-imports */
import type { Article } from '@/entities/Article';
import type { Comment } from '@/entities/Comment';
import type { Notification } from '@/entities/Notification';
import type { Profile } from '@/entities/Profile';
import type { User } from '@/entities/User';

interface ProfileRow {
  id: string;
  username: string;
  avatar: string | null;
  roles: string[];
  features: Record<string, boolean>;
  json_settings: Record<string, unknown>;
  first_name: string | null;
  last_name: string | null;
  age: number | null;
  currency: string | null;
  country: string | null;
  city: string | null;
}

interface UserRow {
  id: string;
  username: string;
  avatar: string | null;
}

interface ArticleRow {
  id: string;
  title: string;
  subtitle: string | null;
  img: string | null;
  type: string[];
  user_id: string;
  views: number;
  created_at: string;
  content: string | null;
  user?: UserRow;
}

interface CommentRow {
  id: string;
  text: string;
  article_id: string;
  user_id: string;
  created_at: string;
  user?: UserRow;
}

interface NotificationRow {
  id: string;
  title: string;
  description: string | null;
  user_id: string;
  href: string | null;
  unread: boolean;
  created_at: string;
}

export function mapProfileToUser(row: ProfileRow): User {
  return {
    id: row.id,
    username: row.username,
    avatar: row.avatar ?? undefined,
    roles: row.roles as User['roles'],
    features: row.features as User['features'],
    jsonSettings: row.json_settings as User['jsonSettings'],
  };
}

export function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    username: row.username,
    avatar: row.avatar ?? undefined,
    first: row.first_name ?? undefined,
    lastname: row.last_name ?? undefined,
    age: row.age ?? undefined,
    currency: (row.currency ?? undefined) as Profile['currency'],
    country: (row.country ?? undefined) as Profile['country'],
    city: row.city ?? undefined,
  };
}

function mapUserRow(row?: UserRow): User {
  return {
    id: row?.id ?? '',
    username: row?.username ?? '',
    avatar: row?.avatar ?? undefined,
  };
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function mapArticle(row: ArticleRow): Article {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? '',
    img: row.img ?? '',
    type: row.type as Article['type'],
    user: mapUserRow(row.user),
    views: row.views,
    createdAt: formatDate(row.created_at),
    content: row.content ?? undefined,
  };
}

export function mapComment(row: CommentRow): Comment {
  return {
    id: row.id,
    text: row.text,
    user: mapUserRow(row.user),
    createdAt: row.created_at,
  };
}

export function mapNotification(row: NotificationRow): Notification {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    href: row.href ?? undefined,
    unread: row.unread,
  };
}
