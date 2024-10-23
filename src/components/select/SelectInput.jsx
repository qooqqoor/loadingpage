import Input from "../input/Input.jsx";
import { useEffect, useRef, useState } from 'react'

import btnDown from '../../assets/button/popup_btn_arrow_down.png'
import log from "eslint-plugin-react/lib/util/log.js";

const SelectInput =
  ( {
      label,
      type,
      value,
      onChange,
      placeholder,
      optionList,
      currentType,
    } ) => {

    const [optionVisible, setOptionVisible] = useState(false)

    return (
      <div className={'relative w-full'} onClick={() => {
        setOptionVisible(!optionVisible)
      }}>
        <Input
          label={label}
          value={value}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={true}
          extra={
            <div className={'h-4.5 w-4.5  absolute right-5 top-[50%] translate-y-[-50%]'}>
              <img className={`w-full h-full ${optionVisible ? 'rotate-180' : 'rotate-0'} transition-all`} src={btnDown}/>
            </div>
          }
        />
          <div className={`transition-all py-2 px-4 absolute top-22 w-full max-h-[30vh] overflow-scroll bg-a19 z-1 ${optionVisible ? 'h-auto' : 'h-0 !py-0'}`} style={{zIndex:2}} >
            {optionList.map((item, index) => (
              <div onClick={() => onChange(item, currentType)} className={'text-sm py-2 '} id={index}>{item.name || item.value}</div>
            ))}
          </div>
      </div>
    )
  }

export default SelectInput;