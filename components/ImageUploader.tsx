import Link from 'next/link';
import { useState, Fragment, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import { toast, Toaster } from 'react-hot-toast';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import { Button, Card, Input, List, message, Image, Progress } from 'antd'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { auth, db, firestore, storage } from "@/firebase/clientApp";
import { useRouter } from 'next/router';
import { randomBytes } from "crypto";



const ImageUploader = () => {
    const [modal21, setModal21] = useState(false);
    const [imageFile, setImageFile] = useState<File>()
    const [downloadURL, setDownloadURL] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [progressUpload, setProgressUpload] = useState(0)
    const [submitted, setSubmitted] = useState(true);
    const [showButton2, setShowButton2] = useState(false);;
    const [refreshCount, setRefreshCount] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const router = useRouter();
    const user = auth.currentUser?.uid
    const url_id= router.query.aid;
    // collection
    const [items, setItems] = useState({
      name: "", 
  });
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
      setItems({
          ...items,
          [e.target.name]: e.target.value,
      });
  };

const timestamp: Timestamp = Timestamp.now()
const bytes = randomBytes(16);
var id = bytes.toString('hex').slice(0, 21)
var type =""

const upload = async (e : {preventDefault : () => void;}) => {
  setShowButton2(true)
  setSubmitted(false)
  if (imageFile) {
    const name = imageFile.name
    const storageRef = ref(storage, `image/${name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgressUpload(progress) // to show progress upload
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is paused')

            break
        }
      },
      (error) => {
        message.error(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //url is download url of file
          setDownloadURL(url)
        })
      },
    )
  } else {
    message.error('File not found')
  }
}

const handleSubmit = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  setShowButton2(false)
  setProgressUpload(0)
  toast.success('add new sonograph !');
  setModal21(false)
  setShowButton2(false)
  setSubmitted(true)
  const q = query(collection(db, "archives"));
  const querySnapshot = await getDocs(q);
  const url = downloadURL;
  const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      
  }));
  queryData.map(async (v) => {
      await setDoc(doc(db, `archives/${url_id}/items`, id), {
          id,
          timestamp,
          type:"image",
          url,
          
          tags:[]
          
      });
     
  })

  // file peaker

 
};
  // end 
  
    const handleSelectedFile = (files: any) => {
      if (files && files[0].size < 10000000) {
        setImageFile(files[0])
     
      } else {
        message.error('File size to large')
      }
    }
   
 

    

  return (
    <>
<div >
    <button style={{backgroundColor:"#6c63ff" , width:"100%"}} type="button" onClick={() => setModal21(true)} className="w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
    Add Sonograph to Archive!
    </button>
    <Transition appear show={modal21} as={Fragment}>
        <Dialog
            as="div"
            open={modal21}
            onClose={() => {
                setModal21(false);
            }}
        >
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0" />
            </Transition.Child>
            <div id="register_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                <div className="flex min-h-screen items-start justify-center px-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                            <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                <h5>Upload New Sonograph!</h5>
                                <button type="button" onClick={() => setModal21(false)} className="text-white-dark hover:text-dark">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            <div className="p-5">
                                <form>
                                 
                    <div className="container mt-5">
                    <div  style={{backgroundColor:"white"}} className=" col-lg-8 offset-lg-2">
                     <input
                        id="ctnFile"
                        type="file"
                        placeholder="Select file to upload"
                        className="rtl:file-ml-5 form-input p-0 file:border-0 file:bg-primary/90 file:py-2 file:px-4 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5"
                        required
                        accept="image/*"
                        onChange={(files) => handleSelectedFile(files.target.files)}
                                />
                        <div className="p-0">
                            <Card style={{backgroundColor:"white" , border:"0px"}} className='p-0' >
                                {imageFile && (
                                    <>
                                        <div  className="p-0 text-right">
                                        {submitted && (
                                            <Button style={{backgroundColor:"#5570f0" , color:"white"}} id='button2' onClick={upload}>Upload</Button>
                                            )}

                                            {showButton2 && (
                                            <Button style={{backgroundColor:"#5570f0" , color:"white" , width:"30%" }}
                                                id="button3"
                                                loading={isUploading}
                                                onClick={handleSubmit}>
                                               Ok
                                            </Button>
                                            )}

                                            <Progress percent={progressUpload} />
                                        </div>
                                    </>
                                )}
                                
                            </Card>
                        </div>
                    </div>
                </div>



            </form>
        </div>
                         
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
</div>  
    </>
  )
}

export default ImageUploader
