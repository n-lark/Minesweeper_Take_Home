import React from "react";
import { useAppSelector } from "./app/hooks";
import styled from "styled-components";
import { formatTime } from "./utility/formatTime";

const Timer: React.FC = () => {
  const time = useAppSelector((state) => state.timer.value);

  return <StyledDiv>{formatTime(time)}</StyledDiv>;
};

export { Timer };

const StyledDiv = styled.div`
  align-self: flex-end;
  padding: 20px 20px 0px 0px;
  color: grey;
  width: 75px;
  font-size: 18px;
`;
