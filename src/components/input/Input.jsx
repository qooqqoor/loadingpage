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
      pattern,
      patternText,
      maxLength,
      minLength,
      errorText
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
                 maxLength={maxLength}
                 minLength={minLength}
          />
          {extra && (extra)}

        </div>
        <div className={`${patternText ? 'h-auto opacity-100' : 'h-0'} opacity-0 transition-all text-xs text-[#FF0000]`}>{patternText}</div>
        <div className={`${errorText ? 'h-auto opacity-100' : 'h-0'} opacity-0 transition-all text-xs text-[#FF0000]`}>{errorText}</div>

      </div>
    )
  }

export default Input