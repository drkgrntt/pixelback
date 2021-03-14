import { createContext } from 'react'

type MenuContext = {
  isOpen: boolean
  setIsOpen: (
    initialState: boolean | ((currentState: boolean) => boolean)
  ) => void
}

export default createContext<MenuContext>({
  isOpen: false,
  setIsOpen: (isOpen) => {},
})
