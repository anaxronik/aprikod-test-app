import React from 'react'

export interface ITextAreaProps {
  title: string
  text: string
  onChange: (text: string) => void
  className?: string
  name?: string
}

export default function TextArea({
  title,
  text,
  onChange,
  className = 'textarea',
  name = 'textarea',
}: ITextAreaProps) {
  return (
    <>
      <label className={className + '__label'} htmlFor={name}>
        {title}
      </label>
      <textarea
        className={className + '__textarea'}
        name={name}
        value={text}
        onChange={(e) => {
          onChange(e.target.value)
        }}
      ></textarea>
    </>
  )
}
