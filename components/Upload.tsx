import { Button, Card, Input, List, message, Image, Progress } from 'antd'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import React, { useState } from 'react'
import { async } from "@firebase/util";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { auth, db, firestore, storage } from "@/firebase/clientApp";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropzone from 'react-dropzone'
import { useRouter } from 'next/router';
import { randomBytes } from "crypto";
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import Swal from 'sweetalert2';
import ImageUploader from './ImageUploader';





const Upload = () => {
    const [imageFile, setImageFile] = useState<File>()
    const [downloadURL, setDownloadURL] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [progressUpload, setProgressUpload] = useState(0)

    const router = useRouter();
    
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
 Swal.fire({
                icon: 'success',
                title: 'Sonograph added successfully',
                padding: '1em',
                customClass: 'sweet-alerts',
            });


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
        console.log(files[0])
      } else {
        message.error('File size to large')
      }
    }
   
   
  return (
    <>
      <div style={{minHeight:"88vh"}} className="flex">
            <div style={{minHeight:"88vh"}} className="hidden w-1/2 flex-col items-center justify-center p-4 text-white dark:text-black lg:flex">
                <div className="mx-auto mb-5 w-full">
                    <img src="/assets/images/4.svg" alt="coming_soon" className="mx-auto lg:max-w-[370px] xl:max-w-[500px]" />
                </div>
               
            </div>
            <div className="relative flex w-full items-center justify-center lg:w-1/2">
                <div className="max-w-[480px] p-5 md:p-10">
                    <h2 className="mb-3 text-3xl font-bold">Add Sonograph</h2>
                    <form className="space-y-5" >
                 <ImageUploader/>
                    </form>
                   
                  
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Upload