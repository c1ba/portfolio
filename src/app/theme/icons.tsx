import Chevron from '@/assets/icons/chevron.svg';
import React from 'react';

const icons: {
  [key: string]: {default: React.ComponentType; variant?: React.ComponentType};
} = {
  chevron: {
    default: Chevron,
  },
};

export default icons;
