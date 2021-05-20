import React from 'react'
import { observer } from 'mobx-react-lite'
import { TodoType } from '../store/Todo'
import TypeButton from './TypeButton'

export interface ITodoFilter {
  filters: TodoType[]
  removeFilter: (id: string) => void
  filteresTodoCount: number
}

function TodoFilter({ filters, removeFilter, filteresTodoCount }: ITodoFilter) {
  return (
    <>
      {filters.length !== 0 ? (
        <>
          <h3>Показанны только {filteresTodoCount} шт</h3>
          <div>
            {filters.map((f) => (
              <TypeButton
                key={f.id}
                title={f.title}
                onCloseClick={() => {
                  removeFilter(f.id)
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <h3>Показанны все</h3>
      )}
    </>
  )
}

export default observer(TodoFilter)
