import React from 'react'

const Input = ({ value, placeholder, type, id, onChange, name }) => {
    return (
        <input value={value} className='h-10 w-full border rounded-md p-2 outline-none mt-2'
            placeholder={placeholder} type={type} id={id} name={name} onChange={onChange} />

    )
}

export default Input