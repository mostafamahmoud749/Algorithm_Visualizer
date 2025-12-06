'use client';
import { useEffect, useRef, useMemo } from 'react';

export default function Bars({
  steps = [],
  barWidth,
  list = [],
  speed = 300,
  paused,
  stepIndex,
  updateIndex,
  name,
}) {
  const lastLenRef = useRef(steps.length);
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

  useEffect(() => {
    if (paused) return;
    const len = Array.isArray(steps) ? steps.length : 0;
    if (len === 0) return;

    const delay = Math.max(10, Number(speed) || 300);

    if (stepIndex === -1) {
      const id = setTimeout(() => updateIndex(name, 0), delay);
      return () => clearTimeout(id);
    }

    if (stepIndex >= len - 1) return;

    const id = setTimeout(() => updateIndex(name, stepIndex + 1), delay);
    return () => clearTimeout(id);
  }, [steps, stepIndex, name, updateIndex, speed, paused]);

  const current = steps.length && stepIndex >= 0 ? steps[stepIndex] : null;
  const arr = current?.curList ?? list;
  const highlight = current?.highlight ?? [];

  const maxVal = useMemo(() => {
    const base =
      Array.isArray(arr) && arr.length ? arr : Array.isArray(list) ? list : [0];
    return Math.max(...base);
  }, [arr, list]);

  return (
    <>
      {arr.map((bar, index) => {
        const h = maxVal === 0 ? 0 : (bar / maxVal) * 100;
        const active = highlight.includes(index);
        return (
          <div
            key={index}
            style={{ width: barWidth, height: `${h}%` }}
            className={`relative rounded-t-md max-w-24 transition-all duration-150 ${
              active ? 'bg-rose-500' : 'bg-gray-500 hover:bg-gray-600'
            }`}
          >
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-700">
              {bar}
            </div>
          </div>
        );
      })}
      {stepIndex[name] === steps.length - 1 && found === -1 && (
        <p className="text-red-500 text-sm mt-2">Target not found</p>
      )}
    </>
  );
}
