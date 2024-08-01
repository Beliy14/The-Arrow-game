import React from "react"
import "./modal.scss"
import { resetState } from "../Playground/store/slices"
import { useAppDispatch } from "../../app/hooks"

interface ModalProps {
  children: string
  isSuccessEndGame: boolean
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = ({ children, isSuccessEndGame, setIsShowModal }) => {
  const dispatch = useAppDispatch()

  const closeModal = () => {
    setIsShowModal(false)
    dispatch(resetState())
  }

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      closeModal()
    }
  })

  return (
    <div className={isSuccessEndGame ? "modal-overlay win" : "modal-overlay over"}>
      <div className="modal-content">
        <button onClick={closeModal} className="close-button">×</button>
        <p>{children} Start the game again.</p>
        <button onClick={closeModal} className={isSuccessEndGame ? "start-game win" : "start-game over"}>
          Start new game
        </button>
      </div>
    </div>
  )
}

export default Modal
