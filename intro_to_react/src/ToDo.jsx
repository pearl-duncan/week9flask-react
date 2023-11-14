import React, { Component } from 'react'

export default function ToDo({ toDo, addToDo }) {

  const showToDoList = () => {
    if (toDo) {
      return toDo.map((text)=>{
      return <li>{text}</li>
    })
    }
  }

  return (
    <div className='text-center p-4'>
      <form onSubmit={addToDo}>
        <input placeholder='enter what you want to do' name='toDo' />
        <button>+</button>
      </form>
      <h1>To Do:</h1>
      <ul>
        {showToDoList()}
      </ul>
    </div>
  )
}

