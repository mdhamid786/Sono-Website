import TotalDrop from '@/components/TotalDrop'
import { setPageTitle } from '@/store/themeConfigSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const myarchive = () => {
  const dispatch = useDispatch();
 
  return (
    <div>
      <TotalDrop/>
    </div>
  )
}

export default myarchive
