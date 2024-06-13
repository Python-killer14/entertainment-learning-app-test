import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const letters = [
  { id: "A", content: "A", isMatched: false },
  { id: "B", content: "B", isMatched: false },
  { id: "C", content: "C", isMatched: false },
  { id: "D", content: "D", isMatched: false },
];

let initialMatchingAreas = [
  { id: "dropA", match: "A", isMatched: false },
  { id: "dropB", match: "B", isMatched: false },
  { id: "dropC", match: "C", isMatched: false },
  { id: "dropD", match: "D", isMatched: false },
];

const LetterDragAndDrop = () => {
  const [correctMatches, setCorrectMatches] = useState({});
  const [draggableLetters, setDraggableLetters] = useState(letters);
  const [matchingAreas, setMatchingAreas] = useState(initialMatchingAreas);
  const [isMounted, setIsMounted] = useState(false);
  const [showCongratulationMessage, setShowCongratulationMessage] =
    useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const destId = destination.droppableId;

    const correctMatch = matchingAreas.find(
      (area) => area.id === destId && area.match === draggableId
    );

    if (correctMatch) {
      // Update the array of correct matches
      setCorrectMatches((prev) => ({
        ...prev,
        [destId]: draggableId,
      }));

      // Update the isMatched property of the matching area
      setMatchingAreas((prev) =>
        prev.map((area) =>
          area.id === destId ? { ...area, isMatched: true } : area
        )
      );

      // Change the isMatched property of the draggable letter
      setDraggableLetters((prev) =>
        prev.map((letter) =>
          letter.id === draggableId ? { ...letter, isMatched: true } : letter
        )
      );

      // Show congratulations message
      setShowCongratulationMessage(true);

      setTimeout(() => {
        setShowCongratulationMessage(false);
      }, 2000);

      // Play sound
      const correctSound = new Audio("./sounds/correct-answer-sound.mp3");
      correctSound.play();
    } else {
      // Play sound
      const wrongSound = new Audio("./sounds/wrong-answer-sound.mp3");
      wrongSound.play();
    }
  };

  return (
    <div className="flex items-center justify-center pt-10 h-screen bg-[#FFD142]">
      <div className="w-full h-full">
        <h1 className="text-xl underline font-bold mb-4">
          Letter Drag And Drop
        </h1>

        <DragDropContext onDragEnd={onDragEnd}>
          {isMounted ? (
            <div className="flex gap-10 border py-10 px-10 min-h-[500px]">
              {showCongratulationMessage && (
                <p
                  className={` scale-down-center absolute top-52 transform left-1/2 -translate-x-1/2 bg-green-300 px-8 py-2 text-xl rounded-md font-bold `}
                >
                  Congratulations!
                </p>
              )}
              <div className="w-1/2">
                <Droppable droppableId="letters">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {draggableLetters
                        .filter((letter) => !letter.isMatched)
                        .map((letter, index) => (
                          <Draggable
                            key={letter.id}
                            draggableId={letter.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="  w-52 mt-2 flex gap-2 items-center border px-2 py-2 rounded-md hover:bg-gray-100"
                              >
                                <div className="w-4 h-4 rounded-full bg-red-300"></div>
                                <p>{letter.content}</p>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              <div className="w-1/2">
                <div className="flex items-start justify-between gap-x-4">
                  {matchingAreas.map((area) => (
                    <Droppable key={area.id} droppableId={area.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`text-4xl font-bold border flex-1 text-center ${
                            snapshot.isDraggingOver
                              ? "bg-gray-300 shadow-lg shadow-black"
                              : ""
                          } ${
                            area.isMatched ? "bg-green-400" : "text-red-400"
                          }`}
                        >
                          {correctMatches[area.id]
                            ? correctMatches[area.id]
                            : area.match}
                          {/* {provided.placeholder} */}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </DragDropContext>
        <footer>
          <h1>Drag and drop letters</h1>
        </footer>
      </div>
    </div>
  );
};

export default LetterDragAndDrop;
