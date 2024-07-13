import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import { auth, db, firestore } from '@/firebase/clientApp';
// import firebase from 'firebase/compat';
import { DocumentData, QuerySnapshot, collection, getDoc, getDocs, onSnapshot, query, where } from '@firebase/firestore';
import { archivesCollection, userCollection } from '@/firebase/controller';
import { NewUerType } from '@/type/user';
import { Table } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import index from '../pages';
import Image from 'next/image';
import Link from 'next/link';
import InputIcon from '@mui/icons-material/Input';

const TotalDrop = () => {
    const router = useRouter();
    const [open, setOpen] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [archiveCount , setArchiveCount] = React.useState(1)

    const handleClick = () => {
        // router.push('/pages/BasicTabs');
    };

    const fetchArchive = async () =>{
        if(auth.currentUser){
            const q = query(collection(db, "archives"), where("user", "==", auth.currentUser?.uid));
            const docsnap = await getDocs(q)
            setArchiveCount(docsnap.docs.length)
            
            
        }
    }

    React.useEffect(()=>{
  fetchArchive()
    },[auth.currentUser?.uid])

    const userlogin = auth.currentUser?.uid;
    // console.log(userlogin)

    const [archives, setarchives] = React.useState<NewUerType[]>([]);

    React.useEffect(
        () =>
            onSnapshot(archivesCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                setarchives(
                    snapshot.docs.map((doc) => {
                        //console.log(...doc.data());
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    })
                );
            }),
        [auth.currentUser?.uid]
    );
    const handleClick1 = () => {
        setIsLoading(true);
    
        // Simulating an asynchronous operation
       
      };

 

    return (
        <>
 {archiveCount == 0 ? (
    <div>
    <div style={{minHeight:"82vh"}} className="flex items-center justify-center">
         <div className="p-5 text-center font-semibold">
             <Image src={`/assets/images/11.svg`} alt="img" width={400} height={200}/>
             <h4 className="mb-5 text-xl font-semibold text-primary">Not Found!</h4>
             <p className="text-base">plaese add archives!</p>
             <Link style={{backgroundColor:"#6c63ff"}} href="/admin" className="btn btn-primary mx-auto mt-10 w-max">
                 Back to home
             </Link>
         </div>
     </div>
 </div>
 ):(
        <div className="panel">
                <h5 style={{textAlign:"center"}} className="text-lg font-semibold dark:text-white-light">My archives!!</h5>
                    <div className="mb-5">
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
        <div className='  p-4  dark:text-black'>
        {archives.map((item) =>
                item.user == userlogin ? (
                    <Link href={`/archives/${item.id}`}>
                        <List onClick={handleClick1} component="nav" aria-labelledby="nested-list-subheader">
                            <ListItemButton onClick={handleClick}>
                            <div className="grid h-8 w-14 ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            
                           {item.name}
                                {open ? <span></span> : <ExpandMore />}
                            </ListItemButton>
                        </List>
                    </Link>
                ) : (
                    <span></span>
                )
            )}
        </div>
                    </div>
                  
                </div>
               
         )}
        </>
    );
};

export default TotalDrop;
