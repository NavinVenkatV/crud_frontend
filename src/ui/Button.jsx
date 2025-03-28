import React from 'react'

function Button({ text, onCreateClick, onDeleteClick, onUpdateClick }) {


  const handleClick = () => {
    if(text === "Create"){
        onCreateClick();
    }
    if(text === "Delete"){
        onDeleteClick();
    }
    if(text === "Update"){
        onUpdateClick();
    }
  }

  return (
    <div
      onClick={handleClick}
      className='px-3 py-2 mx-2 hover:bg-neutral-500 rounded-2xl bg-neutral-700 cursor-pointer'
    >
      {text}
    </div>
  )
}

export default Button