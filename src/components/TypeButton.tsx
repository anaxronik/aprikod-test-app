import React from 'react'

export interface ITypeButtonProps {
  title: string
  onClick?: () => void
  onCloseClick?: () => void
}

export default function TypeButton({
  title,
  onClick,
  onCloseClick,
}: ITypeButtonProps) {
  return (
    <span className="type" onClick={onClick}>
      {title}
      {onCloseClick ? (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onCloseClick()
          }}
        >
          X
        </button>
      ) : null}
    </span>
  )
}
