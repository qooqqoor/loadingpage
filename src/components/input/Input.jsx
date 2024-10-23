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
      readOnly = false,
      pattern
    } ) => {
    return (
      <div className={'w-full'}>
        <label className="text-sm">{label}</label>
        <div className={'relative z-0'}>
          <input className="w-full my-1.5 px-2 h-11 bg-e08 rounded-1 transition-all" type={type}
                 value={value}
                 onChange={onChange}
                 placeholder={placeholder}
                 readOnly={readOnly}
                 pattern={pattern}
          />
          {extra && (extra)}

        </div>
      </div>
    )
  }

export default Input