import React from 'react';
import { Link } from "react-router-dom";

export const GameStart: React.FC = () => {
  return (
    <>
    <div>This is game start</div>
    <Link to="./Game">
      <button>Play Game</button>
    </Link>
    </>
  )

}