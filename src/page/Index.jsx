import { useState } from 'react'
import RegisterModel from "../components/model/RegisterModel.jsx";

function Index() {

  const [registerModelVisible, setRegisterModelVisible] = useState(true);

  const closeRegisterModel = () => {
    setRegisterModelVisible(false)
  }

  return (
    <div className="bg-g01 h-screen w-full flex justify-center items-center">
      {registerModelVisible && (
        <RegisterModel close={closeRegisterModel}/>
      )}
    </div>
  )
}

export default Index
