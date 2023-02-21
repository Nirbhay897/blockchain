import Upload from './artifacts/contracts/Upload.sol/Upload.json'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal'
import './App.css';


function App() {
  const [account, setAccount] = useState('');
  const [contract, setcontract] = useState(null);
  const [provider, setprovider] = useState(null);
  const [modalopen, setModalopen] = useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async()=>{
      if(provider){
        window.ethereum.on("chainChanged", ()=>{
          window.location.reload();
        })
        window.ethereum.on("accountsChanged", ()=>{
          window.location.reload();
        })

        await provider.send("eth_requestAccounts", []);
        const signer  = provider.getSigner();
        const address = await signer.getAddress();

        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract =   new ethers.Contract(
          contractAddress || '',
          Upload.abi,
          signer
        )
        // const contract =  (await ethers.ContractFactory.getContract(
        //   contractAddress,
        //   Upload.abi,
        //   signer
        // ))

        console.log('====================================');
        console.log(contract);
        console.log('====================================');

        setcontract(contract);
        setprovider(provider);
      }
      else{
        console.log('====================================');
        console.log("Metamask not installed");
        console.log('====================================');
      }
    }
    provider && loadProvider();
  },[])

  return ( <>
  {!modalopen && (<button className='flex-row' onClick={()=>setModalopen(true)}>
    Share
  </button>
  )}
  {modalopen && (
    <Modal setModalopen={setModalopen} contract={contract}/>
  )}

  <div className='flex-row '>
    <h1 className='flex-row'>Medical Records</h1>
    <div></div>
    <div></div>
    <div></div>
    <p>
      Account ID : {account ? account : "Not Connected"}
    </p>
    <FileUpload
    account={account}
    provider={provider}
    contract={contract}
     />
     <Display contract={contract} account={account} />
  </div>
  </>
  );
}

export default App;
