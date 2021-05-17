import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { shuffleMineLocations } from "../utility/shuffleMineLocations";

type SquareType = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: { show: boolean; isMine: boolean };
};

type SquaresInitialState = {
  value: Array<Array<SquareType>>;
};

const initialState = {
  value: [],
} as SquaresInitialState;

type BlankSquaresPayloadType = {
  payload: { numOfSquares: number; rowLength: number };
  type: string;
};

type DeployMinesPayloadType = {
  payload: {
    numOfSquares: number;
    rowCurrent: number;
    columnCurrent: number;
    rowLength: number;
  };
  type: string;
};

type MarkNumberOrBlankPayloadType = {
  payload: { rowCurrent: number; columnCurrent: number };
  type: string;
};

type FlagOrUnflagMinePayloadType = {
  payload: { row: number; i: number };
  type: string;
};

export const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    generateBlankSquares: (
      state: SquaresInitialState,
      action: BlankSquaresPayloadType
    ) => {
      const { numOfSquares, rowLength } = action.payload;
      const squaresArray = [];
      let nestedArray = [];
      for (let i = 0; i < numOfSquares; i++) {
        nestedArray.push({
          blank: false,
          flag: false,
          number: false,
          mine: { show: false, isMine: false },
        });
        if (nestedArray.length === rowLength) {
          squaresArray.push(nestedArray);
          nestedArray = [];
        }
      }
      state.value.push(...squaresArray);
    },
    deployMines: (
      state: SquaresInitialState,
      action: DeployMinesPayloadType
    ) => {
      const { rowCurrent, columnCurrent, rowLength } = action.payload;
      const flatArray = state.value.flat();
      const arrayWithMines = flatArray.map(
        (square: SquareType, index: number) => {
          if (index <= Math.floor(flatArray.length * 0.15)) {
            square.mine.isMine = true;
          }
          return square;
        }
      );

      const shuffledSquares = shuffleMineLocations(
        arrayWithMines,
        rowCurrent,
        columnCurrent,
        rowLength
      );

      state.value = shuffledSquares;
    },
    exposeMines: (state: SquaresInitialState) => {
      const minesExposed = state.value.map((square) => {
        return square.map((piece) => {
          if (piece.mine.isMine) {
            piece.mine.show = true;
            piece.flag = false;
          }
          return piece;
        });
      });
      state.value = minesExposed;
    },
    markNumber: (
      state: SquaresInitialState,
      action: MarkNumberOrBlankPayloadType
    ) => {
      const { rowCurrent, columnCurrent } = action.payload;
      const numberSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (state.value[rowCurrent][columnCurrent] === piece) {
            piece.number = true;
          }
          return piece;
        });
      });
      state.value = numberSquares;
    },
    markBlank: (
      state: SquaresInitialState,
      action: MarkNumberOrBlankPayloadType
    ) => {
      const { rowCurrent, columnCurrent } = action.payload;
      const blankSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (state.value[rowCurrent][columnCurrent] === piece) {
            piece.blank = true;
          }
          return piece;
        });
      });
      state.value = blankSquares;
    },
    flagMine: (
      state: SquaresInitialState,
      action: FlagOrUnflagMinePayloadType
    ) => {
      const { row, i } = action.payload;
      const flagSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (state.value[row][i] === piece) {
            piece.number = false;
            piece.flag = true;
            piece.blank = false;
          }
          return piece;
        });
      });
      state.value = flagSquares;
    },
    unFlagMine: (
      state: SquaresInitialState,
      action: FlagOrUnflagMinePayloadType
    ) => {
      const { row, i } = action.payload;
      const unflagSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (state.value[row][i] === piece) {
            piece.flag = false;
          }
          return piece;
        });
      });
      state.value = unflagSquares;
    },
    resetSquares: (state: SquaresInitialState) => {
      state.value = [];
    },
  },
});

export const {
  generateBlankSquares,
  resetSquares,
  deployMines,
  exposeMines,
  markNumber,
  markBlank,
  flagMine,
  unFlagMine,
} = squaresSlice.actions;

export const selectSquares = (state: RootState) => state.squares.value;

export const squaresSliceReducer = squaresSlice.reducer;
