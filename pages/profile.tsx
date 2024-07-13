import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { auth, db, firestore } from '@/firebase/clientApp';
import { Database } from 'firebase/database';
import { doc, getDoc, onSnapshot } from '@firebase/firestore';
import { userCollection } from '@/firebase/controller';
import { C } from '@fullcalendar/core/internal-common';
import { NewUerType, OldType } from '@/type/user';
import { onAuthStateChanged } from '@firebase/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DocumentData, QuerySnapshot, collection, getDocs,query, where } from '@firebase/firestore';

const Profile = () => {
   
   
const user_id = auth.currentUser?.uid;

const getUser = doc(firestore , `users/${user_id}`);

const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [archiveCount , setArchiveCount] = useState(0)

  
  const fetchData = async () => {
    const docsnap = await getDoc(getUser);

    onAuthStateChanged(auth, async (user) => {
        if(auth.currentUser){
            const q = query(collection(db, "archives"), where("user", "==", auth.currentUser?.uid));
            const docsnap = await getDocs(q)
            setArchiveCount(docsnap.docs.length)
        }else {
          // User is signed out
          // ...
        }
      });

    if (docsnap.exists()) {
        const newUserObj = {
            id: docsnap.id,
            ...docsnap.data()
        }
        setUser(newUserObj);
    } else {
        console.log('no data');
    }
};


  useEffect(() => {
   
    fetchData();
}, [auth.currentUser?.uid]);



    const dispatch = useDispatch();
  
    return (
        <div>
            <div  className="pt-5">
                <div  className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-1">
                    <div  className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Profile</h5>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col items-center justify-center">
                                <img src={`https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png`} alt="img" className="mb-5 h-34 w-48 rounded-full  object-cover" />
                                <p className="text-xl font-semibold text-primary">{(user as { name: string }).name}</p>

                            </div>
                            <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
                              
                                <li className="flex items-center gap-2">
                                    <AccountCircleIcon/>
                                    {(user as { username: string }).username}

                                </li>
                                <li className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.00659 6.93309C5.04956 5.7996 5.70084 4.77423 6.53785 3.93723C7.9308 2.54428 10.1532 2.73144 11.0376 4.31617L11.6866 5.4791C12.2723 6.52858 12.0372 7.90533 11.1147 8.8278M17.067 18.9934C18.2004 18.9505 19.2258 18.2992 20.0628 17.4622C21.4558 16.0692 21.2686 13.8468 19.6839 12.9624L18.5209 12.3134C17.4715 11.7277 16.0947 11.9628 15.1722 12.8853"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M5.00655 6.93311C4.93421 8.84124 5.41713 12.0817 8.6677 15.3323C11.9183 18.5829 15.1588 19.0658 17.0669 18.9935M15.1722 12.8853C15.1722 12.8853 14.0532 14.0042 12.0245 11.9755C9.99578 9.94676 11.1147 8.82782 11.1147 8.82782"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                    <span className="whitespace-nowrap" dir="ltr">
                                   {(user as { number: string }).number}
                                  
                                    </span>
                                </li>
                            </ul>
                           
                        </div>
                    </div>
                   
                </div>
               
            </div>
        </div>
    );
};

export default Profile;