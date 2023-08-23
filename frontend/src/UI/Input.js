// create a reusable input component using tailwind css
import React from 'react';

const Input = ({ label, input, type, meta: { touched, error } }) => {
    return (
        <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={input.name}>
                {label}
            </label>
            <input {...input} type={type} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            {touched && error && <p className='text-red-500 text-xs italic'>{error}</p>}
        </div>
    );
}

export default Input;