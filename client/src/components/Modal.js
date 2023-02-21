import React, { useEffect } from 'react'

const Modal = ({contract , setModalopen}) => {

  const AllowSharing = async () =>{
    const address = document.querySelector(".address").value;
    await contract.allowAccess(address);
    setModalopen(false);
  }

  useEffect(()=>{
    const accessList = async () =>{
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for(let i=0; i<options.length; i++){
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    }
    contract && accessList();
  },[contract])
  return (
    <div>
      <div>
        <div>Share With</div>
        <div>
          <input type="text" placeholder='Enter Address' className='address'/>
        </div>
        <form id="form">
          <select id="selectNumber">
            <option className='address'>People With Access</option>
          </select>
        </form>
        <div>
          <button onClick={()=>{setModalopen(false)}}>Cancel</button>
          <button onClick={()=>{AllowSharing()}}>Share</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
