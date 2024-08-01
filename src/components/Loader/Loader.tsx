import React from "react"
import "./loader.scss"

interface LoaderProps {
  isTimerActive: boolean
}

const Loader: React.FC<LoaderProps> = ({ isTimerActive }) => {
  return (
    <>
      {isTimerActive && 
        <div className="loader">
          <div className="loader-inner"></div>
        </div>
      }
    </>
  )
}

export default Loader
