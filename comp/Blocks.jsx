'use client';
import { useState, useEffect, useRef } from 'react';

export default function Blocks({
  list,
  steps,
  speed = 300,
  paused,
  stepIndex,
  updateIndex,
  name,
}) {
  const lastLenRef = useRef(steps?.length ?? 0);
  const timerRef = useRef(null);
  useEffect(() => {
    const len = Array.isArray(steps) ? steps.length : 0;
    const prevLen = lastLenRef.current;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (prevLen === 0 && len > 0) {
      timerRef.current = setTimeout(() => updateIndex(name, -1), 0);
    }
    lastLenRef.current = len;

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [steps, name, updateIndex]);

  // Advance through steps
  useEffect(() => {
    if (paused) return;
    const len = Array.isArray(steps) ? steps.length : 0;
    if (len === 0) return;

    const delay = Math.max(10, Number(speed) || 300);

    // Move from initial frame (-1) to first step
    if (stepIndex === -1) {
      const id = setTimeout(() => updateIndex(name, 0), delay);
      return () => clearTimeout(id);
    }

    // Stop at last step
    if (stepIndex >= len - 1) return;

    const id = setTimeout(() => updateIndex(name, stepIndex + 1), delay);
    return () => clearTimeout(id);
  }, [steps, stepIndex, , name, updateIndex, speed, paused]);

  const current =
    steps && steps.length && stepIndex >= 0 ? steps[stepIndex] : null;
  const highlight = current?.highlight || [];
  const found = current?.found;

  const showBlocks = (Array.isArray(list) ? list : []).map((value, index) => {
    const isActive = highlight.includes(index);
    const isFound = found === index;
    const bg = isFound
      ? 'bg-green-400'
      : isActive
        ? 'bg-red-400'
        : 'bg-white ';

    return (
      <div
        key={index}
        className={`
          min-w-14 h-14 px-4 sm:min-w-16 sm:h-16
          flex items-center justify-center
          rounded-xl border border-gray-300 
          text-gray-800 
          shadow-sm hover:shadow-md hover:border-gray-400 
          transition-colors duration-200
          ${bg}
        `}
      >
        <span className="font-semibold tracking-wide">{value}</span>
      </div>
    );
  });

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-3 p-4 border border-gray-200 rounded-2xl bg-gray-50"
    >
      {showBlocks}
      {stepIndex === steps.length - 1 && found === -1 && (
        <p className="mt-2 text-sm text-red-500">Target not found</p>
      )}
    </div>
  );
}
