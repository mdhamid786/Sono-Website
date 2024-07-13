import React, { useEffect, useState } from 'react'
import PhoneInput from "react-phone-input-2";import Link from 'next/link';
import 'react-international-phone/style.css';
import {  db, firestore } from '../../firebase/clientApp';
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs, onSnapshot, QuerySnapshot, Timestamp, doc, setDoc} from "@firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent } from 'react';
import "react-phone-input-2/lib/style.css";
import OtpInput from 'react-otp-input';
import { NewUerType, shareItems } from '@/type/user';
import 'react-phone-input-2/lib/style.css';
import { sharedCollection, userCollection } from '@/firebase/controller';
import Item from 'antd/es/list/Item';
import { getAuth } from '@firebase/auth';
import { getDatabase } from 'firebase/database';
import { randomBytes } from 'crypto';
import { getStorage, ref } from 'firebase/storage';
import { RWebShare } from "react-web-share";
import { toast, Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';




const connect = () => {

  const [mobileNumber, setMobileNumber] = useState('');
  const [users , setUsers] = useState<NewUerType[]>([]);
  const router = useRouter();
  const [name,setName] = useState<string>("");
  const [username,setUser] = useState<string>("");
  const [condition, setCondition] = useState(true);
  const dispatch = useDispatch();
  const [shareCount,setShareCount] = useState(1)

  var sttaus='1';
  const  sono  = router.query.id;
  const auth = getAuth();
  const storage = getStorage();
  const number = auth.currentUser?.phoneNumber;
  const [shared , setShared] = useState<shareItems[]>([])  

  const bytes = randomBytes(16);
  var id = bytes.toString('hex').slice(0, 21)
  const { productId } = router.query;

  useEffect(() => 
    onSnapshot(userCollection, (snapshot:QuerySnapshot<DocumentData>)=>{
           setUsers(
            snapshot.docs.map((doc) =>{
                return {
                    id:doc.id,
                    ...doc.data(),
                };
            })
           ) 
        }),[]
    )
  const userMobile=`+${mobileNumber}`
  const handleSubmit =  (e: FormEvent) => {
    e.preventDefault();
    { users.map( async (item, index) => {
     if(userMobile==number){
        sttaus='5';
      }
    else if(item.number == userMobile){
      setCondition(condition)
      console.log(condition)
      if(condition){
        sttaus='2';
      }
      console.log(sttaus)
    const sharedWith = item.id
      const timestamp: Timestamp = Timestamp.now()
      const owner = auth.currentUser?.uid;
      const users = doc(firestore, `shared/${id}`);
      const yser = {
        id,
        owner,
        timestamp,
        sharedWith,
        sono
      };
      try {
        await setDoc(users, yser);
      } catch (error) {
      }
     }
    
    })}
    console.log('Mobile number:',userMobile );
    setMobileNumber('');
    // console.log(sttaus)

    if(sttaus=='2'){
     
      router.push(`/archives/${sono}`)
      Swal.fire({
        icon: 'success',
        title: 'Archive shared successfully!',
        padding: '1em',
        customClass: 'sweet-alerts',
    });
    }
    else if(sttaus=='5'){ 
      router.push(`/mobile/connect?id=${sono}`)
      toast.error("User can't share archive yourself !!!");
      }

   else {
      router.push(`/notfound/${sono}`)
      }
  };

  // fetch share
  const fetchArchive = async () =>{
    if(auth.currentUser){
        const q = query(collection(db, "shared"), where("sono", "==", auth.currentUser?.uid));
        const docsnap = await getDocs(q)
        setShareCount(docsnap.docs.length)
        
        
    }
}
console.log(shareCount)

React.useEffect(()=>{
fetchArchive()
},[auth.currentUser?.uid])



  const handlePhoneNumberChange = (value: string) => {
    setMobileNumber(value);
  };
  


  const getArchives = (arg0: string)=> {
  }

  useEffect(() => 
  onSnapshot(sharedCollection, (snapshot:QuerySnapshot<DocumentData>)=>{
      setShared(
          snapshot.docs.map((doc) =>{
            getArchives(doc.id)
              return {
                  id:doc.id,
                  ...doc.data(),
              };
          })
         )
      }),[] 
  )

  


  return (
    <> 
       <div>
      <div style={{minHeight:"82vh"}} className="flex ">
      <div  style={{minHeight:"82vh"}} className="hidden w-1/2 flex-col items-center justify-center  p-4 text-white dark:text-black lg:flex">
          <div className="mx-auto mb-5 w-full">
              <img src="/assets/images/3.svg" alt="coming_soon" className="mx-auto lg:max-w-[370px] xl:max-w-[500px]" />
          </div>
      </div>
      <div className="relative flex w-full items-center justify-center lg:w-1/2">
          <div className="max-w-[480px] p-5 md:p-10">
              <h2 className="mb-3 text-3xl font-bold">Share Archive</h2>
              <p className="mb-7">Please enter the mobile number of the user you want to share archive with .</p>
              <form className="space-y-5">
              <PhoneInput inputStyle={{width:"100%" }} country={"in"} value={userMobile} onChange={handlePhoneNumberChange} />
               <button style={{marginTop:"40px",backgroundColor:"#6c63ff", color:"white" }}
               onClick={handleSubmit}
                 className=" w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
               >
                <span>Share Now</span>
                <Toaster toastOptions={{ duration: 6000 }} />
               </button>
              </form>
    <Link href={`/share/shareMe?id${sono}`}> <button style={{backgroundColor:"#ffff"}} className=' mt-5 w-full flex gap-1 items-center justify-center py-2.5  rounded'>Back</button></Link>

          </div>
      </div>
  </div>
   </div>
    </>
  )
}
export default connect

