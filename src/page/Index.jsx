import {useEffect, useState} from 'react'
import RegisterModel from "../components/model/RegisterModel.jsx";
import { useTranslation } from 'react-i18next';
import {Background} from "../components/Background/index.jsx";
import {updateViewportContent} from "../hooks/web-setting.js";

function Index() {

  const [registerModelVisible, setRegisterModelVisible] = useState(true);
  const closeRegisterModel = () => {
    setRegisterModelVisible(false)
  }

  useEffect(()=>{
    window.addEventListener('DOMContentLoaded', updateViewportContent)
    window.addEventListener('resize', updateViewportContent)
    return()=>{
      window.removeEventListener('DOMContentLoaded', updateViewportContent)
      window.removeEventListener('resize', updateViewportContent)
    }
  },[])

  return (
    <div className="w-full">
      <Background/>
      {registerModelVisible && (
        <RegisterModel close={closeRegisterModel}/>
      )}
    </div>
  )
}



export default Index
