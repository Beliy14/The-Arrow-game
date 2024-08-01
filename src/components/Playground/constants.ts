import { IEndGame, IMapArrowCodes } from "./store/types"

export const FAST_SPEED_TIME: number = 1000
export const MEDIUM_SPEED_TIME: number = 2000
export const SLOW_SPEED_TIME: number = 3000

export const MAP_ARROW_CODES: IMapArrowCodes = {
    ArrowUp: "⬆️",
    ArrowDown: "⬇️",
    ArrowLeft: "⬅️",
    ArrowRight: "➡️",
}

export const ARRAY_ARROW_CODES = Object.keys(MAP_ARROW_CODES)

export const END_GAME: IEndGame = {
    SUCCESS_COUNT: 3,
    UNSUCCESS_COUNT: 3,
}