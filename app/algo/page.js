'use client';
import { useState, useEffect, useCallback } from 'react';

// ============================================
// PROBLEM: Coin Change
// Given coins [1, 3, 4] and target amount
// Find minimum coins needed
//
// Greedy: Always pick largest coin (FAST but sometimes WRONG)
// DP: Check all possibilities (SLOWER but always CORRECT)
// ============================================

// ============================================
// GREEDY SOLUTION
// ============================================
function GreedyCoinChange({ coins, target, speed = 500 }) {
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(-1);
  const [running, setRunning] = useState(false);

  const generateSteps = useCallback(() => {
    const sortedCoins = [...coins].sort((a, b) => b - a); // largest first
    const newSteps = [];
    let remaining = target;
    const usedCoins = [];

    newSteps.push({
      remaining,
      usedCoins: [],
      currentCoin: null,
      message: `Start: Need to make ${target} using coins [${coins.join(', ')}]`,
    });

    for (const coin of sortedCoins) {
      while (remaining >= coin) {
        usedCoins.push(coin);
        remaining -= coin;

        newSteps.push({
          remaining,
          usedCoins: [...usedCoins],
          currentCoin: coin,
          message: `Pick ${coin} (largest that fits). Remaining: ${remaining}`,
        });
      }
    }

    newSteps.push({
      remaining,
      usedCoins: [...usedCoins],
      currentCoin: null,
      message:
        remaining === 0
          ? `Done! Used ${usedCoins.length} coins: [${usedCoins.join(', ')}]`
          : `Failed! Cannot make exact amount.`,
      done: true,
      success: remaining === 0,
    });

    return newSteps;
  }, [coins, target]);

  const start = () => {
    setSteps(generateSteps());
    setStepIndex(0);
    setRunning(true);
  };

  const reset = () => {
    setStepIndex(-1);
    setRunning(false);
    setSteps([]);
  };

  useEffect(() => {
    if (!running || stepIndex < 0 || stepIndex >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setStepIndex((i) => i + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [running, stepIndex, steps.length, speed]);

  const currentStep = steps[stepIndex] || null;

  return (
    <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🏃</span>
        <h3 className="text-lg font-bold text-gray-800">Greedy Approach</h3>
        <span className="px-2 py-1 text-xs text-yellow-700 bg-yellow-100 rounded-full">
          Fast but risky
        </span>
      </div>

      {/* Coin visualization */}
      <div className="flex gap-2 mb-4">
        {coins
          .sort((a, b) => b - a)
          .map((coin, idx) => (
            <div
              key={idx}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all
              ${currentStep?.currentCoin === coin ? 'bg-yellow-500 scale-110' : 'bg-gray-400'}
            `}
            >
              {coin}
            </div>
          ))}
      </div>

      {/* Used coins */}
      <div className="mb-4">
        <p className="mb-2 text-sm text-gray-500">Coins used:</p>
        <div className="flex gap-1 flex-wrap min-h-[40px] p-2 bg-gray-50 rounded-lg">
          {currentStep?.usedCoins?.map((coin, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-green-500 rounded-full"
            >
              {coin}
            </div>
          ))}
        </div>
      </div>

      {/* Remaining */}
      <div className="p-3 mb-4 rounded-lg bg-blue-50">
        <p className="text-sm text-blue-700">
          Remaining:{' '}
          <span className="text-lg font-bold">
            {currentStep?.remaining ?? target}
          </span>
        </p>
      </div>

      {/* Message */}
      <div
        className={`p-3 rounded-lg text-sm mb-4 ${
          currentStep?.done
            ? currentStep?.success
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {currentStep?.message || 'Click Start to begin'}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={start}
          disabled={running && stepIndex < steps.length - 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Result */}
      {currentStep?.done && (
        <div
          className={`mt-4 p-4 rounded-xl ${currentStep?.success ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
          <p className="font-bold">
            Total: {currentStep?.usedCoins?.length} coins
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================
// DYNAMIC PROGRAMMING SOLUTION
// ============================================
function DPCoinChange({ coins, target, speed = 300 }) {
  const [dpTable, setDpTable] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(-1);
  const [running, setRunning] = useState(false);
  const [currentCell, setCurrentCell] = useState({ row: -1, col: -1 });

  // Sort coins for consistent display
  const sortedCoins = [...coins].sort((a, b) => a - b); // [1, 3, 4]

  const generateSteps = useCallback(() => {
    const newSteps = [];
    const n = sortedCoins.length;

    // Create 2D table: rows = coins (+ 1 for base), cols = amounts 0 to target
    const dp = Array(n + 1)
      .fill(null)
      .map(() => Array(target + 1).fill(Infinity));

    // Base case: 0 coins needed to make amount 0
    for (let i = 0; i <= n; i++) {
      dp[i][0] = 0;
    }

    newSteps.push({
      dp: dp.map((row) => [...row]),
      row: -1,
      col: -1,
      coin: null,
      message: `Start: dp[i][0] = 0 for all rows (need 0 coins to make 0)`,
    });

    // Fill DP table row by row
    for (let i = 1; i <= n; i++) {
      const coin = sortedCoins[i - 1];

      for (let amount = 1; amount <= target; amount++) {
        // Option 1: Don't use this coin (take value from row above)
        dp[i][amount] = dp[i - 1][amount];

        // Option 2: Use this coin (can use multiple times - check same row)
        if (coin <= amount) {
          const useThisCoin = dp[i][amount - coin] + 1; // same row = unlimited use
          if (useThisCoin < dp[i][amount]) {
            dp[i][amount] = useThisCoin;
          }
        }

        newSteps.push({
          dp: dp.map((row) => [...row]),
          row: i,
          col: amount,
          coin,
          message:
            coin <= amount
              ? `Row ${i} (coin ${coin}), Amount ${amount}: min(above: ${dp[i - 1][amount]}, use coin: ${dp[i][amount - coin]} + 1) = ${dp[i][amount]}`
              : `Row ${i} (coin ${coin}), Amount ${amount}: coin too big, take from above = ${dp[i][amount]}`,
        });
      }
    }

    // Backtrack to find coins used
    const usedCoins = [];
    let i = n;
    let amount = target;

    while (amount > 0 && i > 0) {
      const coin = sortedCoins[i - 1];

      // Check if we used this coin
      if (coin <= amount && dp[i][amount] === dp[i][amount - coin] + 1) {
        usedCoins.push(coin);
        amount -= coin;
        // Stay in same row (can use coin again)
      } else {
        // Move to row above
        i--;
      }
    }

    newSteps.push({
      dp: dp.map((row) => [...row]),
      row: -1,
      col: -1,
      coin: null,
      usedCoins,
      message:
        dp[n][target] === Infinity
          ? `Cannot make ${target} with given coins`
          : `Done! Minimum ${dp[n][target]} coins: [${usedCoins.join(', ')}]`,
      done: true,
      success: dp[n][target] !== Infinity,
    });

    return newSteps;
  }, [sortedCoins, target]);

  const start = () => {
    setSteps(generateSteps());
    setStepIndex(0);
    setRunning(true);
  };

  const reset = () => {
    setStepIndex(-1);
    setRunning(false);
    setSteps([]);
    setDpTable([]);
    setCurrentCell({ row: -1, col: -1 });
  };

  useEffect(() => {
    if (!running || stepIndex < 0 || stepIndex >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setStepIndex((i) => i + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [running, stepIndex, steps.length, speed]);

  useEffect(() => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setDpTable(steps[stepIndex].dp);
      setCurrentCell({ row: steps[stepIndex].row, col: steps[stepIndex].col });
    }
  }, [stepIndex, steps]);

  const currentStep = steps[stepIndex] || null;

  return (
    <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🧠</span>
        <h3 className="text-lg font-bold text-gray-800">Dynamic Programming</h3>
        <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">
          Slow but optimal
        </span>
      </div>

      {/* Coins available */}
      <div className="flex gap-2 mb-4">
        {sortedCoins.map((coin, idx) => (
          <div
            key={idx}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all
              ${currentStep?.coin === coin ? 'bg-purple-500 scale-110' : 'bg-gray-400'}
            `}
          >
            {coin}
          </div>
        ))}
      </div>

      {/* 2D DP Table */}
      <div className="mb-4 overflow-x-auto">
        <p className="mb-2 text-sm text-gray-500">
          DP Table (rows = coins, cols = amounts):
        </p>
        <table className="text-sm border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-xs bg-gray-100 border border-gray-300">
                Coin\Amt
              </th>
              {Array.from({ length: target + 1 }, (_, i) => (
                <th
                  key={i}
                  className="p-2 text-xs bg-gray-100 border border-gray-300 min-w-[36px]"
                >
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dpTable.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td className="p-2 font-medium bg-gray-50 border border-gray-300 text-xs">
                  {rowIdx === 0 ? '∅' : sortedCoins[rowIdx - 1]}
                </td>
                {row.map((cell, colIdx) => (
                  <td
                    key={colIdx}
                    className={`p-2 border border-gray-300 text-center transition-all duration-200 text-xs
                      ${
                        currentCell.row === rowIdx && currentCell.col === colIdx
                          ? 'bg-yellow-400 font-bold scale-105'
                          : cell !== Infinity && cell > 0
                            ? 'bg-purple-100'
                            : cell === 0
                              ? 'bg-green-100'
                              : 'bg-white'
                      }
                    `}
                  >
                    {cell === Infinity ? '∞' : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message */}
      <div
        className={`p-3 rounded-lg text-sm mb-4 ${
          currentStep?.done
            ? currentStep?.success
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {currentStep?.message || 'Click Start to begin'}
      </div>

      {/* Used coins (final) */}
      {currentStep?.usedCoins && (
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-500">Optimal coins:</p>
          <div className="flex flex-wrap gap-1 p-2 rounded-lg bg-gray-50">
            {currentStep.usedCoins.map((coin, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-purple-500 rounded-full"
              >
                {coin}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={start}
          disabled={running && stepIndex < steps.length - 1}
          className="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Result */}
      {currentStep?.done && currentStep?.success && (
        <div className="p-4 mt-4 text-white bg-purple-500 rounded-xl">
          <p className="font-bold">
            Total: {currentStep?.usedCoins?.length} coins
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN PAGE - COMPARISON
// ============================================
export default function AlgoPage() {
  const [target, setTarget] = useState(6);
  const [speed, setSpeed] = useState(500);

  // Coins that show greedy fails: [1, 3, 4]
  // Greedy for 6: 4 + 1 + 1 = 3 coins
  // DP for 6: 3 + 3 = 2 coins (BETTER!)
  const coins = [1, 3, 4];

  return (
    <div className="w-full max-w-5xl p-4 mx-auto">
      <h1 className="mb-2 text-2xl font-bold text-center text-gray-800">
        Greedy vs Dynamic Programming
      </h1>
      <p className="mb-6 text-center text-gray-500">
        Same problem, different approaches. See why Greedy isn't always best!
      </p>

      {/* Problem description */}
      <div className="p-4 mb-6 border border-blue-200 bg-blue-50 rounded-xl">
        <h2 className="mb-2 font-bold text-blue-800">
          💰 Problem: Coin Change
        </h2>
        <p className="text-sm text-blue-700">
          You have coins: <strong>[{coins.join(', ')}]</strong>
        </p>
        <p className="text-sm text-blue-700">
          Make amount <strong>{target}</strong> using minimum coins.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          Target Amount:
          <input
            type="number"
            min="1"
            max="15"
            value={target}
            onChange={(e) =>
              setTarget(Math.max(1, Math.min(15, Number(e.target.value))))
            }
            className="w-16 px-2 py-1 border rounded-lg"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          Speed:
          <input
            type="range"
            min="100"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24"
          />
          {speed}ms
        </label>
      </div>

      {/* Side by side comparison */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <GreedyCoinChange coins={coins} target={target} speed={speed} />
        <DPCoinChange coins={coins} target={target} speed={speed} />
      </div>

      {/* Key insight */}
      <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-xl">
        <h3 className="mb-2 font-bold text-yellow-800">⚡ Key Insight</h3>
        <p className="mb-2 text-sm text-yellow-700">
          For <strong>target = 6</strong> with coins <strong>[1, 3, 4]</strong>:
        </p>
        <ul className="text-sm text-yellow-700 list-disc list-inside">
          <li>
            <strong>Greedy:</strong> 4 + 1 + 1 ={' '}
            <span className="font-bold text-red-600">3 coins</span> (picks
            largest first)
          </li>
          <li>
            <strong>DP:</strong> 3 + 3 ={' '}
            <span className="font-bold text-green-600">2 coins</span> (finds
            optimal)
          </li>
        </ul>
        <p className="mt-2 text-sm text-yellow-700">
          Greedy is faster (O(n)) but can give wrong answer. DP is slower (O(n ×
          amount)) but always optimal.
        </p>
      </div>

      {/* Complexity comparison */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-3 text-center rounded-lg bg-gray-50">
          <p className="text-xs text-gray-500">Greedy</p>
          <p className="font-mono text-sm">Time: O(n)</p>
          <p className="text-xs text-red-500">Not always correct</p>
        </div>
        <div className="p-3 text-center rounded-lg bg-gray-50">
          <p className="text-xs text-gray-500">Dynamic Programming</p>
          <p className="font-mono text-sm">Time: O(n × amount)</p>
          <p className="text-xs text-green-500">Always optimal</p>
        </div>
      </div>
    </div>
  );
}
