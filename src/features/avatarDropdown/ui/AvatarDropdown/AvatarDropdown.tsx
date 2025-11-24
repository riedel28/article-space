import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions
} from '@/entities/User';
import {
    getRouteAdmin,
    getRouteProfile,
    getRouteSettings
} from '@/shared/const/router';
import { DropdownMenu } from '@/shared/ui/shadcn/DropdownMenu';

export const AvatarDropdown = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }

    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t('Админка'),
                      href: getRouteAdmin()
                  }
              ]
            : []),
        {
            content: t('Профиль'),
            href: getRouteProfile(authData.id)
        },
        {
            content: t('Настройки'),
            href: getRouteSettings()
        },
        {
            content: t('Выйти'),
            onClick: onLogout
        }
    ];

    return <DropdownMenu items={items} />;
};
