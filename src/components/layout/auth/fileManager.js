import React from 'react';
import axios from 'axios';
import ViewUpload from './viewUpload'
import Header from './Header';



const converBase64StringToFile = (fileUrl = '', fileName) => {
    const array = fileUrl.split(',');
    const mime = array[0].match(/:(.*?);/)[1];
    const byteString = atob(array[1])
    let n = byteString.length;
    const uint8Array = new Uint8Array(n);

  while (n--) {
    uint8Array[n] = byteString.charCodeAt(n);
  }

  return new File([uint8Array], fileName, { type: mime });
}

// const fileRequest = [
//     {
//         fileName: 'blah blah',
//         file: 'data:/bl',
//     }
// ]

// fileRequest.map((file) => (<div>
//     converBase64StringToFile(file.file, file.fileName);
// </div>))

function FileManager() {
    const [file, setFile] = React.useState(null);
    const [fileName, setFileName] = React.useState('');
    const handleFileToBase64 = async (event) => {
        // get all the files submited, in this case it's one
        const files = event.target.files;
        // since it's one file you can access it from the index position in the files array
        const file = files.item(0);

        setFileName(file.name);
        const fileString = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => {
                console.log(error);
                reject(error);
            }
        })

        setFile(await fileString);

    }
    const handleFormSubmit = async  (event) => {
        event.preventDefault();
       try {
           // make a request to axios to submit the uploaded file with it's name
           const uploadRequest = await axios.post('http://localhost:3004/upload', { fileName, file });
           console.log(uploadRequest);

       } catch (error) {
           const returnedError = error.response && error.response;
           console.log(returnedError);
       }
    }
    return (
        <div>
            <Header/>
            <div className="text-center">
                <h3> File Manager  </h3>
                <form onSubmit={handleFormSubmit}>
                <input onChange={handleFileToBase64} type="file" ></input>
                <input type="submit"/>
                </form>
            </div>
            <ViewUpload />
        </div>
    )
}

export default FileManager