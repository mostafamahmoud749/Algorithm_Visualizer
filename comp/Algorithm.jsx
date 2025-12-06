'use client';
import Axis from '@/comp/Axis';
import { useEffect, useRef } from 'react';
import Bars from './Bars';
import Blocks from './Blocks';

export default function Algorithm({
  list,
  barWidth,
  algo,
  speed,
  name,
  running,
  toggleReset,
  addSteps,
  state,
  target,
  type,
  paused,
  stepIndex,
  updateIndex,
}) {
  const startedRef = useRef(false);
  const multipliers = {
    bubble: 0.7,
    selection: 1.3,
    insertion: 0.5,
    merge: 0.3,
    linear: 1,
    binary: 1,
    jump: 1,
    exponential: 1,
  };
  useEffect(() => {
    if (!running) {
      startedRef.current = false;
      return;
    }
    if (startedRef.current) return;

    startedRef.current = true;
    algo(list, addSteps, name, target);
  }, [running, algo, list, name, target, addSteps, toggleReset]);
  return (
    <div className="w-full h-full">
      {type == 'sort' && (
        <Axis>
          <Bars
            steps={state.steps}
            barWidth={barWidth}
            list={list}
            speed={speed * multipliers[name]}
            paused={paused}
            stepIndex={stepIndex[name]}
            updateIndex={updateIndex}
            name={name}
          />
        </Axis>
      )}
      {type == 'search' && (
        <Blocks
          list={list}
          steps={state.steps}
          speed={speed * multipliers[name]}
          paused={paused}
          stepIndex={stepIndex[name]}
          updateIndex={updateIndex}
          name={name}
        />
      )}
    </div>
  );
}
