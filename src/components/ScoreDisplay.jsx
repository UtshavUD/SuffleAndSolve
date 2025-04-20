import React from "react";

const ScoreDisplay = ({ matches, total }) => {
  return (
    <div className="mt-5 text-xl text-gray-700">
      <p>
        Matches: <span className="font-bold text-blue-600">{matches}</span> /{" "}
        {total}
      </p>
    </div>
  );
};

export default ScoreDisplay;
