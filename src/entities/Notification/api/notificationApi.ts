import { rtkApi } from '@/shared/api/rtkApi';
import { supabase } from '@/shared/api/supabase';

import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], null>({
      queryFn: async () => {
        const {
          data: { session }
        } = await supabase.auth.getSession();

        if (!session) {
          return { error: { status: 'CUSTOM_ERROR', error: 'Not authenticated' } };
        }

        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }

        const notifications: Notification[] = (data ?? []).map((row) => ({
          id: row.id,
          title: row.title,
          description: row.description ?? '',
          href: row.href ?? undefined,
          unread: row.unread
        }));

        return { data: notifications };
      }
    })
  })
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
