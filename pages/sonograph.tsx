import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import { DocumentData, QuerySnapshot, onSnapshot } from '@firebase/firestore';
import { archivesCollection, sharedCollection, userCollection } from '@/firebase/controller';
import { NewUerType, shareItems } from '@/type/user';
import { auth, db, firestore } from '@/firebase/clientApp';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {  collection, doc, getDoc, getDocs,  query, where } from '@firebase/firestore';


import Image from 'next/image';
import index from '.';
 

const sonograph = () => {
    const dispatch = useDispatch();
    const [users , setUsers] = useState<NewUerType[]>([])
    const router = useRouter()
    // const [Count , setAshareCount] = React.useState(0)

    const [archives , setarchives] = useState<NewUerType[]>([])
    const [open, setOpen] = useState(true);
    const id = auth.currentUser?.uid;
     const [shared , setShared] = useState<shareItems[]>([])  
     const [isLoading, setIsLoading] = useState(false);
     const [pageLoading , setpageLoading] = useState(true)
     const [shareCount , setshareCount] = useState(1)

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
        }),[auth.currentUser?.uid] 
    )
  
  useEffect(() => 
  
  onSnapshot(archivesCollection, (snapshot:QuerySnapshot<DocumentData>)=>{
    setarchives(
          snapshot.docs.map((doc) =>{
              return {
                  id:doc.id,
                  ...doc.data(),
              };
          }),
         
         )
      }),[auth.currentUser?.uid]
  )

  
  const handleClick = () => {
      setIsLoading(true);
      // Simulating an asynchronous operation
    };
    
    const fetchShare = async() =>{
        if(auth.currentUser){

            const q = query(collection(db, "shared"), where("sharedWith" , "==", auth.currentUser.uid))
            setpageLoading(false)
            const docsnap = await getDocs(q)
            setshareCount(docsnap.docs.length)
            
        }
        
    }

    
    useEffect(()=>{
        setTimeout(() => {
          setpageLoading(false)
        }, 3000)
        
        fetchShare()
    }, [auth.currentUser?.uid])
    
  
  


  return (
    <> 
    {pageLoading? (
    <div className="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center  dark:bg-[#060818]">
    <svg width="64" height="64" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#4361ee">
        <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
            <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite" />
        </path>
        <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
            <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite" />
        </path>
    </svg>
   </div>
    ):(
        
    <div>
        
         {shareCount == 0 ? (
 <div>
    <div style={{minHeight:"82vh"}} className="flex items-center justify-center">
         <div className="p-5 text-center font-semibold">
             <Image src={`/assets/images/2.svg`} alt="img" width={300} height={200}/>
             <h4 className="mb-5 text-xl font-semibold text-primary">Not Found!</h4>
            
             <Link href="/admin" className="btn btn-primary mx-auto mt-10 w-max">
                 Back to home
             </Link>
         </div>
     </div>
 </div> 
   ):(   
    <div style={{color:"black"}} className="panel ">
    <h5 style={{textAlign:"center"}} className="text-lg font-semibold dark:text-white-light">Shared sonograph!!</h5>
    {isLoading ?(
        <div className="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center  dark:bg-[#060818]">
 <svg width="64" height="64" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#4361ee">
     <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
         <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite" />
     </path>
     <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
         <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite" />
     </path>
 </svg>
</div>
):""}
    <div className="mb-5">
    <div className="share mb-5">
{shared.map((sharei) => (
    auth.currentUser?.uid==sharei.sharedWith?
<Link href={`/archives/${sharei.sono}`}>
<List onClick={handleClick}
style={{ width: '100%'}}
component="nav"
aria-labelledby="nested-list-subheader"
>
<ListItemButton>
<div className="grid h-10 w-14 place-content-center rounded-md">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
<path
    d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
/>
</svg>
</div>
{archives.map((item , index )=>(
item.id === sharei.sono ?(
<div>
    {item.name}
</div>
): ""
))}
{open ? <span></span> : <ExpandMore />}
</ListItemButton>
</List>
</Link>:

""
))}
</div>
        </div>
       
    </div>
  )}  

  </div> 
    )}
  
 
    </>
  )
}

export default sonograph
