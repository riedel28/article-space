// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import '@/app/styles/index.css';

import React from 'react';

export const StyleDecorator = (story: () => React.ComponentType) => story();
