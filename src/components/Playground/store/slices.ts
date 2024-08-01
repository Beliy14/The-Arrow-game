import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPlaygroungState } from "./types"
import { ARRAY_ARROW_CODES, MAP_ARROW_CODES } from "../constants"

const initialState: IPlaygroungState = {
  currentStep: 0,
  steps: [],
  totalSuccessful: 0,
  totalUnsuccessful: 0,
}

export const playgroundSlice = createSlice({
  name: "playground",
  initialState,
  reducers: {
    setCurrentStep: (state) => {
      state.currentStep += 1
    },

    setSteps: (state) => {
      const randomKeys = Math.floor(Math.random() * ARRAY_ARROW_CODES.length)

      state.steps.push({
        step: state.currentStep,
        currentValue: ARRAY_ARROW_CODES[randomKeys],
        enteredValue: null,
        success: null,
      })
    },

    setEnteredValue: (state, action: PayloadAction<string>) => {
      if (state.steps.length) {
        const step = state.steps[state.currentStep - 1]
        const isSuccess = step.currentValue === action.payload

        if (step.enteredValue === null) {
          state.steps[state.currentStep - 1] = {
            ...step,
            enteredValue: action.payload,
            success: isSuccess,
          }

          if (isSuccess) {
            state.totalSuccessful += 1
          } else {
            state.totalUnsuccessful += 1
            state.totalSuccessful = 0
          }
        }
      }
    },

    setUnsuccess: (state) => {
      if (state.steps.length) {
        const step = state.steps[state.currentStep - 1]

        if (step.enteredValue === null) {
          state.steps[state.currentStep - 1] = {
            ...step,
            success: false,
          }
          state.totalUnsuccessful += 1
          state.totalSuccessful = 0
        }
      }
    },

    resetState: () => initialState,
  },
})

export const { setCurrentStep, setSteps, setEnteredValue, setUnsuccess, resetState } = playgroundSlice.actions
export default playgroundSlice.reducer
