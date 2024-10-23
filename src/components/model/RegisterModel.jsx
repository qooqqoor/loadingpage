import { useEffect, useRef, useState } from 'react'
import apiRequest from "../../hooks/apis/apiInterceptors.js";
import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";
import SelectInput from "../select/SelectInput.jsx";
import { Modal } from "./index.jsx";

import eyeClose from '../../assets/button/login_btn_eye_close.png'
import eyeOpen from '../../assets/button/login_btn_eye_open.png'
import closeImg from '../../assets/button/popup_btn_close.png'
import plusImg from '../../assets/button/anchor_btn_add.png'

const RegisterModel = ( { close, registerModelVisible } ) => {
  const passRef = useRef(null)
  const [step, setStep] = useState('1');
  const [area, setArea] = useState([]);
  const [frontendIDImage, setFrontendIDImage] = useState(null);
  const [backendIDImage, setBackendIDImage] = useState(null);
  const [headshotImage, setHeadshotmage] = useState(null);
  const [gender, setGender] = useState([]);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputRules, setInputRules] = useState({});
  const [registerInfo, setRegisterInfo] = useState({
    country: '',
    phone: null,
    password: '',
    email: '',
    nickname: '',
    gender: '',
    realname: null,
    idCode: null,
    frontIDUrl: null,
    backIDUrl: null,
    headshotUrl: null,
    phoneCode: ''
  });
  console.log(registerInfo,'registerInfo')
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

  const getDoRegister = async () => {
    const res = await apiRequest('get', 'api/user/app/passport/doRegister.html');
    if (res.success) {
      setInputRules(res.jsonValid.rules)
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
          console.log('上傳成功:', response.data);
        }


      } catch (error) {
        console.error('上傳失敗:', error);
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

  const selectHandleChange = (e, type = null ) =>{
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
    //一次階段驗證
    if (type === 'phone') {
      validate('phone', val, inputRules.cellPhone.pattern)
    }  else if (type === 'password') {
      validate('password', val, inputRules.cellPhone.password)
    } else if (type === 'nickname') {
      validate('nickname', val, inputRules.cellPhone.nickname)
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
    console.log(res)
  }


  const Photos = ( { image, id, altText } ) => {
    return (
      <div className={'flex-1 border-dashed border-2 border-e10 rounded-1'}>
        {!image && (
          <label htmlFor={id} className=" h-24 bg-e08 flex justify-center items-center flex-col">
            <img className={'h-5 w-5'} src={plusImg}/>
            <div>{altText}</div>
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
          accept="image/*"
          onChange={event => handleCapture(event, id)}
          className={'hidden'}
        />
      </div>
    )
  }
  if (area.length === 0) return

  return (
    <Modal visible={registerModelVisible} closeMaskCancel onCancel={()=>close} animationType={'fadeIn'} className={'w-80'}>
    <div className={'fixed top-0 right-0 left-0 bottom-0 z-2 flex justify-center items-center'}>
      <div className=" relative p-6 bg-e01 w-80 h-auto rounded-2 flex flex-col justify-center items-center ">
        <div className={'w-7 h-7 bg-e03 rounded-1 absolute right-4 top-4 flex justify-center items-center'}
             onClick={close}>
          <img className={'w-3 h-3'} src={closeImg}/>
        </div>
        <div id="title" className="font-bold text-lg py-1 mb-4">成為主播</div>
        <div className="bg-e10 w-full h-[1px] mb-2"></div>
          {step === '1' && (
            <div id="step1" className="w-full ">

              <SelectInput
                label={'國家和地區'}
                value={area.find(e =>e.value === registerInfo.phoneCode)?.name || ''}
                type={'text'}
                currentType={'phoneCode'}
                onChange={selectHandleChange}
                placeholder={'請選擇'}
                optionList={area}
              />
              <Input
                label={'手機號'}
                value={registerInfo.phone}
                type={'tel'}
                onChange={e => handleChange(e, 'phone')}
                placeholder={'请输入手机号'}
                pattern={inputRules.cellPhone.pattern}
              />
              <Input
                label={'密碼'}
                value={registerInfo.password}
                type={isShowPassword ? 'text' : 'password'}
                onChange={e => handleChange(e, 'password')}
                placeholder={'请输入密码'}
                extra={
                  <div className={'h-4.5 w-4.5  absolute right-5 top-[50%] translate-y-[-50%]'} onClick={showPassword}>
                    <img className={'w-full h-full'} src={isShowPassword ? eyeOpen : eyeClose}/>
                  </div>
                }
              />
              <Input
                label={'暱稱'}
                value={registerInfo.nickname}
                type={'text'}
                onChange={e => handleChange(e, 'nickname')}
                placeholder={'请输入昵称'}
              />
              <SelectInput
                label={'性別'}
                value={registerInfo.gender}
                type={'text'}
                currentType={'gender'}
                onChange={selectHandleChange}
                placeholder={'請選擇性別'}
                optionList={gender}
              />
              <Input
                label={'郵箱'}
                value={registerInfo.email}
                type={'email'}
                onChange={e => handleChange(e, 'email')}
                placeholder={'請輸入郵箱'}
              />

              <Button
                text={'下一步'}
                validObj={validRegisterStep1}
                onClick={() => setStep('2')}
              />

            </div>

          )}
        {step === '2' && (
          <div id="step1" className="w-full ">
            <Input
              label={'真實姓名'}
              value={registerInfo.realname}
              type={'text'}
              onChange={e => handleChange(e, 'realname')}
              placeholder={'请输入真实姓名'}
            />

            <Input
              label={'證件號碼'}
              value={registerInfo.idCode}
              type={'text'}
              onChange={e => handleChange(e, 'idCode')}
              placeholder={'请输入证件号码'}
            />

            <label className="">上傳身分證信息</label>
            <div className="flex gap-2 my-2">
              <Photos
                image={frontendIDImage}
                id={'frontendID'}
                altText={'正面'}
              />
              <Photos
                image={backendIDImage}
                id={'backendID'}
                altText={'反面'}
              />
            </div>
            <label className="">近身照片,请提供正面面部照片</label>
            <div className="flex  my-2">
              <Photos
                image={headshotImage}
                id={'headshot'}
                altText={''}
              />
            </div>

            <Button
              text={'註冊'}
              validObj={validRegisterStep2}
              onClick={() => omSubmit()}
            />
          </div>
        )}
      </div>
    </div>
    </Modal>
  )
}

export default RegisterModel;
