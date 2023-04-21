import React from 'react'
import { useSelector } from 'react-redux';
import Header from '../componets/Header';

const NotFoundPage = () => {
  const inSession = useSelector((state:any)=> state?.user?.inSession || false  )
  return (
    <div>
      <Header inSession={inSession}/>
      NotFoundPage
    </div>
  )
}

export default NotFoundPage;