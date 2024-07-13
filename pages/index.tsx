import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { useState } from "react"
import 'react-international-phone/style.css';
import { auth } from '../firebase/clientApp';
import {DocumentData} from "@firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { RecaptchaVerifier, signInWithPhoneNumber ,ConfirmationResult, ApplicationVerifier } from "firebase/auth";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, Toaster } from "react-hot-toast";
import OtpInput from 'react-otp-input';
import { setCookie } from 'cookies-next';
import Swal from 'sweetalert2';
import {  QuerySnapshot, onSnapshot } from '@firebase/firestore';
import { userCollection } from '@/firebase/controller';
import { NewUerType } from '@/type/user';
import React, { useRef } from 'react';



declare global {
  interface Window {
    recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
  }
}
 
const index =  () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const countryCode = "+91"
    const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const userNum = auth.currentUser?.phoneNumber
  // console.log(userNum)
  const [users , setUsers] = useState<NewUerType[]>([])
  var sttaus='1';
  const [condition, setCondition] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef();


  const getUsers = (arg0: string)=> {
  }

  useEffect(() => 
  onSnapshot(userCollection, (snapshot:QuerySnapshot<DocumentData>)=>{
    setUsers(
          snapshot.docs.map((doc) =>{
            getUsers(doc.id)
              return {
                  id:doc.id,
                  ...doc.data(),
              };
          })
         )
      }),[] 
  )

  function onCaptchVerify(): void {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }
  // sinup button 
  function onSignup(): void {
    setLoading(true);
    onCaptchVerify();
    const appVerifier: ApplicationVerifier = window.recaptchaVerifier as ApplicationVerifier;
    const formatPh = "+" + ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult: ConfirmationResult) => {
        (window as any).confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
         console.log(error)
        setLoading(false);
      });
  };
  

  // verify otp
  function onOTPVerify(): void {
    setLoading(true);
    (window as any).confirmationResult
      .confirm(otp)
      .then(async (res: { user: SetStateAction<null> }) => {
        // console.log(res);
        setUser(res.user);
        setLoading(false);
        setCookie('logged', 'true');
        const formatPh = "+" + ph;
        { users.map( async (item, index) => {
          if( item.number == formatPh){

            setCondition(condition)
            if(condition){
              sttaus='2';
            }
           

          } 
         
          
          })}
         
          if(sttaus=='2'){
         
            router.push(`/admin`)
            Swal.fire({
              icon: 'success',
              title: 'Login successfully!',
              padding: '1em',
              customClass: 'sweet-alerts',
          });
          } else {
            router.push(`/cover-register`)
          }
      
      })
      .catch((err: any) => {
        // console.log(err);
        setLoading(false);
      });



     
  }
    const requestOTP = (e: { preventDefault: () => void; }) => {
      e.preventDefault(); 
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onSignup();
        // onOTPVerify();
      }
    };


    const OTPKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        
        onOTPVerify();
      }
    };

    
    return (
      <div className="flex min-h-screen">
      <div className="hidden min-h-screen w-1/2 flex-col items-center justify-center p-4 text-white dark:text-black lg:flex">
          <div className="mx-auto mb-5 w-full">
              <img src="/assets/images/3.svg" alt="coming_soon" className="mx-auto lg:max-w-[370px] xl:max-w-[500px]" />
          </div>
         
      </div>
      <div className="relative flex w-full items-center justify-center lg:w-1/2">
          <div className="max-w-[480px] p-5 md:p-10">
              <h2 className="mb-3 text-3xl font-bold"> Signin to <br /> get started !</h2>
              <p className="mb-7"> signin to get manage tag & share your sonographs!</p>
              <section style={{height:"58vh" , backgroundColor:"#6c63ff"}} className=" flex items-center justify-center ">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? ( 
          <h2 className="text-center text-white font-medium text-2xl">
          </h2>
          
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-white w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
<OtpInput containerStyle={{display:"flex", justifyContent:"center"}}
      value={otp}
      onChange={setOtp}
      numInputs={6}
      inputStyle={{width:"2rem" , textAlign:"center" , height:"32px", justifyContent:"center",}}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props}
      onKeyUp={OTPKeyPress}
      />}
    
    />
                <button
                  onClick={onOTPVerify}
                  className=" w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span><br />
                  
                </button>

   
   <button onClick={onSignup}
                style={{ color:"white",textAlign:"end"}}
                >Resend OTP
                </button>
  
               
              
              </>
              
              
            ) : (
              <>
                <div className="bg-white w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor="num"
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
              
                <PhoneInput country={"in"} value={ph} onChange={setPh} onEnterKeyPress={handleKeyPress}
                />
                <button type='submit'
                onClick={onSignup}
                  className=" w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
                
               
              </>
            )}
          </div>
        )}
      </div>
    </section>
          </div>
      </div>
  </div>
    );

    <div className="recapchadiv">

    </div>
};
index.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;

};
export default index; 