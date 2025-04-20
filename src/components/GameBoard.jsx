import React, { useState } from "react";
import Box from "./Box";
import Buttons from "./Buttons";
import ScoreDisplay from "./ScoreDisplay";

const GameBoard = () => {
  const baseObjects = ["🍎", "🍌", "🍇", "🍒", "🥝", "🍍", "🍉", "🥭"];
  const [level, setLevel] = useState(1);
  const [shuffledBoxes, setShuffledBoxes] = useState([]);
  const [targetBoxes, setTargetBoxes] = useState([]);
  const [matches, setMatches] = useState(0);
  const [showObjects, setShowObjects] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

  // Get the number of boxes based on the level
  const numberOfBoxes = level + 3;

  // Shuffle the objects and reset the game
  const shuffleObjects = () => {
    const objectsToUse = baseObjects.slice(0, numberOfBoxes);
    const shuffled = [...objectsToUse].sort(() => Math.random() - 0.5);
    const randomizedTarget = [...shuffled].sort(() => Math.random() - 0.5);
    setShuffledBoxes(shuffled);
    setTargetBoxes(randomizedTarget);
    setMatches(0);
    setShowObjects(false);
  };

  // Check how many matches are correct
  const checkMatches = (arrangement) => {
    let count = 0;
    for (let i = 0; i < numberOfBoxes; i++) {
      if (arrangement[i] === shuffledBoxes[i]) {
        count++;
      }
    }
    setMatches(count);
  };

  // Handle swapping of objects in the target area
  const handleTargetClick = (idx) => {
    if (selectedBox === null) {
      setSelectedBox(idx);
    } else {
      const updatedTargets = [...targetBoxes];
      [updatedTargets[selectedBox], updatedTargets[idx]] = [updatedTargets[idx], updatedTargets[selectedBox]];
      setTargetBoxes(updatedTargets);
      setSelectedBox(null);
      checkMatches(updatedTargets);
    }
  };

  // Move to the next level
  const nextLevel = () => {
    if (matches === numberOfBoxes) {
      setLevel((prev) => prev + 1);
      shuffleObjects();
    }
  };

  return (
    <div className="flex flex-col border items-center bg-gray-100 min-h-screen py-20">
      <h1 className="text-4xl font-bold mb-10 text-blue-600">Object Arrangement Game</h1>
      <h2 className="text-xl mb-5 font-medium text-gray-700">Level: {level}</h2>

      {/* Shuffle and Show Buttons */}
      <Buttons
        shuffleObjects={shuffleObjects}
        setShowObjects={setShowObjects}
      />

      {/* Boxes to display shuffled objects */}
      <div className="flex justify-center gap-4 mt-10">
        {shuffledBoxes.map((obj, idx) => (
          <Box
            key={idx}
            content={showObjects ? obj : "❓"}
            clickable={false}
            className="transition-transform transform hover:scale-105 duration-300"
          />
        ))}
      </div>

      {/* Target area to arrange objects */}
      <h2 className="text-2xl font-semibold mt-10">Arrange Objects Below:</h2>
      <div className="flex justify-center gap-4 mt-5">
        {targetBoxes.map((obj, idx) => (
          <Box
            key={idx}
            content={obj || "Place Here"}
            clickable={true}
            onClick={() => handleTargetClick(idx)}
            className={`border ${
              selectedBox === idx
                ? "border-blue-500"
                : "border-gray-300"
            } transition-all duration-300 hover:bg-blue-100`}
          />
        ))}
      </div>

      {/* Score Display */}
      <ScoreDisplay matches={matches} total={numberOfBoxes} />

      {/* Level-Up Button */}
      {matches === numberOfBoxes && (
        <button
          onClick={nextLevel}
          className="mt-5 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Next Level
        </button>
      )}

      {/* Congratulations Message */}
      {matches === numberOfBoxes && level === baseObjects.length - 3 && (
        <h2 className="text-3xl font-bold text-green-500 mt-5">
          🎉 Congratulations! You've completed all levels! 🎉
        </h2>
      )}
    </div>
  );
};

export default GameBoard;
