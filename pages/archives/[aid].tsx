import { MouseEvent } from 'react';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Router, useRouter } from 'next/router';
import { DocumentSnapshot, QuerySnapshot, collection, getDoc, onSnapshot, updateDoc } from '@firebase/firestore';
import { db, firestore } from '@/firebase/clientApp';
import { ItemTags, NewUerType } from '@/type/user';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { query, getDocs } from 'firebase/firestore';
import { auth, storage } from '@/firebase/clientApp';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Upload from '../../components/Upload';
import { toast, Toaster } from 'react-hot-toast';
import { randomBytes } from 'crypto';
import type { GetServerSideProps } from 'next';
import ImageUploader from '@/components/ImageUploader';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { aid } = context.query;
    return { props: { aid: aid } };
};

const aid: React.FC = () => {
    const router = useRouter();
  const [user1, setUser1] = useState<any>({});
  const [value, setValue] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const getUser = doc(firestore, `users/${auth.currentUser?.uid}`);
  const [archivesItem, setArchivesItem] = useState<NewUerType[]>([]);
  const [itemDoc, setItemDoc] = useState<ItemTags | undefined>();
  const url_id = router.query.aid as string;
  const [pageLoading , setpageLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const ida = router.query.aid;
      const colRef = collection(db, `archives/${ida}/items`);
      const snapshot = await getDocs(query(colRef));

      if (snapshot.docs.length > 0) {
        setValue(snapshot.docs[0]?.data().id);
      }
    };
    localStorage.setItem('archiveUrl',url_id);
    const timer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [archivesItem.length]);
  console.log(archivesItem)

  useEffect(() => {
    const fetchData1 = async () => {
      const docsnap = await getDoc(getUser);

      if (docsnap.exists()) {
        const newUserObj = {
          id: docsnap.id,
          ...docsnap.data(),
        };
        setUser1(newUserObj);
      } else {
        console.log('no data');
      }
    };

    fetchData1();
  }, [auth.currentUser?.uid]);

  useEffect(() => {
    const collectionRef = collection(db, `archives/${url_id}/items`);
    const unsubscribe = onSnapshot(collectionRef, (snapshot: QuerySnapshot) => {
      setArchivesItem(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );

      const tagName = snapshot.docs.filter((e) => e.id === value);
      setItemDoc(tagName[0]?.data());
    });

    return () => {
      unsubscribe();
    };
  }, [url_id, value]);

  const handleButtonClick = (value: string) => (event: MouseEvent<HTMLButtonElement>) => {
    setValue(value);
    console.log('Clicked value:', value);
  };

  const addTags = async (e: React.FormEvent) => {
    e.preventDefault();
    setTags('');
    console.log(value);
    const item = doc(db, `archives/${url_id}/items`, value!);
    const data = await getDoc(item);
    const addags1 = data.data()?.tags || [];
    addags1.push({
      tag: tags,
      userName: (user1 as { name: string })?.name,
      type: 'simple',
      timestamp: Timestamp.now(),
    });
    await updateDoc(item, {
      tags: addags1,
    });
  };

  const userName = (user1 as { name: string })?.name; 
  

  return (
        <>
       <Toaster toastOptions={{ duration: 4000 }} />
            {archivesItem.length == 0 ? (
                <div>
                    <Upload />
                </div>
            ) : (
                <div style={{ padding: '0px', paddingBottom: '0px' }} className="panel" id="line">
                  
                               <div style={{padding:"0px"}} className="panel">
                                    <p style={{ backgroundColor: 'white',color:"black" , fontWeight:"bold" }} className="flex w-full items-center justify-center gap-1 rounded py-2.5 text-white">
                                        My Sonograph!
                                    </p>
                                </div>
                               
                    <div>
                        <div className="">
                            <div className=" grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {/* first */}
                               <Link href={'/myarchive'}>
                               <div className="panel h-full">
                                    <p style={{ backgroundColor: '#6c63ff' }} className="flex w-full items-center justify-center gap-1 rounded py-2.5 text-white">
                                        My Archive!
                                    </p>
                                </div>
                               </Link>
                                {/* second */}
                                <div className="panel h-full">
                                    <ImageUploader />
                                </div>
                                {/* third */}
                                <div className="panel h-full">
                                    <Link className='display:"flex" , justifyContent:"flex-end" ' href={`/share/shareMe?id=${url_id}`}>
                                        <button style={{ backgroundColor: '#6c63ff', width: '100%' }} type="submit" className="flex w-full items-center justify-center gap-1 rounded py-2.5 text-white">
                                            Share Achive!
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container1"></div>
                    <div className="mb-5">
                        <Tab.Group>
                            <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                {archivesItem.map((item, index) => (
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                onClick={handleButtonClick(item.id!)}
                                                className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                         relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:mr-2 rtl:ml-2">
                                                    <path
                                                        opacity="0.5"
                                                        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                    />
                                                    <path d="M12 15L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                {index}
                                            </button>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                            {archivesItem.map((item,index) => (
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <div className="active">
                                            {/* tab content */}
                                            <div className=" grid gap-6 xl:grid-cols-3">
                                                <div style={{ padding: '0px', height: '380px' }} className="panel xl:col-span-2">
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="">
                                                        <img style={{ height: '380px' }} src={item.url} alt="" />
                                                        <div className="dropdown"></div>
                                                    </div>

                                                    <div className="relative"></div>
                                                </div>
                                                <div className="panel flex-1 p-0">
                                                    <div style={{ height: '400px', overflow: 'hidden', whiteSpace: 'nowrap' }} className="relative">
                                                        <PerfectScrollbar
                                                            style={{ display: 'flex', flexDirection: 'column-reverse', height:"87%" }}
                                                            className="chat-conversation-box relative h-full sm:h-[calc(100vh_-_300px)]"
                                                        >
                                                            <div
                                                                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                                                                className="min-h-[400px] space-y-5 p-4  sm:min-h-[300px] sm:pb-0"
                                                            >
                                                                <div className="m-6 mt-0 block">
                                                                    <h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
                                                                    </h4>
                                                                </div>

                                                                <div>
                                                                     {/* <div className={`'justify-end' : ''} flex items-start gap-3`}>
                                                                        <div  className={`'order-2' : ''} flex-noneb`}>
                                                                            {itemDoc?.tags?.map((item) => (
                                                                                <div  className="message">
                                                                                    <p 
                                                                                        style={{
                                                                                            color: 'black',
                                                                                            backgroundColor: 'white',
                                                                                            boxShadow: '1px 1px 1px 1px white',
                                                                                            paddingLeft: '20px',
                                                                                            paddingRight: '20px',
                                                                                            borderRadius: '12px',
                                                                                            fontSize: '10px',
                                                                                            fontFamily: 'monospace',
                                                                                        }}
                                                                                    >
                                                                                        {' '}
                                                                                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                                                                                            {item.tag}
                                                                                            <br></br>
                                                                                        </span>
                                                                                        {(item as { userName: string }).userName}
                                                                                    </p>
                                                                                    <br />
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div> */}

                                                <div key={index}>
                                            {itemDoc?.tags?.map((item) => (
                                                    
                                                    <div className={`flex items-start gap-3 ${item.userName === userName ? '' : 'justify-end '}`}>
                                                        
                                                            <div className={`flex-none 'order-2' : ''}`}>
                                                           
                                                                    {/* <img src={`data:image/png;base64,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`} className="h-10 w-10 rounded-full object-cover" alt="" /> */}
                                                                  
                                                            </div>
                                                            <div  className="space-y-2">
                                                                <div  className="flex items-center gap-3">
                                                                    <div style={{fontWeight:"bold" , fontSize:"15px"}}
                                                                        className={`rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800`}
                                                                    >
                                                                        {item.tag} <br />
                                                                       <span style={{fontSize:"10px" , fontWeight:"lighter", fontFamily:"monospace"}}>
                                                                       {(item as { userName: string }).userName}
                                                                       </span>
                                                                    </div>
                                                                   
                                                                </div>
                                                                <div className={`text-xs text-white-dark 'ltr:text-right rtl:text-left' : ''}`}>
                                                                 
                                                                </div>
                                                            </div>
                                                        </div>
                                                         
                                                        
                                                        ))}
                                                    </div>
                                                                </div>
                                                            </div>
                                                        </PerfectScrollbar>

                                                        {/* add Tags */}
                                                        <div style={{ bottom: '17px', left: '-10px' }} className="absolute left-0 w-full p-4">
                                                            <div className="w-full  items-center space-x-3 rtl:space-x-reverse">
                                                                <form onSubmit={addTags} action="">
                                                                    <div className="relative flex-1">
                                                                        <input
                                                                            type="text"
                                                                            id="name"
                                                                            value={tags}
                                                                            onChange={(e) => setTags(e.target.value)}
                                                                            // name="name"
                                                                            autoComplete="off"
                                                                            className="form-input rounded-full border-0 bg-[#f4f4f4] px-12 py-2 focus:outline-none"
                                                                        />
                                                                        <button type="submit" className="absolute top-1/2 -translate-y-1/2 hover:text-primary ltr:right-4 rtl:left-4">
                                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                />
                                                                                <path opacity="0.5" d="M6 18L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                                <div className="hidden items-center space-x-3 py-3 rtl:space-x-reverse sm:block sm:py-0"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            ))}
                        </Tab.Group>
                    </div>
                </div>
            )}

        </>
    );
};
export default aid;
