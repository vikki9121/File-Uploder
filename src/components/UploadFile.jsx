import React, { useState, useEffect } from 'react'
import { storage } from '../firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'
import DragDropFiles from './DragDropFiles'

const UploadFile = () => {
    const [fileUpload, setFileUpload] = useState(null)
    const [fileList, setfileList] = useState([])
    
    const fileListRef = ref(storage, 'file/')
    const upload = () => {
        if (fileUpload == null) return;
        const fileRef = ref(storage, `file/${fileUpload.name + v4() }`)
        uploadBytes(fileRef, fileUpload).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                setfileList((prev)=>[...prev, url])
            })
            
        })
    }

    useEffect(()=>{
        listAll(fileListRef).then((res)=> {
            res.items.forEach((item) =>{
                getDownloadURL(item).then((url)=>{
                    setfileList((prev)=> [...prev, url])
                })
            })
        })
    }, [fileListRef])

    

  return (
    <div className='upload'>
        <input 
        type='file'
        // title=''
        onChange={(e) => {setFileUpload(e.target.files[0])}}
        />
        {/* <DragDropFiles /> */}
        <button onClick={upload}>Upload</button>
        
        {fileList.map((url)=>{
            //uncomment after debug
            // return <img src={url} alt="content"/>
        })}
    </div>
  )
}

export default UploadFile