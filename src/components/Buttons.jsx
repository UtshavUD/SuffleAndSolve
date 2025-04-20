import React from "react";

const Buttons = ({ shuffleObjects, setShowObjects }) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={shuffleObjects}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Shuffle
      </button>
      <button
        onClick={() => setShowObjects(true)}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
      >
        Show Objects
      </button>
    </div>
  );
};

export default Buttons;
