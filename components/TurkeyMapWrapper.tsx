// Turkey Map Component Wrapper
'use client';

import React from 'react';
import TurkeyMap from 'turkey-map-react';
import { TurkeyMapWrapperProps } from '@/lib/types';
import { REGION_COLORS } from '@/lib/constants';

export default function TurkeyMapWrapper({ 
  onHover, 
  onClick, 
  selectedProvince 
}: TurkeyMapWrapperProps) {
  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="w-full max-w-5xl">
        <TurkeyMap
          hoverable={true}
          onHover={({ plateNumber, name }) => onHover({ name, plateNumber })}
          onClick={({ plateNumber, name }) => onClick({ name, plateNumber })}
          customStyle={{
            idleColor: '#E2E8F0',
            hoverColor: '#60A5FA'
          }}
        />
      </div>
    </div>
  );
}
