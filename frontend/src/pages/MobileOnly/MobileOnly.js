import React from "react";
import { useTranslation } from 'react-i18next';

import '../../App.css';

function MobileOnly() {
    const { t } = useTranslation();

    return (
        <div className="MobileOnly container fill">
            <h1>{t('mobile_only')}</h1>
        </div>
    );
}

// npm install --legacy-peer-deps

export default MobileOnly;