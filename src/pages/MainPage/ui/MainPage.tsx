import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Button } from '@/components/ui/button';

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <Page data-testid="MainPage">
            <div>123123123123123123</div>
            {t('Главная страница')}
            <div className="mt-4 space-x-2">
                <Button className="text-red-500 text-2xl p-8 px-16">
                    Default Button
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
            </div>
        </Page>
    );
};

export default MainPage;
