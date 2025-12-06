'use client';
import AlgorithmDashboard from '@/comp/AlgorithmDashboard';
import { bubbleSort } from '@/lib/bubbleSort';
import { insertionSort } from '@/lib/insertionSort';
import { mergeSort } from '@/lib/mergeSort';
import { selectionSort } from '@/lib/selectionSort';
import { useState, useCallback, useMemo } from 'react';

export default function Home() {
  const [state, setState] = useState({
    bubble: {
      selected: true,
      steps: [],
    },
    selection: {
      selected: true,
      steps: [],
    },
    insertion: {
      selected: true,
      steps: [],
    },
    merge: {
      selected: true,
      steps: [],
    },
  });

  const options = ['bubble', 'selection', 'insertion', 'merge'];

  const algorithms = useMemo(
    () => ({
      bubble: bubbleSort,
      selection: selectionSort,
      insertion: insertionSort,
      merge: mergeSort,
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
      type="sort"
    />
  );
}
