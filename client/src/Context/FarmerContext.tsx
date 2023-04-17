import React, { createContext, ReactNode, useState } from 'react'


export const farmerContext = createContext<{ farmer?: any, setFarmer?: any, survey_no?: number, phone?: string }>({})
const FarmerContext = ({ children }: { children: ReactNode }) => {
  const [farmer, setFarmer] = useState(null)
  /**
   *******FARMER TYPE******
   {
    name: 'Gopal Jawle',
    email: 'gopal@gmail.com',
    area: 3.3,
    survey_no: '123/54',
    phone: '7030621543'
  }
   */
  return (
    <farmerContext.Provider
      value={{ farmer, setFarmer }}
    >

      {children}
    </farmerContext.Provider>
  )
}

export default FarmerContext