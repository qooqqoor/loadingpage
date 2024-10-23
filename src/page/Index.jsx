import {useEffect, useState} from 'react'
import RegisterModel from "../components/model/RegisterModel.jsx";
import { useTranslation } from 'react-i18next';
import {Background} from "../components/background/index.jsx";
import {onGestureStart, updateViewportContent} from "../hooks/web-setting.js";
import {QrcodeModal} from "../components/qrcode-modal/index.jsx";
import {RegisterSuccessModal} from "../components/registerSuccessModal/index.jsx";

function Index() {

  const [registerModelVisible, setRegisterModelVisible] = useState(true);
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [registerSuccessModalVisible, setRegisterSuccessModalVisible] = useState(false);
  const mediaQueryList = window.matchMedia('(orientation: landscape)')

  const closeRegisterModel = () => {
    setRegisterModelVisible(false)
  }

  useEffect(()=>{
    updateViewportContent()
    window.addEventListener('DOMContentLoaded', updateViewportContent)
    window.addEventListener('resize', updateViewportContent)
    mediaQueryList.addEventListener('change', updateViewportContent)
    document.body.addEventListener('gesturestart', onGestureStart)
    return()=>{
      window.removeEventListener('DOMContentLoaded', updateViewportContent)
      window.removeEventListener('resize', updateViewportContent)
      mediaQueryList.removeEventListener('change', updateViewportContent)
      document.body.removeEventListener('gesturestart', onGestureStart)

    }
  },[])

  return (
    <div className="w-full">
      <Background setQrCodeVisible={setQrCodeVisible} setRegisterModelVisible={setRegisterModelVisible}/>
      <QrcodeModal qrCodeVisible={qrCodeVisible} setQrCodeVisible={setQrCodeVisible}/>
      {registerModelVisible && (
        <RegisterModel close={closeRegisterModel}/>
      )}
      <RegisterSuccessModal registerSuccessModalVisible={registerSuccessModalVisible} setRegisterSuccessModalVisible={setRegisterSuccessModalVisible}/>
    </div>
  )
}



export default Index
