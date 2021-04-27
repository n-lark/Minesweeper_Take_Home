import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../src/app/hooks";
import { distributeMines } from "./features/squaresSlice";
import { useAppDispatch } from "./app/hooks";
import { exposeMines } from "./features/squaresSlice";
// import { Square } from "./Square";

export const Grid: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const squares = useAppSelector((state) => state.squares.value);
  const dispatch = useAppDispatch();

  const initialClick = () => {
    if (stage === 0) {
      dispatch(distributeMines());
      setStage(1);
    }
  };

  const secondaryClick = (id: number) => {
    if (stage > 0) {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].mine.isMine && id === squares[i].id) {
          console.log("BOOM");
          return dispatch(exposeMines());
        }
        if (!squares[i].mine.isMine) {
          console.log("omg wtf");
        }
      }
    }
  };

  return (
    <StyledWrapper>
      <StyledGrid>
        {squares.map((square, index) => {
          return (
            <StyledDiv
              key={index}
              onClick={() => {
                initialClick();
                secondaryClick(square.id);
              }}
            >
              {square.mine.show && <FontAwesomeIcon icon={faBomb} />}
              {square.flag && <FontAwesomeIcon icon={faFlag} />}
              {square.number && null}
            </StyledDiv>
          );
        })}
      </StyledGrid>
    </StyledWrapper>
  );
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 30px));
  border: 0.5px solid lightgray;
  > div {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledDiv = styled.div`
  border: 0.5px solid lightgrey;
`;

const StyledWrapper = styled.div`
  margin: auto;
`;

// the grid will render the appropriate amount of squares, squares should have props to indicate the color(or image) for styled comps,
// like this color: ${(props) => props.color}
