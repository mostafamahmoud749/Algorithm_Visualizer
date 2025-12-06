'use client';
import AlgorithmDashboard from '@/comp/AlgorithmDashboard';
import { linearSearch } from '@/lib/search/linearSearch';
import { binarySearch } from '@/lib/search/binarySearch';
import { jumpSearch } from '@/lib/search/jumpSearch';
import { exponentialSearch } from '@/lib/search/exponentialSearch';
import { useState, useCallback, useMemo } from 'react';

export default function Home() {
  const [state, setState] = useState({
    linear: {
      selected: true,
      steps: [],
    },
    binary: {
      selected: true,
      steps: [],
    },
    jump: {
      selected: true,
      steps: [],
    },
    exponential: {
      selected: true,
      steps: [],
    },
  });

  const options = ['linear', 'binary', 'jump', 'exponential'];

  const algorithms = useMemo(
    () => ({
      linear: linearSearch,
      binary: binarySearch,
      jump: jumpSearch,
      exponential: exponentialSearch,
    }),
    []
  );

  const addSteps = useCallback((name, obj) => {
    setState((prev) => {
      const bucket = prev[name] ?? { selected: false, steps: [] };
      return {
        ...prev,
        [name]: { selected: bucket.selected, steps: [...bucket.steps, obj] },
      };
    });
  }, []);
  const toggleState = (opt) => {
    setState((prev) => ({
      ...prev,
      [opt]: {
        selected: !prev[opt].selected,
        steps: prev[opt]?.steps ?? [],
      },
    }));
  };
  return (
    <AlgorithmDashboard
      state={state}
      options={options}
      algorithms={algorithms}
      addSteps={addSteps}
      toggleState={toggleState}
      setState={setState}
      type="search"
    />
  );
}
