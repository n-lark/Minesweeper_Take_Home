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

//FOR SHAME USING ANY, fix this
const StyledDiv: any = styled.div<flagType>`
  align-self: flex-end;
  padding: 10px 20px 0px 20px;
  color: ${(props: flagType) => (props.color >= 0 ? `grey` : `#cf3232`)};
  width: 75px;
`;

const StyledFlag = styled.span`
  font-weight: bold;
  padding-left: 10px;
`;
