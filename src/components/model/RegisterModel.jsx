import { useEffect, useRef, useState } from 'react'
import apiRequest from "../../hooks/apis/apiInterceptors.js";
import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";
import SelectInput from "../select/SelectInput.jsx";

import eyeClose from '../../assets/button/login_btn_eye_close.png'
import eyeOpen from '../../assets/button/login_btn_eye_open.png'
import closeImg from '../../assets/button/popup_btn_close.png'
import plusImg from '../../assets/button/anchor_btn_add.png'

const RegisterModel = ( { close } ) => {
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
  });

  const [validRegisterStep1, setValidRegisterStep1] = useState({
    country: false,
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
        console.log(response, 'response')

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
  console.log(validRegisterStep2, 'validRegisterStep2')
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

  const handleChange = ( e, type = null ) => {
    const val = e.target.value;
    const parmas = {}
    if (type === 'phone') {
      validate('phone', val, inputRules.cellPhone.pattern)
    } else if (type === 'country') {
      validate('country', val, inputRules.cellPhone.callingCode)
    } else if (type === 'password') {
      validate('password', val, inputRules.cellPhone.password)
    } else if (type === 'nickname') {
      validate('nickname', val, inputRules.cellPhone.nickname)
    } else if (type === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      validate('email', val, emailRegex)
    } else if (type === 'gender') {
      setValidRegisterStep1({ ...validRegisterStep1, gender: !!val ? true : false })
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
        "phoneCode": registerInfo.country,
        "halfPhotoUrl": registerInfo.headshotUrl,
        "phoneNum": registerInfo.phone,
        "idCardBackUrl": registerInfo.backIDUrl,
        "email": registerInfo.email
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
          <img src={image} alt="Captured" className="m-auto flex-1 h-24 "/>
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
    <div className={'fixed top-0 right-0 left-0 bottom-0 z-2 flex justify-center items-center'}>
      <div className=" relative p-6 bg-e01 w-80 h-auto rounded-2 flex flex-col justify-center items-center ">
        <div className={'w-7 h-7 bg-e03 rounded-1 absolute right-4 top-4 flex justify-center items-center'}
             onClick={close}>
          <img className={'w-3 h-3'} src={closeImg}/>
        </div>
        <div id="title" className="font-bold text-lg py-1 mb-4">成為主播</div>
        <div className="bg-e10 w-full h-[1px] mb-2"></div>
        <form>
          {step === '1' && (
            <div id="step1" className="w-full ">

              <SelectInput
                label={'國家和地區'}
                value={registerInfo.country}
                type={'text'}
                onChange={e => handleChange(e, 'country')}
                placeholder={'請選擇'}
              />

              <label className="text-sm">國家和地區</label>
              <select value={registerInfo.country} onChange={e => handleChange(e, 'country')}
                      className="w-full my-2 px-2 h-11 bg-e08">
                <option key={0} value={''}>請選擇</option>
                {area.map(( item, index ) => {
                  return (
                    <option key={index + 1} value={item.value}>{item.name}</option>
                  )
                })}
              </select>

              <Input
                label={'手機號'}
                value={registerInfo.phone}
                type={'tel'}
                onChange={e => handleChange(e, 'phone')}
                placeholder={'请输入手机号'}
              />
              <Input
                label={'密碼'}
                value={registerInfo.password}
                type={isShowPassword ? 'text' : 'password'}
                onChange={e => handleChange(e, 'password')}
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

              <label className="text-sm">性別</label>
              <select className="w-full my-2 px-2 h-11 bg-e08" value={registerInfo.gender}
                      onChange={e => handleChange(e, 'gender')}>
                <option key={0} value={''}>請選擇性別</option>
                {/* 預設空值或提示 */}
                {gender.map(( item, index ) => (
                  <option key={index + 1} value={item.value}>{item.value}</option>
                ))}
              </select>

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
        </form>
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
  )
}

export default RegisterModel;
