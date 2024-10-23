import { useEffect, useRef, useState } from 'react'
import './input.css'

const Input =
  ( {
      label,
      type,
      value,
      onChange,
      extra,
      ref,
      currentType = null,
      placeholder
    } ) => {
    return (
      <>
        <label className="text-sm">{label}</label>
        <div className={'relative'}>
          <input ref={ref} className="w-full my-1.5 px-2 h-11 bg-e08 rounded-1" type={type}
                 value={value}
                 onChange={onChange}
                 placeholder={placeholder}
          />
          {extra && (extra)}
          {currentType && (
            <></>
            // <div className={'h-4.5 w-4.5  absolute right-5 top-[50%] translate-y-[-50%]'} onClick={showPassword}>
            //   <img className={'w-full h-full'} src={isShowPassword ? eyeOpen : eyeClose}/>
            // </div>
          )}
        </div>
      </>
    )
  }

export default Input