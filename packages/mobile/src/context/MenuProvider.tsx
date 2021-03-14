import React, { FC, useState } from 'react'
import menuContext from './menuContext'

const MenuProvider: FC<{}> = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <menuContext.Provider
      value={{
        isOpen,
        setIsOpen: (value) => {
          if (!value) {
            setTimeout(() => {
              setIsOpen(value)
            }, 10) // To prevent layered touchables from being touched
          } else {
            setIsOpen(value)
          }
        },
      }}
    >
      {props.children}
    </menuContext.Provider>
  )
}

export default MenuProvider
