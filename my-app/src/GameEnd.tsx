import React from "react"
import { Link } from "react-router-dom";


export const GameEnd: React.FC = () => {
  return (
    <>
    <Link to="./">
      <button>Play Again</button>
    </Link>
    </>
  )
}