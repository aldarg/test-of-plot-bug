import React, { useEffect, useState } from 'react';
import { Parameters } from 'tabs_nntc';

interface DataItem {
  id: string;
  moduleType: string;
  settingType: string;
  name: string;
  unit: string;
  min: number;
  max: number;
  sMin: number;
  sMax: number;
  order: number;
  statusColor: string[];
  enabled?: boolean;
  value?: string;
}

const initial: DataItem = {
  id: '1',
  moduleType: '',
  settingType: 'Numbers',
  name: 'Test',
  unit: 'm',
  min: 0,
  max: 10,
  sMin: 0,
  sMax: 10,
  order: 1,
  statusColor: [],
  enabled: true,
  value: '1',
};

const increase = (x: string) => {
  const number = Number.parseInt(x, 10);
  return `${number + 1}`;
}

const App3 = () => {
  const [data, setData] = useState<DataItem[]>([initial]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((old) => [{ ...old[0], value: increase(old[0].value!) }]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <Parameters widgets={data} />;
};

export default App3;
