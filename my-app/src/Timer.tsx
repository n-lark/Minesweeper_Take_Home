import React from "react";
import { useAppSelector } from "./app/hooks";
import styled from "styled-components";
import { formatTime } from "./utility/formatTime";

const Timer: React.FC = () => {
  const time = useAppSelector((state) => state.timer.value);

  return <StyledDiv data-cy="timer">{formatTime(time)}</StyledDiv>;
};

export { Timer };

const StyledDiv = styled.div`
  align-self: flex-end;
  padding: 20px 20px 10px 0px;
  color: #595959;
  width: 75px;
  font-size: 18px;
`;
