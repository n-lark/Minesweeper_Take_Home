import React from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import styled from "styled-components";
import { closeModal } from "./features/rulesModalSlice";

type modalType = {
  show: boolean;
};

const RulesModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modalControl = useAppSelector((state) => state.rulesModal.value);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <StyledModal show={modalControl} onClick={handleClose}>
      <StyledModalContainer>
        <StyledModalHeading>How to play</StyledModalHeading>
        <StyledModalRulesList>
          <StyledModalRulesLi>
            The goal of minesweeper is to open all cells that do not contain a
            mine. The game will end if a cell that contains a mine is opened. A
            cell is opened by clicking on it. The first click of the game cannot
            be a mine.{" "}
          </StyledModalRulesLi>
          <StyledModalRulesLi>
            Once clicked, each cell will show as blank, as a number or as a
            mine. The number indicates the number of mines touching that cell. A
            blank cell indicates no mines are touching that cell.
          </StyledModalRulesLi>
          <StyledModalRulesLi>
            Cells that are suspected to contain a mine can be flagged. A cell
            can be flagged with <StyledBoldSpan>shift + click</StyledBoldSpan>,
            and can be unflagged with{" "}
            <StyledBoldSpan>shift + click</StyledBoldSpan>.{" "}
          </StyledModalRulesLi>
          <StyledModalRulesLi>
            The game is successfully won once all squares not containing a mine
            have been opened.
          </StyledModalRulesLi>
        </StyledModalRulesList>
      </StyledModalContainer>
    </StyledModal>
  );
};

export { RulesModal };

const StyledModal = styled.div<modalType>`
  z-index: 2;
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const StyledModalContainer = styled.div`
  margin: 5px;
  position: fixed;
  background: white;
  width: 500px;
  height: 350px;
  padding: 10px;
  box-shadow: 5px 3px 3px lightgrey;
  color: #595959;
`;

const StyledModalHeading = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  font-family: "Work Sans", sans-serif;
`;

const StyledModalRulesList = styled.ul`
  margin-left: 10px;
  padding: 0px 10px 0px 10px;
  font-size: 16px;
  font-family: "Work Sans", sans-serif;
`;

const StyledModalRulesLi = styled.li`
  padding: 5px;
`;

const StyledBoldSpan = styled.span`
  font-weight: bold;
`;
