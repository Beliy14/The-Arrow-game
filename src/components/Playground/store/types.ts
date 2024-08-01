export interface IStepsState {
  currentValue: string | null
  enteredValue: string | null
  step: number
  success: boolean | null
}

export interface IPlaygroungState {
  currentStep: number
  steps: IStepsState[]
  totalSuccessful: number
  totalUnsuccessful: number
}

export interface IMapArrowCodes {
  ArrowUp: string
  ArrowDown: string
  ArrowLeft: string
  ArrowRight: string
}

export interface IEndGame {
  SUCCESS_COUNT: number,
  UNSUCCESS_COUNT: number
}
