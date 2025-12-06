import React from 'react';

function Controls({
  options,
  state,
  inputValue,
  speed,
  setList,
  setInputValue,
  toggleState,
  setSpeed,
  list,
  toggleReset,
  setTarget,
  target,
}) {
  const showOptions = options.map((opt) => (
    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        onChange={() => toggleState(opt)}
        className="w-4 h-4 accent-yellow-500 cursor-pointer"
        checked={state[opt].selected}
      />
      <span>{opt}</span>
    </label>
  ));

  const addNumber = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num > 0) {
      setList([...list, num]);
      setInputValue('');
      toggleReset();
    } else {
      alert('Please enter a valid positive number');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addNumber();
    }
  };
  return (
    <>
      <div className="flex gap-4 items-center mb-4">{showOptions}</div>
      <div className="flex gap-6 mb-4">
        {/* List number input */}
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a number"
          className="px-4 py-2 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={addNumber}
          className="bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold rounded-xl px-6 py-2 shadow-md transition"
        >
          Add Number
        </button>
        <button
          onClick={() => setList([])}
          className="bg-rose-500 hover:bg-rose-600 cursor-pointer text-white font-semibold rounded-xl px-6 py-2 shadow-md transition"
        >
          clear Numbers
        </button>

        {/* Target input (for search) */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Target</label>
          <input
            type="number"
            value={target ?? ''}
            onChange={(e) => setTarget(Number(e.target.value))}
            placeholder="Find..."
            className="px-3 py-2 border border-gray-300 rounded-lg w-24 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Speed slider */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-700">Speed</label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-40 accent-yellow-500 cursor-pointer"
          />
          <span className="text-xs text-gray-600">{speed} ms</span>
        </div>

        {/* <button
          onClick={() => setRunning(true)}
          disabled={running || selectedCount === 0}
          className={`bg-yellow-500 hover:bg-yellow-600  text-white font-semibold rounded-xl px-6 py-2 shadow-md transition ${running || selectedCount === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          Start
        </button>

        <button
          onClick={toggleReset}
          className="bg-gray-700 hover:bg-gray-800 cursor-pointer text-white font-semibold rounded-xl px-6 py-2 shadow-md transition"
        >
          Reset
        </button> */}
      </div>
    </>
  );
}

export default React.memo(Controls);
