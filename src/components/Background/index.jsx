import {useTranslation} from "react-i18next";
import {useState} from "react";

const Background = () =>{
  const { t, i18n } = useTranslation();
  const {language} = i18n

  return <div className={'w-full bg-[#181B21] '}>
    <div className={'w-full  relative  max-w-[375px] mx-auto '}>
      <div className={'relative w-full'}>
        <img src={`/images/${language}/img01.png`} className={'w-full h-auto '} alt="" draggable="false"/>
        <LangButton/>
       <div className={'z-1 absolute w-full pb-[20%] translate-y-[-100%]'}>
         <div className={'absolute left-[1.86%] bottom-0 w-auto h-full cursor-pointer'}>
           <img src={`/images/${language}/btn_registeranchor.png`} className={'h-full w-full '} alt="" draggable="false"/>
         </div>
         <div className={'absolute right-[1.86%] bottom-0 w-auto h-full cursor-pointer'}>
           <img src={`/images/${language}/btn_download.png`} className={'h-full w-full '} alt="" draggable="false"/>
         </div>
       </div>
      </div>
      <img src={`/images/${language}/img02.png`} className={'w-full h-auto '} alt="" draggable="false"/>
      <img src={`/images/${language}/img03.png`} className={'w-full h-auto '} alt="" draggable="false"/>
      <img src={`/images/${language}/img04.png`} className={'w-full h-auto '} alt="" draggable="false"/>

      <div className={'fixed bottom-0 w-full max-w-[375px]'}>
        <div className={'absolute bottom-0 translate-y-[calc(-208%)] right-[2.13%] w-[16%] max-w-[91.04px] h-auto cursor-pointer'}>
          <img src={`/images/common/btn_customer.png`} className={'h-full w-full '} alt="" draggable="false"/>
        </div>
        <div className={'absolute bottom-0 translate-y-[calc(-98.3%)] right-[2.13%] w-[16%] max-w-[91.04px] h-auto cursor-pointer'}>
          <img src={`/images/common/btn_qrcode.png`} className={'h-full w-full '} alt="" draggable="false"/>
        </div>

        <div className={'relative w-full'}>
          <img src={`/images/common/img_footer_bg.png`} className={'w-full h-auto '} alt="" draggable="false"/>
          <div className={'absolute bottom-0 left-0 w-full h-[95%]  flex items-center justify-center '} >
            <div className={'w-[7.467%] h-auto mr-[1.6%] cursor-pointer'}>
              <img src={`/images/common/img_footer_logo.png`} className={'h-full w-full   '} alt="" draggable="false"/>
            </div>
            <div className={'cursor-pointer font-bold text-[#333333] mr-[4.2%] text-[14px] leading-[17px]'}>
              www.Lottery9.com
            </div>

            <div className={'w-[7.467%] h-auto mr-[1.6%] cursor-pointer'}>
              <img src={`/images/common/img_footer_telegram.png`} className={'h-full w-full  '} alt="" draggable="false"/>
            </div>
            <div className={'cursor-pointer font-bold text-[#333333] text-[14px] leading-[17px]'}>
              MIKE959577
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

const LangButton = () =>{
  const { t, i18n } = useTranslation();
  const {language} = i18n
  const [show,setShow] = useState(false)
  return(
    <div
      className={'absolute flex items-center justify-center z-1 right-[5.3%] top-[2.6%] px-[12px] py-[7px] rounded-full overflow-visible'}
      style={{
        background: 'linear-gradient(135deg, #FEB000, #F26221)',
        border: '2px #FFFFFF solid',

    }}
    onClick={()=>setShow(e=>!e)}
    >
      <p className={' text-[#FFFFFF] text-[12px] leading-[14.5px] mr-[14px] font-bold'}>{language}</p>
      <img src={show?`/images/common/btn_arrow_open.png`:`/images/common/btn_arrow_close.png`} className={'h-auto  w-[12px] '} alt="" draggable="false"/>

      <div className={'absolute bottom-[-28.4%] rounded-[14px] py-[7px] w-full  translate-y-[100%]  bg-[rgba(255,255,255,0.8)]'}>
          <div className={'w-full text-center py-[5px] font-bold text-[#333333] text-[12px] leading-[14.5px]'}>CN</div>
          <div className={'w-full text-center py-[5px] font-bold text-[#333333] text-[12px] leading-[14.5px]'}>EN</div>
          <div className={'w-full text-center py-[5px] font-bold text-[#333333] text-[12px] leading-[14.5px]'}>TL</div>
      </div>
    </div>
  )
}

export {Background}
