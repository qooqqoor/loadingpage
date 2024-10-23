// import Input from "../../input/Input.jsx";
// import Button from "../../button/Button.jsx";
// import plusImg from "../../../assets/button/anchor_btn_add.png";
//
// const RegistryFormStep2 =
//   ({
//      registerInfo,
//      handleChange,
//      frontendIDImage,
//      backendIDImage,
//      headshotImage,
//   }) =>{
//   return (
//     <div id="step1" className="w-full ">
//       <Input
//         label={'真實姓名'}
//         value={registerInfo.realname}
//         type={'text'}
//         onChange={e => handleChange(e, 'realname')}
//         placeholder={'请输入真实姓名'}
//       />
//
//       <Input
//         label={'證件號碼'}
//         value={registerInfo.idCode}
//         type={'text'}
//         onChange={e => handleChange(e, 'idCode')}
//         placeholder={'请输入证件号码'}
//       />
//
//       <label className="">上傳身分證信息</label>
//       <div className="flex gap-2 my-2">
//         <Photos
//           image={frontendIDImage}
//           id={'frontendID'}
//           altText={'正面'}
//         />
//         <Photos
//           image={backendIDImage}
//           id={'backendID'}
//           altText={'反面'}
//         />
//       </div>
//       <label className="">近身照片,请提供正面面部照片</label>
//       <div className="flex  my-2">
//         <Photos
//           image={headshotImage}
//           id={'headshot'}
//           altText={''}
//         />
//       </div>
//
//       <Button
//         text={'註冊'}
//         validObj={validRegisterStep2}
//         onClick={() => setStep('2')}
//       />
//     </div>
//   )
// }
//
//
// const Photos = ( { image, id, altText } ) => {
//   return (
//     <div className={'flex-1 border-dashed border-2 border-e10 rounded-1'}>
//       {!image && (
//         <label htmlFor={id} className=" h-24 bg-e08 flex justify-center items-center flex-col">
//           <img className={'h-5 w-5'} src={plusImg} />
//           <div>{altText}</div>
//         </label>
//       )}
//       {image && (
//         <img src={image} alt="Captured" className="m-auto flex-1 h-24 "/>
//       )}
//       <input
//         id={id}
//         type="file"
//         accept="image/*"
//         onChange={event => handleCapture(event, id)}
//         className={'hidden'}
//       />
//     </div>
//   )
// }