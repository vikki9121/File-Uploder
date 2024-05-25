import React, { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";


const UploadFile = (db) => {
    const [fileList, setFileList] = useState([]);

    const [newFileName, setNewFileName] = useState('')
    const [newFileDescription, setNewFileDescription] = useState('')
    const [newFileAge, setNewFileAge] = useState('')
  
    const fileListColRef = collection(db, "files")
  
    const addFile = async () => {
      await addDoc(fileListColRef, {name: newFileName, description: newFileDescription, age: Number(newFileAge) })
    }
  
    const updateFile = async (id, age) => {
      const fileDoc = doc(db, "files", id)
      const newFields = {
        age: age+1
      }
      await updateDoc(fileDoc, newFields)
    }
  
    const deleteFile = async (id)=> {
      const fileDoc = doc(db, "files", id)
      await deleteDoc(fileDoc)
    }
    
    useEffect(()=>{

      const getFileList = async () => {
        const data = await getDocs(fileListColRef);
        console.log(data.docs)
        setFileList(data.docs.map((doc)=> ({...doc.data(), id: doc.id  })))
      }
  
      getFileList();
    }, [])

  return (
    <div>
        {/* FILE DATA COMPONENT */}
        <input placeholder="Name" onChange={(e) => setNewFileName(e.target.value)}/>
        <input placeholder="Description" onChange={(e) => setNewFileDescription(e.target.value)}/>
        <input placeholder="Age" onChange={(e) => setNewFileAge(e.target.value)}/>
        <button onClick={addFile}> Add File</button>
        {fileList.map((file)=> { 
          return <div key={file.id}>
            <h1>Name: {file.name}</h1>
            <h1>Description: {file.description}</h1>
            <h1>Age: {file.age}</h1>
            <button onClick={() =>{updateFile(file.id, file.age)}}>Increase Age</button>
            <button onClick={() => {deleteFile(file.id)}}>Delete File</button>
            </div>
          })}

        {/* FILE UPLOAD TO STORAGE */}
        {/* {user?<UploadAudio />:null} */}
        {/* {loggedIn?<DragDropFiles />:null} */}
      </div>
  )
}

export default UploadFile