import React from "react"
import { MAP_ARROW_CODES } from "../../constants"
import { setEnteredValue } from "../../store/slices"
import { useAppDispatch } from "../../../../app/hooks"
import { useKeyPressedElement } from "./hooks"
import './keyPressed.scss'

interface KeyPressedProps {
  isTimerActive: boolean,
  speedTimeout: number
}

const KeyPressed: React.FC<KeyPressedProps> = ({ isTimerActive, speedTimeout }) => {
  const dispatch = useAppDispatch()

  const [activeTimeAnimation, setActiveTimeAnimation] = React.useState(true)

  const keyPressedElement = useKeyPressedElement()

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (MAP_ARROW_CODES.hasOwnProperty(event.key) && isTimerActive) {
        dispatch(setEnteredValue(event.key))
        setActiveTimeAnimation(false)
        setTimeout(() => setActiveTimeAnimation(true), speedTimeout)
      }
    },
    [dispatch, isTimerActive]
  )

  React.useEffect(() => {
    if (isTimerActive) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isTimerActive])

  return (
    <div className="keyPressed-body">
      <h4>Your key:</h4>
      <p>Press the keys that appear on the display.</p>
      <span className={isTimerActive && activeTimeAnimation ? 'anim' : ''}>{keyPressedElement}</span>
    </div>
  )
}

export default KeyPressed
