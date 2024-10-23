import { useEffect, useRef, useState } from 'react'
import apiRequest from "../../hooks/apis/apiInterceptors.js";
import Input from "../input/Input.jsx";

import eyeClose from '../../assets/button/login_btn_eye_close.png'
import eyeOpen from '../../assets/button/login_btn_eye_open.png'
import closeImg from '../../assets/button/popup_btn_close.png'
import plusImg from '../../assets/button/anchor_btn_add.png'

const RegisterModel = ( { close } ) => {
  const passRef = useRef(null)
  const [step, setStep] = useState(null);
  const [area, setArea] = useState([]);
  const [frontendIDImage, setFrontendIDImage] = useState(null);
  const [backendIDImage, setBackendIDImage] = useState(null);
  const [headshotImage, setHeadshotmage] = useState(null);
  const [gender, setGender] = useState([]);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    country: '',
    phone: null,
    password: '',
    email: '',
    nickname: '',
    gender: '',
    realname: null,
    idCode: null,
  });

  useEffect(() => {
    setStep("1")
    getContextInfo()
    getGender()
    getDoRegister()
  }, [])

  const getDoRegister = async () =>{
    const res = await apiRequest('get', 'api/user/app/passport/doRegister.html');
    console.log(res)
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
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await apiRequest('post', `/api/user/file/upload.html?objId=objId&catePath=anchorManagement`, formData);

        console.log('上傳成功:', response.data);
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

  const handleChange = ( e, type = null ) => {
    const parmas = {}
    parmas[type] = e.target.value;

    setRegisterInfo({ ...registerInfo, ...parmas });

  }
  const showPassword = () => {
    setIsShowPassword(!isShowPassword)
  }



  const Photos = ( { image, id, altText } ) => {
    return (
      <div className={'flex-1 border-dashed border-2 border-e10 rounded-1'}>
        {!image && (
          <label htmlFor={id} className=" h-24 bg-e08 flex justify-center items-center flex-col">
            <img className={'h-5 w-5'} src={plusImg} />
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
    <div className="relative p-6 bg-e01 w-80 h-auto rounded-2 flex flex-col justify-center items-center ">
      <div className={'w-7 h-7 bg-e03 rounded-1 absolute right-4 top-4 flex justify-center items-center'} onClick={close}>
        <img className={'w-3 h-3'} src={closeImg}/>
      </div>
      <div id="title" className="font-bold text-lg py-1 mb-4">成為主播</div>
      <div className="bg-e10 w-full h-[1px] mb-2"></div>

      {step === '1' && (
        <div id="step1" className="w-full ">
          <label className="text-sm">國家和地區</label>
          <select value={registerInfo.country} onChange={e => handleChange(e, 'country')}
                  className="w-full my-2 px-2 h-11 bg-e08">
            {area.map(( item, index ) => {
              return (
                <option key={index} value={item.value}>{item.name}</option>
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
          {/*<Input*/}
          {/*  label={'密碼'}*/}
          {/*  ref={passRef}*/}
          {/*  value={registerInfo.password}*/}
          {/*  type={'password'}*/}
          {/*  onChange={e => handleChange(e, 'password')}*/}
          {/*  extra={*/}
          {/*    <div className={'h-4.5 w-4.5  absolute right-5 top-[50%] translate-y-[-50%]'} onClick={showPassword}>*/}
          {/*      <img className={'w-full h-full'} src={isShowPassword ? eyeOpen : eyeClose}/>*/}
          {/*    </div>*/}
          {/*  }*/}
          {/*/>*/}
          <label className="">密碼</label>
          <div className={'relative'}>
            <input ref={passRef} className="w-full my-2 px-2 h-11 bg-e08" type={'password'}
                   value={registerInfo.password} onChange={e => handleChange(e, 'password')}/>
            <div className={'h-full w-10  flex justify-center items-center  absolute right-1 top-[50%] translate-y-[-50%]'} onClick={showPassword}>
              <img className={'h-4.5 w-4.5'} src={isShowPassword ? eyeOpen : eyeClose}/>
            </div>
          </div>
          <Input
              label={'暱稱'}
              value={registerInfo.nickname}
              type={'text'}
              onChange={e => handleChange(e, 'nickname')}
              placeholder={'请输入昵称'}
          />

          <label className="text-sm">性別</label>
          <select className="w-full my-2 px-2 h-11 bg-e08" value={registerInfo.gendor}
                  onChange={e => handleChange(e, 'gendor')}>
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

          <div
            className="mt-3 rounded-2 flex items-center justify-center px-2 h-11 bg-e08 bg-gradient-to-t from-b02-1 to-b02-2 text-a19"
            onClick={() => {
              setStep('2')
            }}
          >
            下一步
          </div>
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

          <div
            className="rounded-2 flex items-center justify-center px-2 h-11 bg-e08 bg-gradient-to-t from-b02-1 to-b02-2 text-a19"
            onClick={() => {
              setStep('2')
            }}
          >
            註冊
          </div>
        </div>
      )}
    </div>
  )
}
//
// const Input =
//   ( {
//       label,
//       type,
//       value,
//       onChange,
//       extra,
//       ref
//     } ) => {
//     return (
//       <>
//         <label className="">{label}</label>
//         <div className={'relative'}>
//           <input ref={ref} className="w-full my-2 px-2 h-11 bg-e08" type={type}
//                  value={value}
//                  onChange={onChange}/>
//           {extra && (extra)}
//           {/*<div className={'h-4.5 w-4.5  absolute right-5 top-[50%] translate-y-[-50%]'} onClick={showPassword}>*/}
//           {/*  <img className={'w-full h-full'} src={isShowPassword ? eyeOpen : eyeClose}/>*/}
//           {/*</div>*/}
//         </div>
//       </>
//     )
//   }
export default RegisterModel;