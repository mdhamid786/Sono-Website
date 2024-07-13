import React, { useEffect, useState } from 'react'
import PhoneInput from "react-phone-input-2";import Link from 'next/link';
// import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import {  firestore } from '../../firebase/clientApp';
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs, onSnapshot, QuerySnapshot, Timestamp, doc, setDoc} from "@firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent } from 'react';
import "react-phone-input-2/lib/style.css";
// import OtpInput from "otp-input-react";
import 'react-phone-input-2/lib/style.css';
import { userCollection } from '@/firebase/controller';
import Item from 'antd/es/list/Item';
import { getAuth } from '@firebase/auth';
import { getDatabase } from 'firebase/database';
import { randomBytes } from 'crypto';
import { getStorage, ref } from 'firebase/storage';
import { RWebShare } from "react-web-share";
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';

const notfound = () => {
const router = useRouter()
const dispatch = useDispatch()
 const url_id = router.query.notfound


  return (
    <div>
          <div style={{minHeight:"88vh"}} className="flex">
        <div style={{minHeight:"88vh"}} className="hidden w-1/2 flex-col items-center justify-center p-4 text-white dark:text-black lg:flex">
            <div className="mx-auto mb-5 w-full">
                <img src="/assets/images/2.svg" alt="coming_soon" className="mx-auto lg:max-w-[370px] xl:max-w-[500px]" />
            </div>
        </div>
        <div className="relative flex w-full items-center justify-center lg:w-1/2">
            <div className="max-w-[480px] p-5 md:p-10">
                <h2 className="mb-3 text-3xl font-bold">User Not Found!!!</h2>
                <form className="space-y-5" >
                <RWebShare
        data={{
          text: "Hi! I want to share my sonograph with you at Sono Studio. Come join me. Android: https://play.google.com/store/apps/details?id=com.d2rtech.sonostudio iOS: https://apps.apple.com/us/app/",
          url: `/mobile/connect?id=${url_id}`,
          title: "Flamingos",
        }}
        onClick={() => console.log("shared successfully!")}
      >
       <Link href={``}> <button style={{backgroundColor:"#6c63ff" , color:"white"}} className=' w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>Invite Now </button></Link>
      </RWebShare>
    </form>
    <Link href={`/mobile/connect?id=${url_id}`}> <button style={{backgroundColor:"#ffff"}} className=' mt-5 w-full flex gap-1 items-center justify-center py-2.5  rounded'>Back</button></Link>

  </div>
 </div>
</div>
 </div>
  )
}

export default notfound
