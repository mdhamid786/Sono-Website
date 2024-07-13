import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import dynamic from 'next/dynamic';
import TotalDrop from '../components/TotalDrop';
import { auth, db, firestore } from '@/firebase/clientApp';
import { DocumentData, QuerySnapshot, collection, doc, getDoc, getDocs, onSnapshot, query, where } from '@firebase/firestore';
import { archivesCollection, sharedCollection } from '@/firebase/controller';
import { NewUerType, OldType } from '@/type/user';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetStaticProps } from 'next';
import { CgSpinner } from "react-icons/cg";
import { onAuthStateChanged } from '@firebase/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    
});



const admin = () => {
    const user_id = auth.currentUser?.uid;
const getUser = doc(firestore , `users/${user_id}`);
const archivedata = doc(firestore , `archives/${user_id}`)
const [user, setUser] = useState({});
    const dispatch = useDispatch();

    
    const id = auth.currentUser?.uid;
const router = useRouter()
    const [archives , setarchives] = useState<NewUerType[]>([])
    const [shared , setShared] = useState<NewUerType[]>([])
    const [archiveCount , setArchiveCount] = useState(0)
    const [shareCount , setshareCount] = useState(0)
  const [loading, setLoading] = useState(false);

    // get archive collection


// user
const fetchData = async () =>{
    const docsnap = await getDoc(getUser);
    if(docsnap.exists()) {
        const newUserObj = {
            id: docsnap.id,
            ...docsnap.data()
        }
        setUser(newUserObj)
    } else {
    
    }
};

const fetchArchive = async () =>{
    
    if(auth.currentUser){
        const q = query(collection(db, "archives"), where("user", "==", auth.currentUser?.uid));
        const docsnap = await getDocs(q)
        setArchiveCount(docsnap.docs.length)
        
        
    }
}

const fetchShare = async() =>{
    if(auth.currentUser){
       
        const q = query(collection(db, "shared"), where("sharedWith" , "==", user_id))
        const docsnap = await getDocs(q)
        setshareCount(docsnap.docs.length)
    }

}




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



useEffect(()=>{
    fetchData()
    fetchArchive()
    fetchShare()
},[user_id])
    // shared collection
 
    
    return (
        <div>
            <div className="pt-5">
                <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                   
{/* first */}       <Link href={'/myarchive'}>

                    <div className="panel h-full">
                        <div style={{justifyContent:"center"}} className="mb-5 flex justify-between dark:text-white-light">
                            <h5 className="text-lg font-semibold">My Archives!!</h5>
                        </div>
                       
                        <div id='imgdiv'  className=" my-10 text-3xl font-bold text-[#e95f2b]">
                            <span>{archiveCount}</span>

                        </div>
                            
                    </div>
                    </Link>
{/* second */}
<Link href={'/profile'}>
<div className="panel h-full">
                        <div className="mb-2 flex justify-between dark:text-white-light">
                        </div>
                        <div id='imgdiv' className=" my-5 text-3xl font-bold text-[#e95f2b]">
                        <img  style={{height:"110px" , width:"116px" , textAlign:"center"}} src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png" alt="" />

                        </div>
                      
                        <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
                              
                              <li className="flex items-center gap-2">
                                  <AccountCircleIcon/>
                                  <p className="text-xl font-semibold text-primary"> {(user as { name: string }).name}</p>
                                 

                              </li>
                              <li className="flex items-center gap-2">
                              <PersonIcon/>
                                  <span className="whitespace-nowrap" dir="ltr">
                                 {(user as { username: string }).username}
                                
                                  </span>
                              </li>
                          </ul>

                    </div> 
                    </Link>
{/* third */}
<Link href={'/sonograph'}>
<div className="panel h-full">
                        <div  style={{justifyContent:"center"}} className="mb-5 flex justify-between dark:text-white-light">
                            <h5 className="text-lg font-semibold ">Shared with me!!</h5>
                        </div>
                        <div id='imgdiv'  className=" my-10 text-3xl font-bold text-[#e95f2b]">
                            <span style={{textAlign:"center"}}>{shareCount}</span>
                        </div>
                    </div>
</Link>
                </div>
{/* <TotalDrop/> */}
            </div>
        </div>
    );
};   
export default admin;