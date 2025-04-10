import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SimulatorTime } from './simulatorTime';

const AnimationLogic = ({ time, setDate, setDateText }) => {
    const frameCount = useRef(0);
  useFrame(() => {
    frameCount.current += 1;
      if (frameCount.current % 60 === 0) {
          // time.current.addSeconds(0.1);
          time.current.addSeconds(1);
          // time.current.addMinutes(1);
          // time.current.addHours(6);
          // time.current.addDays(1);
          setDate(time.current.getSimulationDate());
          setDateText(time.current.getSimulationDate().toLocaleString());
          // frameCount.current = 1;
      }
  });

  return null;
};

export default AnimationLogic;
