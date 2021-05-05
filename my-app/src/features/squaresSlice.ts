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
  value: squareState[][];
};

const initialState = {
  value: [],
} as squaresInitialState;

export const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    generateBlankSquares: (state, action) => {
      let squaresArray = [];
      let nestedArray = [];
      for (let i = 0; i < action.payload.squaresNum; i++) {
        if (i <= Math.floor(action.payload.squaresNum * 0.15)) {
          nestedArray.push({
            blank: false,
            flag: false,
            number: false,
            mine: { show: false, isMine: true },
          });
        }
        if (i > Math.floor(action.payload.squaresNum * 0.15)) {
          nestedArray.push({
            blank: false,
            flag: false,
            number: false,
            mine: { show: false, isMine: false },
          });
        }
        if (nestedArray.length === action.payload.basis) {
          squaresArray.push(nestedArray);
          nestedArray = [];
        }
      }
      const shuffledSquares = shuffleMineLocations(squaresArray);
      state.value.push(...shuffledSquares);
    },
    shuffleMines: (state, action) => {
      state.value = shuffleMineLocations(
        state.value,
        action.payload.row,
        action.payload.index
      );
    },
    exposeMines: (state) => {
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
    markNumber: (state, action) => {
      const numberSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (state.value[action.payload.row][action.payload.index] === piece) {
            piece.number = true;
          }
          return piece;
        });
      });
      state.value = numberSquares;
    },
    markBlank: (state, action) => {
      const blankSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (state.value[action.payload.row][action.payload.index] === piece) {
            piece.blank = true;
          }
          return piece;
        });
      });
      state.value = blankSquares;
    },
    markBlankTEST: (state, action) => {
      const blankSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (
            state.value[action.payload.rowToDispatch][
              action.payload.indexToDispatch
            ] === piece
          ) {
            piece.blank = true;
          }
          return piece;
        });
      });
      state.value = blankSquares;
    },
    markNumberTEST: (state, action) => {
      const numberSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (
            state.value[action.payload.rowToDispatchNUM][
              action.payload.indexToDispatchNUM
            ] === piece
          ) {
            piece.number = true;
          }
          return piece;
        });
      });
      state.value = numberSquares;
    },
    flagMine: (state, action) => {
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
    unFlagMine: (state, action) => {
      const flagSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (state.value[action.payload.row][action.payload.i] === piece) {
            piece.flag = false;
          }
          return piece;
        });
      });
      state.value = flagSquares;
    },
    // collapseBlankSquares: (state, action) => {

    // },
    resetSquares: (state) => {
      state.value = [];
    },
  },
});

export const {
  generateBlankSquares,
  resetSquares,
  shuffleMines,
  exposeMines,
  markNumber,
  markBlank,
  flagMine,
  unFlagMine,
  markBlankTEST,
  markNumberTEST,
  // collapseBlankSquares,
} = squaresSlice.actions;

export const selectSquares = (state: RootState) => state.squares.value;

export const squaresSliceReducer = squaresSlice.reducer;
