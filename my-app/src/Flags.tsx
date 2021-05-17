import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "./app/hooks";

type FlagType = {
  numFlags: number;
};

const Flags: React.FC = () => {
  const numOfFlags = useAppSelector((state) => state.flags.value);

  return (
    <StyledDiv numFlags={numOfFlags}>
      <FontAwesomeIcon icon={faFlag} />
      <StyledFlag data-cy="flagCount">{numOfFlags}</StyledFlag>
    </StyledDiv>
  );
};

export { Flags };

const StyledDiv = styled.div<FlagType>`
  align-self: flex-end;
  padding: 10px 20px 10px 20px;
  color: ${({ numFlags }) => (numFlags > 0 ? `#595959` : `#cf3232`)};
  width: 75px;
  font-size: 18px;
`;

const StyledFlag = styled.span`
  font-weight: bold;
  padding-left: 10px;
`;
