'use client';
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Algorithm from '@/comp/Algorithm';
import Controls from './Controls';
import { Play, Pause, SkipForward, SkipBack, RefreshCw } from 'lucide-react';

export default function AlgorithmDashboard({
  state,
  options,
  algorithms,
  addSteps,
  toggleState,
  setState,
  type,
}) {
  const [list, setList] = useState([
    50, 20, 30, 40, 40, 90, 10, 100, 80, 60, 90, 100, 70,
  ]);
  const [inputValue, setInputValue] = useState('');
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [target, setTarget] = useState(80);
  const [stepIndex, setStepIndex] = useState({
    bubble: -1,
    selection: -1,
    insertion: -1,
    merge: -1,
    linear: -1,
    binary: -1,
    jump: -1,
    exponential: -1,
  });
  const [paused, setpaused] = useState(false);
  const barWidth = `${100 / list.length - 2}%`;
  const selectedCount = Object.values(state).filter((s) => s.selected).length;

  const toggleReset = useCallback(() => {
    setState((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([key, val]) => [
          key,
          { selected: val.selected, steps: [] },
        ])
      )
    );
    setRunning(false);
    setpaused(false);
    setStepIndex({
      bubble: -1,
      selection: -1,
      insertion: -1,
      merge: -1,
      linear: -1,
      binary: -1,
      jump: -1,
      exponential: -1,
    });
  }, [setState, setRunning]);
  const updateIndex = useCallback((name, index) => {
    setStepIndex((prev) => ({ ...prev, [name]: index }));
  }, []); // ✅ stable reference
  const sortedList = useMemo(
    () => (type === 'search' ? [...list].sort((a, b) => a - b) : list),
    [list, type]
  );
  const showAlgos = useMemo(() => {
    return options.map(
      (el, index) =>
        state[el].selected && (
          <div
            key={el}
            className={`flex flex-col items-center gap-2 ${type === 'search' && index !== 0 ? 'mt-4' : ''}`}
          >
            <h2 className="text-lg font-bold text-gray-700">
              {el} {type}
            </h2>
            <Algorithm
              list={sortedList}
              barWidth={barWidth}
              speed={speed}
              toggleReset={toggleReset}
              running={running}
              algo={algorithms[el]}
              name={el}
              addSteps={addSteps}
              state={state[el]}
              target={target}
              type={type}
              paused={paused}
              stepIndex={stepIndex}
              updateIndex={updateIndex}
            />
          </div>
        )
    );
  }, [
    options,
    state,
    sortedList,
    barWidth,
    speed,
    toggleReset,
    running,
    algorithms,
    addSteps,
    target,
    type,
    paused,
    stepIndex,
    updateIndex,
  ]);

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <Controls
        options={options}
        state={state}
        inputValue={inputValue}
        speed={speed}
        setList={setList}
        setSpeed={setSpeed}
        setInputValue={setInputValue}
        running={running}
        selectedCount={selectedCount}
        toggleReset={toggleReset}
        list={list}
        setRunning={setRunning}
        toggleState={toggleState}
        setTarget={setTarget}
        target={target}
      />

      <div
        className={`bg-white w-full h-fit min-h-[70vh] ${type == 'sort' ? `grid ${selectedCount <= 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-6` : ''} p-6 border border-gray-300 rounded-3xl shadow-lg`}
      >
        {showAlgos}
      </div>

      {/* Control Bar */}
      <div className="w-full max-w-3xl mb-2 ">
        <div className="flex items-center justify-center gap-5 px-4 py-3 border border-gray-200 shadow-sm rounded-2xl bg-gray-50">
          {/* Previous */}
          <button
            onClick={() => {
              setStepIndex((prev) => {
                const updated = {};
                for (const key in prev) {
                  updated[key] = Math.max(-1, prev[key] - 1);
                }
                return updated;
              });
            }}
            aria-label="Previous step"
            className="flex items-center justify-center w-12 h-12 text-gray-700 transition bg-white border border-gray-200 rounded-full shadow-sm group hover:bg-gray-100 hover:text-blue-600 hover:border-blue-300"
          >
            <SkipBack
              size={20}
              className="transition-transform group-hover:-translate-x-0.5"
            />
          </button>

          {/* Play / Pause */}
          <button
            onClick={() => {
              if (!running) {
                setRunning(true);
                setpaused(false);
              } else {
                setpaused((prev) => !prev);
              }
            }}
            aria-label={!running ? 'Start' : paused ? 'Continue' : 'Pause'}
            className={`flex items-center justify-center w-16 h-16 rounded-full transition shadow-md
              ${
                !running || paused
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                  : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'
              }`}
          >
            {!running || paused ? (
              <Play size={26} className="ml-0.5" />
            ) : (
              <Pause size={26} />
            )}
          </button>

          {/* Next */}
          <button
            onClick={() => {
              setStepIndex((prev) => {
                const updated = {};
                for (const key in prev) {
                  const maxIndex = (state[key]?.steps?.length || 0) - 1;
                  updated[key] = Math.min(maxIndex, prev[key] + 1);
                }
                return updated;
              });
            }}
            aria-label="Next step"
            className="flex items-center justify-center w-12 h-12 text-gray-700 transition bg-white border border-gray-200 rounded-full shadow-sm group hover:bg-gray-100 hover:text-blue-600 hover:border-blue-300"
          >
            <SkipForward
              size={20}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

          {/* Divider */}
          <span className="w-px h-6 mx-1 bg-gray-300" />

          {/* Reset */}
          <button
            onClick={toggleReset}
            aria-label="Reset"
            className="flex items-center justify-center w-12 h-12 text-gray-500 transition bg-white border border-gray-200 rounded-full shadow-sm group hover:bg-red-50 hover:text-red-500 hover:border-red-300"
          >
            <RefreshCw
              size={18}
              className="transition-transform group-hover:rotate-90"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
