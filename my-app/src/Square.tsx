// import React from "react";
// import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";

// type square = {
//   blank: boolean;
//   flag: boolean;
//   number: boolean;
//   mine: boolean;
// };

// type index = {
//   index: number;
// };

// export const Square: React.FC = (square: square, index: index) => {
//   return (
//     <StyledDiv key={index} onClick={null}>
//       {square.mine && <FontAwesomeIcon icon={faBomb} />}
//       {square.flag && <FontAwesomeIcon icon={faFlag} />}
//       {square.number && null}
//     </StyledDiv>
//   );
// };

// const StyledDiv = styled.div`
//   border: 0.5px solid lightgrey;
// `;
