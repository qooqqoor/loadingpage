import {useEffect, useState} from 'react'
import RegisterModel from "../components/model/RegisterModel.jsx";
import { useTranslation } from 'react-i18next';
import {Background} from "../components/background/index.jsx";
import {onGestureStart, updateViewportContent} from "../hooks/web-setting.js";
import {QrcodeModal} from "../components/qrcode-modal/index.jsx";
import {RegisterSuccessModal} from "../components/registerSuccessModal/index.jsx";
import apiRequest from "../hooks/apis/apiInterceptors.js";

function Index() {

  const [registerModelVisible, setRegisterModelVisible] = useState(false);
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [registerSuccessModalVisible, setRegisterSuccessModalVisible] = useState(false);
  const [appDownLoadWeb, setAppDownLoadWeb] = useState({
    androidAppDownloadUrl: "",
    iosAppDownloadUrl: ""
  });
  const mediaQueryList = window.matchMedia('(orientation: landscape)')

  const closeRegisterModel = () => {
    setRegisterModelVisible(false)
  }

  const getAppDownloadUrl = async () => {
    const res = await apiRequest('get', '/api/user/anchor/appDownloadUrl.html');
    if (res.success) {
      setAppDownLoadWeb(res.model)
    }
  }

  useEffect(()=>{
    getAppDownloadUrl()
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
      <Background setQrCodeVisible={setQrCodeVisible} setRegisterModelVisible={setRegisterModelVisible} appDownLoadWeb={appDownLoadWeb}/>
      <QrcodeModal qrCodeVisible={qrCodeVisible} setQrCodeVisible={setQrCodeVisible} appDownLoadWeb={appDownLoadWeb}/>
      <RegisterModel
        close={closeRegisterModel}
        registerModelVisible={registerModelVisible}
        setRegisterSuccessModalVisible={setRegisterSuccessModalVisible}
      />
      <RegisterSuccessModal
        registerSuccessModalVisible={registerSuccessModalVisible}
        setRegisterSuccessModalVisible={setRegisterSuccessModalVisible}
      />
    </div>
  )
}



export default Index
