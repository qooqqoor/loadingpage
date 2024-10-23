import { useEffect, useRef, useState } from 'react'
import './input.css'

const Input =
  ( {
      label,
      type,
      value,
      onChange,
      extra,
      placeholder,
      readOnly = false
    } ) => {
    return (
      <>
        <label className="text-sm">{label}</label>
        <div className={'relative'}>
          <input className="w-full my-1.5 px-2 h-11 bg-e08 rounded-1" type={type}
                 value={value}
                 onChange={onChange}
                 placeholder={placeholder}
                 readOnly={readOnly}
          />
          {extra && (extra)}

        </div>
      </>
    )
  }

export default Input