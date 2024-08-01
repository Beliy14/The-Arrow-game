import React from "react"
import { useAppSelector } from "../../../../app/hooks"
import { MAP_ARROW_CODES } from "../../constants"
import { IMapArrowCodes, IStepsState } from "../../store/types"
import "./randomKeys.scss"
import Loader from "../../../Loader/Loader"

interface RandomKeysProps {
  isTimerActive: boolean
}

const RandomKeys: React.FC<RandomKeysProps> = ({isTimerActive}) => {
  const { steps } = useAppSelector((state) => state.playground)

  const getStylesRundomKeys = (element: IStepsState) => {
    if (element.success && element.success !== null) {
      return "success"
    }
    if (element.success === false && element.success !== null) {
      return "unsuccess"
    }
  }

  return (
    <div className="randomKeys-body">
      <h4>Random keys:</h4>
      <p>Random arrows will be displayed here.</p>
      { steps.length === 0
        ? <Loader isTimerActive={isTimerActive} /> 
        : <div className="randomKeys-section">
        {steps?.map((step) => (
            <div className={getStylesRundomKeys(step)} key={step.step}>
              <span>{MAP_ARROW_CODES[step.currentValue as keyof IMapArrowCodes]}</span>
            </div>
          ))}
      </div>}
    </div>
  )
}

export default RandomKeys
