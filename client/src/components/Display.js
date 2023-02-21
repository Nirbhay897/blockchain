import React, { useState } from 'react'

const Display = ({contract, account}) => {
  
  const [data, setdata] = useState('');


  const getdata = async() =>{
    let dataArray;
    const othraddress = document.querySelector(".address").value;

    try {
      if(othraddress){
        dataArray = await contract.displayData(othraddress);
        console.log('====================================');
        console.log(dataArray);
        console.log('====================================');
      } 
      else{
        dataArray = await contract.displayData(account)
      }

    } 
    catch (e) {
      alert("You dont have access");
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if(!isEmpty){
      const str = dataArray.toString();
      const str_arr = str.split(",");

      const images = str_arr.map((item, index)=>(
        <a href={item} key={index} target='_blank'>
          <img src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} 
          alt="cant get images"
           />
        </a>
      ))
      setdata(images);
    }
    else {
      alert("No image to display");
    }
  }
  return (<>
   <div>{data}</div>
   <input type="text" className='address' placeholder='Enter Address'/>
   <button onClick={getdata}>Get Data</button>
  </>
   
  )
}

export default Display
