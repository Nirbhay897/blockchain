import React, { useState } from 'react'
import axios from 'axios'

const FileUpload = ({account, provider, contract}) => {
  
  const [file, setfile] = useState(null);
  const [fileName, setFileName] = useState('No image selected');

  const handleSubmit = async (e) =>{

    e.preventDefault();
    if(file) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              API_Key: `cbf961b2402ea42d5d86`,
              API_Secret: `90a1c68667794e592ff58926180777b7e2d69784204c06828424059ecbd951e7`,
            "Content-Type": "multipart/form-data",
            }
          })
          const imghash = `ipfs://${resFile.data.IpfsHash}`;
          const signer = contract.connect(provider.getSigner());
          signer.addData(account, imghash);
        } catch (err) {
          alert("Unable to upload image to Pinata");
        }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setfile(null);
  }

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setfile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='file-upload'>Choose Image</label>
        <input type="file" name='data' onChange={retrieveFile} />
        <span>Image: {fileName}</span>
        <button type='submit' disabled={!file}>Upload File</button>
      </form>
    </div>
  )
}

export default FileUpload
