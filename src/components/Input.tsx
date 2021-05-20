import React from 'react'

export interface IInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  className: string
  name: string
}

export default function Input({
  label,
  value,
  onChange,
  className,
  name,
}: IInputProps) {
  return (
    <>
      <label className={className + '__label'} htmlFor={name}>
        {label}
      </label>
      <input
        className={className + '__input'}
        type="text"
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
      />
    </>
  )
}
