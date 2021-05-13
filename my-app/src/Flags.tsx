import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "./app/hooks";

type flagType = {
  color: number;
};

const Flags: React.FC = () => {
  const numOfFlags = useAppSelector((state) => state.flags.value);

  return (
    <StyledDiv color={numOfFlags}>
      <FontAwesomeIcon icon={faFlag} />
      <StyledFlag data-cy="flagCount">{numOfFlags}</StyledFlag>
    </StyledDiv>
  );
};

export { Flags };

// Note for Xavyr: I am confused by this TS error. Any put a bandaid on it. I used a similar pattern for my other styled components props and this one just hates me.
// I mentioned this in my novel of typescript errors. I suspect it has something to do with color having the inferred type "never", but it won't let me type it as
// number. I am terrible at typescript.

const StyledDiv: any = styled.div<flagType>`
  align-self: flex-end;
  padding: 10px 20px 10px 20px;
  color: ${({ color }) => (color > 0 ? `#595959` : `#cf3232`)};
  width: 75px;
  font-size: 18px;
`;

const StyledFlag = styled.span`
  font-weight: bold;
  padding-left: 10px;
`;
