import React from "react";
import { useAppSelector } from "./app/hooks";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

type flagType = {
  color: number;
};

const Flags: React.FC = () => {
  const numOfFlags = useAppSelector((state) => state.flags.value);

  return (
    <StyledDiv color={numOfFlags}>
      <FontAwesomeIcon icon={faFlag} />
      <StyledFlag>{numOfFlags}</StyledFlag>
    </StyledDiv>
  );
};

export { Flags };

// need to fix any here

const StyledDiv: any = styled.div<flagType>`
  align-self: flex-end;
  padding: 10px 20px 10px 20px;
  color: ${({ color }) => (color >= 0 ? `#595959` : `#cf3232`)};
  width: 75px;
  font-size: 18px;
`;

const StyledFlag = styled.span`
  font-weight: bold;
  padding-left: 10px;
`;
