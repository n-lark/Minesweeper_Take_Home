import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { shuffleMineLocations } from "../utility/shuffleMineLocations";

type mineState = {
  show: boolean;
  isMine: boolean;
};

type squareState = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: mineState;
};

type squaresInitialState = {
  value: Array<Array<squareState>>;
};

const initialState = {
  value: [],
} as squaresInitialState;

type blankSquaresPayloadType = {
  numOfSquares: number;
  rowLength: number;
};

type blankSquaresActionType = {
  payload: blankSquaresPayloadType;
  type: string;
};

type deployMinesPayloadType = {
  numOfSquares: number;
  rowCurrent: number;
  columnCurrent: number;
  rowLength: number;
};

type deployMinesActionType = {
  payload: deployMinesPayloadType;
  type: string;
};

type markNumberOrBlankPayloadType = {
  rowCurrent: number;
  columnCurrent: number;
};

type markNumberOrBlankActionType = {
  payload: markNumberOrBlankPayloadType;
  type: string;
};

type flagOrUnflagMinePayloadType = {
  row: number;
  i: number;
};

type flagOrUnflagMineActionType = {
  payload: flagOrUnflagMinePayloadType;
  type: string;
};

export const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    generateBlankSquares: (
      state: squaresInitialState,
      action: blankSquaresActionType
    ) => {
      const squaresArray = [];
      let nestedArray = [];
      for (let i = 0; i < action.payload.numOfSquares; i++) {
        nestedArray.push({
          blank: false,
          flag: false,
          number: false,
          mine: { show: false, isMine: false },
        });
        if (nestedArray.length === action.payload.rowLength) {
          squaresArray.push(nestedArray);
          nestedArray = [];
        }
      }
      state.value.push(...squaresArray);
    },
    deployMines: (
      state: squaresInitialState,
      action: deployMinesActionType
    ) => {
      const flatArray = state.value.flat(Infinity);
      // Note for Xavyr: I used an any, forgive me. I am not sure how to type square. It should be squareState but that didn't work. I mentioned
      // this in my novel of typescript errors. I did go down the stackoverflow path and nothing I found was successful.
      const arrayWithMines = flatArray.map((square: any, index: number) => {
        if (index <= Math.floor(flatArray.length * 0.15)) {
          square.mine.isMine = true;
        }
        return square;
      });

      const shuffledSquares = shuffleMineLocations(
        arrayWithMines,
        action.payload.rowCurrent,
        action.payload.columnCurrent,
        action.payload.rowLength
      );

      state.value = shuffledSquares;
    },
    exposeMines: (state: squaresInitialState) => {
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
      state: squaresInitialState,
      action: markNumberOrBlankActionType
    ) => {
      const numberSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (
            state.value[action.payload.rowCurrent][
              action.payload.columnCurrent
            ] === piece
          ) {
            piece.number = true;
          }
          return piece;
        });
      });
      state.value = numberSquares;
    },
    markBlank: (
      state: squaresInitialState,
      action: markNumberOrBlankActionType
    ) => {
      const blankSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (
            state.value[action.payload.rowCurrent][
              action.payload.columnCurrent
            ] === piece
          ) {
            piece.blank = true;
          }
          return piece;
        });
      });
      state.value = blankSquares;
    },
    flagMine: (
      state: squaresInitialState,
      action: flagOrUnflagMineActionType
    ) => {
      const flagSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (state.value[action.payload.row][action.payload.i] === piece) {
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
      state: squaresInitialState,
      action: flagOrUnflagMineActionType
    ) => {
      const unflagSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (state.value[action.payload.row][action.payload.i] === piece) {
            piece.flag = false;
          }
          return piece;
        });
      });
      state.value = unflagSquares;
    },
    resetSquares: (state: squaresInitialState) => {
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
