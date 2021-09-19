import { useContext, useState } from 'react';
// -- types ----------------------------------------------------------------------------------------

import { IArtboardProps } from '../../@types/artboard';
import { ArtBoardContext } from '../../context/ArtBoardContext';

import Monitor from '../../components/Monitor';

// -- stylesheet -----------------------------------------------------------------------------------

import './Artboard.scss';
import ArtboardHandler from './ArtboardHandler';
import { ArtboardTurtleSketch } from './ArtboardTurtle';

// -- view component definition --------------------------------------------------------------------

// import { ArtboardSketch, boardSketch } from './ArtboardSketch';

/**
 * Exposes the helper buttons to move the turtle and calls the artBoardSketch mutliple times and
 * artBoardTurleSketch once.
 * @returns root JSX element
 */
export default function (props: IArtboardProps): JSX.Element {
  // list of all artboards generated by the user.
  const { artBoardList } = useContext(ArtBoardContext);
  // state to keep track of the current artboard turtle
  const [doArc, setDoArc] = useState(false);

  const [doClean, setDoClean] = useState(false);

  const moveTurtleInArc = () => setDoArc(true);

  const performClean = () => setDoClean(true);

  // register the performClean method to the Monitor to connect this with the menu dock
  Monitor.registerArtboardClean(performClean);
  const [doMove, setDoMove] = useState(false);
  const [doRotate, setDoRotate] = useState(false);
  const moveTurtleForward = () => setDoMove(true);
  const rotateTurtle = () => setDoRotate(true);
  // Only the selected turtle from the list will move
  const [selectedTurtle, setSelectedTurtle] = useState(1);
  // object to change the direction, angle and speed of the turtle
  const [turtleMoveSettings, setTurtleMoveSettings] = useState({
    arcRadius: 5,
    arcAngle: 90,
    sleepTime: 10,
    steps: 5,
    moveDirection: 'forward',
    distance: 50,
    moveSleepTime: 50,
    rotateAngle: 180,
  });
  const handleTurtleSelect = (i: number) => {
    setSelectedTurtle(i);
  };

  return (
    <>
      {artBoardList.map((artboard, index) => (
        <button
          value={artboard._id}
          onClick={() => handleTurtleSelect(artboard._id)}
          style={{ position: 'absolute', top: 21 * index, zIndex: 1000 }}
        >{`Turtle ${artboard._id}`}</button>
      ))}
      <button style={{ position: 'absolute', left: 100, zIndex: 1000 }}></button>
      <button style={{ position: 'absolute', left: 100, zIndex: 1000 }} onClick={moveTurtleInArc}>
        Arc
      </button>
      <button style={{ position: 'absolute', left: 150, zIndex: 1000 }} onClick={moveTurtleForward}>
        Move
      </button>
      <button style={{ position: 'absolute', left: 220, zIndex: 1000 }} onClick={rotateTurtle}>
        Rotate
      </button>
      <div id="artboard-wrapper">
        <h4>Artboard {`(${props.dimensions[0]} × ${props.dimensions[1]})`}</h4>
        {artBoardList.map((board) => (
          <ArtboardHandler
            doArc={doArc}
            doClean={doClean}
            setDoArc={setDoArc}
            setDoClean={setDoClean}
            doMove={doMove}
            setDoMove={setDoMove}
            doRotate={doRotate}
            setDoRotate={setDoRotate}
            key={board._turtle._id}
            index={board._id}
            turtle={board._turtle}
            updateDimensions={props.updateDimensions}
            turtleSettings={turtleMoveSettings}
            selectedTurtle={selectedTurtle}
          />
        ))}
        <ArtboardTurtleSketch artBoardList={artBoardList} />
      </div>
    </>
  );
}
