import {Modal} from "../model/index.jsx";
import {useTranslation} from "react-i18next";

const RegisterSuccessModal = ({registerSuccessModalVisible,setRegisterSuccessModalVisible}) =>{
  const { t } = useTranslation();
  return (
    <Modal closeMaskCancel visible={registerSuccessModalVisible}>
      <div className={'relative w-[327px] h-[249px] p-[24px] rounded-[8px] flex bg-[#F8F8F6] items-center flex-col justify-center'}>
        <div className={'w-full flex-1 flex items-center justify-center flex-col'}>
          <div className={'font-bold text-[18px] leading-[24px] text-[#242426]'}>{t("registrationSuccess")}</div>
          <div className={'mt-[9.5px] text-[14px] leading-[16.5px] text-[#242426] text-center'}>{t("auditResultSent")}</div>
        </div>
        <div className={'w-full h-[44px] rounded-[8px] flex items-center justify-center text-[#FCFBFB]'} style={{background: 'linear-gradient(to top, #FF724E, #FF3A9A)'
        }} onClick={()=>{setRegisterSuccessModalVisible(false)}}>
          {t("confirm")}
        </div>
        <div className={'z-1 absolute top-[8px] right-[8px] h-[28px] w-[28px] flex items-center justify-center'} onClick={()=>{setRegisterSuccessModalVisible(false)}}>
          <img src={`/images/common/btn_modal_close.png`} className={'h-full w-full'} alt="" draggable="false" />

        </div>
      </div>
    </Modal>
  )
}

export {RegisterSuccessModal}
