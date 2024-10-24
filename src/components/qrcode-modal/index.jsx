import {Modal} from "../model/index.jsx";
import {useTranslation} from "react-i18next";
import QRCode from "react-qr-code";
import {isIos} from "../../hooks/web-setting.js";

const QrcodeModal = ({qrCodeVisible, setQrCodeVisible, appDownLoadWeb}) =>{
  const { t} = useTranslation();

  const qrcodeWeb =  isIos ?appDownLoadWeb.iosAppDownloadUrl:　appDownLoadWeb.androidAppDownloadUrl



  return <Modal visible={qrCodeVisible} closeMaskCancel onCancel={()=>setQrCodeVisible(false)} animationType={'fadeIn'}>
    <div className={'relative w-[200px] flex flex-col items-center justify-center'}>
      <div className={'w-full relative  '}>
        <div className={'pt-[7.5px] pb-[5.5px] text-[16px] leading-[19px] text-[#FFFFFF] w-full flex items-center justify-center rounded-tr-[12px] rounded-tl-[12px]'} style={{background: 'linear-gradient(to right, #EF71EA, #9563F9)'}}>{t('downloadLottery9')}</div>
        <div className={'h-[200px] w-full flex items-center justify-center rounded-br-[12px] rounded-bl-[12px] bg-[#FFFFFF]'}>
          <QRCode
            size={150}
            style={{ height: "auto", maxWidth: "152px", width: "100%" }}
            value={qrcodeWeb}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
      <img src={`/images/common/btn_close.png`} className={'mt-[16px] h-[32px] w-[32px]'} alt="" draggable="false" onClick={()=>{setQrCodeVisible(false)}}/>
    </div>
  </Modal>
}

export {QrcodeModal}


