import React from "react"
import "./playground.scss"
import Controls from "./components/Contrtols/Controls"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setCurrentStep, setSteps, setUnsuccess } from "./store/slices"
import { END_GAME, MEDIUM_SPEED_TIME} from "./constants"
import RandomKeys from "./components/RandomKeys/RandomKeys"
import KeyPressed from "./components/KeyPressed/KeyPressed"
import Score from "./components/Score/Score"
import Modal from "../Modal/Modal"

const Playground: React.FC = () => {
  const dispatch = useAppDispatch()

  const { totalSuccessful, totalUnsuccessful } = useAppSelector((state) => state.playground)

  const [isTimerActive, setIsTimerActive] = React.useState<boolean>(false)
  const [isShowModal, setIsShowModal] = React.useState<boolean>(false)
  const [isSuccessEndGame, setIsSuccessEndGame] = React.useState<boolean>(false)
  const [speedTimeout, setSpeedTimeout] = React.useState(MEDIUM_SPEED_TIME)

  const refIntervalId = React.useRef<ReturnType<typeof setInterval> | null>(null)

  React.useEffect(() => {
    if (isTimerActive) {
      refIntervalId.current = setInterval(() => {
        dispatch(setUnsuccess())
        dispatch(setCurrentStep())
        dispatch(setSteps())
      }, speedTimeout)
    } else {
      clearInterval(refIntervalId.current as NodeJS.Timeout)
    }

    return () => {
      clearInterval(refIntervalId.current as NodeJS.Timeout)
    }
  }, [isTimerActive, dispatch])

  React.useEffect(() => {
    const isSuccessful = totalSuccessful === END_GAME.SUCCESS_COUNT
    const isUnsuccessful = totalUnsuccessful === END_GAME.UNSUCCESS_COUNT

    if (isSuccessful) {
      setIsSuccessEndGame(true)
      setIsShowModal(true)
      setIsTimerActive(false)
    }
    if (isUnsuccessful) {
      setIsSuccessEndGame(false)
      setIsShowModal(true)
      setIsTimerActive(false)
    }
  }, [totalSuccessful, totalUnsuccessful])

  return (
    <div className="playground-body">
      <div className="left-section">
        <RandomKeys isTimerActive={isTimerActive} />
        <KeyPressed isTimerActive={isTimerActive} speedTimeout={speedTimeout} />
        <Score />
      </div>

      <div className="right-section">
        <Controls isTimerActive={isTimerActive} setIsTimerActive={setIsTimerActive} speedTimeout={speedTimeout} setSpeedTimeout={setSpeedTimeout} />
      </div>

      {isShowModal && isSuccessEndGame && <Modal children="You win!" isSuccessEndGame={isSuccessEndGame} setIsShowModal={setIsShowModal} />}
      {isShowModal && !isSuccessEndGame && <Modal children="Game over." isSuccessEndGame={isSuccessEndGame} setIsShowModal={setIsShowModal} />}
    </div>
  )
}

export default Playground
