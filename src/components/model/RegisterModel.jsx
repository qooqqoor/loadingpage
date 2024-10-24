import { useEffect, useRef, useState } from 'react'
import apiRequest from "../../hooks/apis/apiInterceptors.js";
import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";
import SelectInput from "../select/SelectInput.jsx";
import { Modal } from "./index.jsx";
import { useTranslation } from "react-i18next";

import eyeClose from '../../assets/button/login_btn_eye_close.png'
import eyeOpen from '../../assets/button/login_btn_eye_open.png'
import closeImg from '../../assets/button/popup_btn_close.png'
import plusImg from '../../assets/button/anchor_btn_add.png'

const RegisterModel = ( { close, registerModelVisible,setRegisterSuccessModalVisible } ) => {
  const { t, i18n } = useTranslation();

  const passRef = useRef(null)
  const [step, setStep] = useState('1');
  const [area, setArea] = useState([]);
  const [frontendIDImage, setFrontendIDImage] = useState(null);
  const [backendIDImage, setBackendIDImage] = useState(null);
  const [headshotImage, setHeadshotmage] = useState(null);
  const [gender, setGender] = useState([]);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputRules, setInputRules] = useState({});
  const [inputRulesText, setInputRulesText] = useState({});
  const [phoneExist, setPhoneExist] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    country: '',
    phone: '',
    password: '',
    email: '',
    nickname: '',
    gender: '',
    realname: '',
    idCode: '',
    frontIDUrl: '',
    backIDUrl: '',
    headshotUrl: '',
    phoneCode: ''
  });
  const [validRegisterStep1, setValidRegisterStep1] = useState({
    phoneCode: false,
    phone: false,
    password: false,
    email: false,
    nickname: false,
    gender: false,
  });

  const [validRegisterStep2, setValidRegisterStep2] = useState({
    realname: false,
    idCode: false,
    frontIDUrl: false,
    backIDUrl: false,
    headshotUrl: false
  });


  useEffect(() => {
    getContextInfo()
    getGender()
    getDoRegister()

  }, [])

  const registerModelClose =() =>{
    setRegisterInfo({
      country: '',
      phone: '',
      password: '',
      email: '',
      nickname: '',
      gender: '',
      realname: '',
      idCode: '',
      frontIDUrl: '',
      backIDUrl: '',
      headshotUrl: '',
      phoneCode: ''
    })
    setValidRegisterStep1({
      phoneCode: false,
      phone: false,
      password: false,
      email: false,
      nickname: false,
      gender: false,
    })
    setValidRegisterStep2({
      realname: false,
      idCode: false,
      frontIDUrl: false,
      backIDUrl: false,
      headshotUrl: false
    })
    setStep('1')
    setFrontendIDImage(null)
    setBackendIDImage(null)
    setHeadshotmage(null)
    close()
  }

  const getDoRegister = async () => {
    const res = await apiRequest('get', 'api/user/app/passport/doRegister.html');
    if (res.success) {
      setInputRules(res.jsonValid.rules)
      setInputRulesText(res.jsonValid.messages)
    }
  }


  useEffect(() => {
    if (!!passRef.current) {
      if (isShowPassword) {
        passRef.current.type = 'text'
      } else {
        passRef.current.type = 'password'
      }
    }
  }, [isShowPassword])

  const handleCapture = async ( event, pic ) => {
    const file = event.target.files[0]; // 獲取用戶拍攝的圖片
    if (file && file.size > 2 * 1024 * 1024) {  // 檢查文件大小是否超過 2MB
      alert(t('fileSizeLimit'));
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (pic === 'frontendID') {
          setFrontendIDImage(reader.result); // 將圖片設置到狀態中
        } else if (pic === 'backendID') {
          setBackendIDImage(reader.result); // 將圖片設置到狀態中
        } else if (pic === 'headshot') {
          setHeadshotmage(reader.result)
        }
      };
      reader.readAsDataURL(file); // 讀取文件並將其轉換為數據 URL

      const formData = new FormData();
      formData.append('file', file); // 將文件添加到 FormData 中
      try {
        const response = await apiRequest('post', `/api/user/file/upload.html?objId=objId&catePath=anchorManagement`, formData);

        if (response.success) {
          if (pic === 'frontendID') {
            setRegisterInfo({ ...registerInfo, frontIDUrl: response.model })
            setValidRegisterStep2({ ...validRegisterStep2, frontIDUrl: true })
          } else if (pic === 'backendID') {
            setRegisterInfo({ ...registerInfo, backIDUrl: response.model })
            setValidRegisterStep2({ ...validRegisterStep2, backIDUrl: true })
          } else if (pic === 'headshot') {
            setRegisterInfo({ ...registerInfo, headshotUrl: response.model })
            setValidRegisterStep2({ ...validRegisterStep2, headshotUrl: true })
          }
          console.log(':', response.data);
        }


      } catch (error) {
        alert(error)

        console.error(':', error);
      }

    }
  };
  const getContextInfo = async () => {
    const res = await apiRequest('post', '/api/user/context/contextInfo.html');
    if (res.success) {
      const result = Object.keys(res.region).map(key => ({
        key: key,
        value: res.callingcode[key],
        name: `${res.region[key]} ${res.callingcode[key]}`
      })).filter(item => item.value !== undefined); // 過濾掉找不到對應代碼的國家
      setArea(result)

    }
  }

  const getGender = async () => {
    const res = await apiRequest('get', '/api/user/app/passport/initDict.html');
    if (res.success) {
      const genderArray = Object.keys(res.dicts.sex).map(key => {
        return { key: key, value: res.dicts.sex[key] };
      });
      setGender(genderArray)
    }
  }

  const selectHandleChange = ( e, type = null ) => {
    const parmas = {}
    //這邊也是一次階段驗證
    if (type === 'phoneCode') {
      validate('phoneCode', e.value, inputRules.cellPhone.callingCode)
      parmas['country'] = e.key
    } else if (type === 'gender') {
      setValidRegisterStep1({ ...validRegisterStep1, gender: !!e.value ? true : false })
    }


    parmas[type] = e.value
    setRegisterInfo({ ...registerInfo, ...parmas });
  }

  const handleChange = ( e, type = null ) => {
    const val = e.target.value;
    const parmas = {}
    setPhoneExist(null)
    //一次階段驗證
    if (type === 'phone') {
      validate('phone', val, inputRules.cellPhone.pattern)
    } else if (type === 'password') {
      validate('password', val, inputRules.password.pattern)
    } else if (type === 'nickname') {
      validate('nickname', val, inputRules.nickname.pattern)
    } else if (type === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      validate('email', val, emailRegex)
    }

    //第二階段驗證 後端驗證API沒給正則 先有值就過
    else if (type === 'realname') {
      setValidRegisterStep2({ ...validRegisterStep2, realname: !!val ? true : false })
    } else if (type === 'idCode') {
      setValidRegisterStep2({ ...validRegisterStep2, idCode: !!val ? true : false })
    }

    parmas[type] = val
    setRegisterInfo({ ...registerInfo, ...parmas });
  }

  const validate = ( type, val, reg ) => {
    const validParam = {}
    const regex = new RegExp(reg);
    validParam[type] = regex.test(val)
    setValidRegisterStep1({ ...validRegisterStep1, ...validParam })
  }
  const showPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const omSubmit = async () => {
    const res = await apiRequest('post', '/api/user/app/passport/anchorRegisterQuickly.html',
      {
        "realName": registerInfo.realname,
        "password": registerInfo.password,
        "idCardFrontUrl": registerInfo.frontIDUrl,
        "idCard": registerInfo.idCode,
        "sex": registerInfo.gender,
        "nickname": registerInfo.nickname,
        "phoneCode": registerInfo.phoneCode,
        "halfPhotoUrl": registerInfo.headshotUrl,
        "phoneNum": registerInfo.phone,
        "idCardBackUrl": registerInfo.backIDUrl,
        "email": registerInfo.email,
        "country": registerInfo.country
      });
    if (res.success){
      setRegisterSuccessModalVisible(true)
      registerModelClose()
    }
  }

  const goStep2 = async () => {
    //這個API沒辦法搓 很奇怪
    const formData = new FormData();

    formData.append('callingCode', registerInfo.phoneCode);
    formData.append('cellPhone', registerInfo.phone);
    const res = await apiRequest('post', '/api/user/app/passport/cellPhoneExistsForRegister.html',formData)
    if(!!res){
      setStep('2')
    }else {
    setPhoneExist(inputRulesText.cellPhone.remote)
  }
}


  const Photos = ( { image, id, altText } ) => {
    return (
      <div className={'flex-1 border-dashed border-2 border-e10 rounded-1'}>
        {!image && (
          <label htmlFor={id} className=" h-24 bg-e08 flex justify-center items-center flex-col">
            <img className={'h-5 w-5 mb-1'} src={plusImg}/>
            <div className={'text-sm'}>{altText}</div>
          </label>
        )}
        {image && (
          <label htmlFor={id}>
            <img  src={image} alt="Captured" className="m-auto flex-1 h-24 "/>
          </label>
        )}
        <input
          id={id}
          type="file"
          accept="image/jpeg, image/png"
          onChange={event => handleCapture(event, id)}
          className={'hidden'}
        />
      </div>
    )
  }
  if (area.length === 0) return

  return (
    <Modal visible={registerModelVisible} closeMaskCancel onCancel={()=>registerModelClose()} animationType={'fadeIn'} className={'w-80'}>
    <div className={'z-2 flex justify-center items-center'}>
      <div className=" relative p-6 bg-e01 w-80 h-auto rounded-2 flex flex-col justify-center items-center ">
        <div className={'w-7 h-7 bg-e03 rounded-1 absolute right-4 top-4 flex justify-center items-center'}
             onClick={registerModelClose}>
          <img className={'w-3 h-3'} src={closeImg}/>
        </div>
        <div id="title" className="font-bold text-lg py-1 mb-4">{t('becomeHost')}</div>
        <div className="bg-e10 w-full h-[1px] mb-2"></div>
        <div className={'w-full max-h-[60vh] h-auto overflow-scroll'}>
          {step === '1' && (
            <div id="step1" className="w-full ">

              <SelectInput
                label={t('countryRegion')}
                value={area.find(e =>e.value === registerInfo.phoneCode)?.name || ''}
                type={'text'}
                currentType={'phoneCode'}
                onChange={selectHandleChange}
                placeholder={t('pleaseSelect')}
                optionList={area}
              />
              <Input
                label={t('phoneNumber')}
                value={registerInfo.phone}
                type={'tel'}
                onChange={e => handleChange(e, 'phone')}
                placeholder={t('pleaseEnterPhoneNumber')}
                pattern={inputRules.cellPhone?.pattern}
                patternText={!validRegisterStep1.phone && registerInfo.phone && inputRulesText.cellPhone.pattern}
                errorText={phoneExist}
              />
              <Input
                label={t('password')}
                value={registerInfo.password}
                type={isShowPassword ? 'text' : 'password'}
                onChange={e => handleChange(e, 'password')}
                placeholder={t('pleaseEnterPassword')}
                extra={
                  <div className={'h-4.5 w-4.5  absolute right-5 top-[50%] translate-y-[-50%]'} onClick={showPassword}>
                    <img className={'w-full h-full'} src={isShowPassword ? eyeOpen : eyeClose}/>
                  </div>
                }
                pattern={inputRules.password?.pattern}
                patternText={!validRegisterStep1.password && registerInfo.password && inputRulesText.password.pattern}
              />
              <Input
                label={t('nickname')}
                value={registerInfo.nickname}
                type={'text'}
                onChange={e => handleChange(e, 'nickname')}
                placeholder={t('pleaseEnterNickname')}
                pattern={inputRules.nickname?.pattern}
                maxLength={inputRules.nickname?.maxlength}
                minLength={inputRules.nickname?.minlength}
                patternText={!validRegisterStep1.nickname && registerInfo.nickname && inputRulesText.nickname.maxlength}
              />
              <SelectInput
                label={t('gender')}
                value={registerInfo.gender}
                type={'text'}
                currentType={'gender'}
                onChange={selectHandleChange}
                placeholder={t('pleaseSelectGender')}
                optionList={gender}
              />
              <Input
                label={t('email')}
                value={registerInfo.email}
                type={'email'}
                onChange={e => handleChange(e, 'email')}
                placeholder={t('pleaseEnterEmail')}
                pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                patternText={!validRegisterStep1.email && registerInfo.email && t('emailErrorMessage')}
              />

              <Button
                text={t('nextStep')}
                validObj={validRegisterStep1}
                onClick={() => goStep2()}
              />

            </div>

          )}
        {step === '2' && (
          <div id="step1" className="w-full ">
            <Input
              label={t('realName')}
              value={registerInfo.realname}
              type={'text'}
              onChange={e => handleChange(e, 'realname')}
              placeholder={t('pleaseEnterRealName')}
            />

            <Input
              label={t('idNumber')}
              value={registerInfo.idCode}
              type={'text'}
              onChange={e => handleChange(e, 'idCode')}
              placeholder={t('pleaseEnterIdNumber')}
            />

            <label className="text-sm">{t('uploadIdInfo')}</label>
            <div className="flex gap-2 my-2">
              <Photos
                image={frontendIDImage}
                id={'frontendID'}
                altText={t('frontSide')}
              />
              <Photos
                image={backendIDImage}
                id={'backendID'}
                altText={t('backSide')}
              />
            </div>
            <label className="text-sm">{t('closeUpPhoto')}</label>
            <div className="flex  my-2">
              <Photos
                image={headshotImage}
                id={'headshot'}
                altText={''}
              />
            </div>
            <div className={'text-xs'}>
              {t('uploadRules')}
              <br/>
              {`1. ${t('supportedFormats')}`}
              <br/>
              {`2. ${t('fileSizeLimit')}`}
            </div>

            <Button
              text={t('register')}
              validObj={validRegisterStep2}
              onClick={() => omSubmit()}
            />
          </div>
        )}
      </div>
      </div>
    </div>
    </Modal>
  )
}

export default RegisterModel;
