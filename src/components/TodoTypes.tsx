import React, { useState } from 'react'

import { TodoType } from '../store/Todo/Todo'
import TypeButton from './TypeButton'
import { observer } from 'mobx-react-lite'

export interface ITodoTypesProps {
  types: TodoType[]
  createNewType: (title: string) => void
  removeTodoType: (id: string) => void
  selectedTypes: TodoType[]
  setSelectedTypes: (types: TodoType[]) => void
}

function TodoTypes({
  types,
  createNewType,
  removeTodoType,
  selectedTypes,
  setSelectedTypes,
}: ITodoTypesProps) {
  const [newType, setNewType] = useState<string>('')

  const addActiveType = (type: TodoType) => {
    if (selectedTypes.filter((t) => t.id === type.id).length === 0) {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const removeActiveType = (type: TodoType) => {
    setSelectedTypes([...selectedTypes.filter((t) => t.id !== type.id)])
  }

  return (
    <>
      <div>
        <h3>Выбранные типы</h3>
        <div className="add-todo__types">
          {selectedTypes.map((t) => (
            <TypeButton
              key={t.id}
              title={t.title}
              onClick={() => {
                removeActiveType(t)
              }}
            />
          ))}
        </div>
      </div>
      <div className="add-todo__add-type">
        <span>Добавить</span>
        <input
          type="text"
          value={newType}
          onChange={(e) => {
            setNewType(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              createNewType(newType)
              setNewType('')
            }
          }}
        />
      </div>

      <div className="add-todo__types">
        {types.map((t) => (
          <TypeButton
            key={t.id}
            title={t.title}
            onClick={() => {
              addActiveType(t)
            }}
            onCloseClick={() => {
              removeTodoType(t.id)
            }}
          />
        ))}
      </div>
    </>
  )
}

export default observer(TodoTypes)
