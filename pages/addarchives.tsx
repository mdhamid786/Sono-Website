import React from 'react'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import Sheet from 'react-modal-sheet';
import { Timestamp, doc, setDoc } from '@firebase/firestore';
import { firestore } from '@/firebase/clientApp';
import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';
import { randomBytes } from 'crypto';
import { toast, Toaster } from "react-hot-toast";

import { useRouter } from 'next/router';
const addarchives = () => {

  const [name,setName] = useState<string>("");
  const auth = getAuth();
  const db = getDatabase();
  const router = useRouter();
 
  const dispatch = useDispatch();


    const bytes = randomBytes(16);
    var id = bytes.toString('hex').slice(0, 21)

  const handleSubmit = async(e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
    const timestamp: Timestamp = Timestamp.now()
        const user1 = auth.currentUser;
        var user='';
        if (user1) {
          user = user1.uid;
          const userRef = ref(db, 'archives/' + user);
          console.log(userRef)
        } else {
        }
        const users = doc(firestore, `archives/${id}`);
        const yser = {
          id,
          user,
          name,
          timestamp,
        };
        try {
          await setDoc(users, yser);
        } catch (error) {
        
        }
        if(!name){ 
          return alert("All fields are required!");       }
        else{ 
          router.push('/myarchive')
        }
      }
  
  return (
    <>
       <div style={{minHeight:"82vh"}} className="flex ">
       <div  style={{minHeight:"82vh"}} className="hidden w-1/2 flex-col items-center justify-center lg:flex">
           <div className="mx-auto mb-5 w-full">
               <img src="/assets/images/8.svg" alt="coming_soon" className="mx-auto lg:max-w-[370px] xl:max-w-[500px]" />
           </div>
          
       </div>
       <div className="relative flex w-full items-center justify-center lg:w-1/2">
           <div className="max-w-[480px] p-5 md:p-10">
               <h2 className="mb-3 text-3xl font-bold">Add New Archives</h2>
               <form onSubmit={handleSubmit}>
                            <input type="text" value={name} placeholder="Eg. Sonograph" onChange={(e)=> setName(e.target.value)} className="form-input" required />
                            <button style={{marginTop:"30px" , color:"white" , backgroundColor:"#6c63ff"}}  type="submit" className="btn btn-primary w-full ">
                           Create Achive 
                    </button>
    <Link href={`/admin`}> <button style={{backgroundColor:"rgb(250 250 250"}} className=' mt-5 w-full flex gap-1 items-center justify-center py-2.5  rounded'>Cancel</button></Link>

                  </form>
           </div>
       </div>
   </div>
    </>
  )
}

export default addarchives
