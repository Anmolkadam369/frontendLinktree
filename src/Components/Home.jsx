import { react, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logoImage from '../images/download.png';
import treeImage from "../images/download1.jpeg";

function Home(){
  const navigate = useNavigate();
const[userName, setUserName]=useState('');
const[isNameAvailable, setIsNameAvailable]=useState('');
const[claimedName,isClaimedName] = useState('');

function handleInputChange(event){
  console.log(event.target.value)
  setUserName(event.target.value)

  fetch('https://linktreeclone-3hlf.onrender.com/userNameCheck', {
    method: "POST",
    headers:{
        'Content-Type': 'application/json',
    },
    body:JSON.stringify({
        userName:event.target.value,
    }),
  })
  .then(response=>response.json())
  .then(result=>{
    console.log(result);
    if(result.status==true){
         setIsNameAvailable(result.message);

    }
    if(result.status==false){ 
        setIsNameAvailable(result.status)
    }
  })
  .catch(error=>{
    console.error("error",error)
  })
}

function claimName() {
  console.log(isNameAvailable);
  fetch('https://linktreeclone-3hlf.onrender.com/createUserName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: isNameAvailable,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status === true) {
        console.log('tonextpage');
        // Pass userName as a parameter to the SignUpPage component
        navigate(`/signup/${isNameAvailable}`);
      }
    })
    .catch((error) => {
      console.error('error', error);
    });
}

const login=()=>{
  navigate('/login')
}
return (
<div>

  <div className=" bg-green-500 rounded">
    <div className='bg-blue-300 flex h-12 w-full rounded-md '>

      <a href="https://linktree.com" target="_blank" className="h-6 w-20 ml-4 mt-3 md-5 border-4 rounded">
        <img src={logoImage} alt="linktree logo" />
      </a>
      <h3 className='  h-6 w-20 mt-3 md-5 ml-9 rounded '>Template</h3>
      <div className=' h-6 w-24 mt-3 md-5 ml-5 rounded '>MarketPlace</div>
      <div className=' h-6 w-20 mt-3 md-5 ml-5 rounded '>Discover</div>
      <div className=' h-6 w-20 mt-3 md-5 ml-5 rounded '>Pricing</div>
      <div className=' h-6 w-20 mt-3 md-5 ml-5 rounded '>Learn</div>
      <button className='  h-8 w-20 mt-3  md-5 ml-14 rounded border-2 border-black bg-yellow-600' onClick={login} >Log in </button>
      



    </div>
    <div className='flex'>
      <div>
        <h1 className='text-left ml-9 mt-10 font-bold text-yellow-400 text-6xl'>Everything you <br /> are.In one, <br /> simple link in bio.</h1>
        <h6 className='ml-9 text-left mt-10  text-yellow-400'>Join 40M+ people using Linktree for their link in bio. One link to help you share<br />everything you create, curate and sell from your Instagram, TikTok, Twitter,<br />  YouTube and other social media profiles.</h6>
      </div>
      <a href="https://linktree.com" target="_blank" className="ml-16 mt-20 md-5 border-10">
        <img src={treeImage} alt="treeImage" className="h-60 w-60" />
      </a>
    </div>

    <div className='flex mt-10 '>
      <br></br>
      <input
       type='text' 
       placeholder='linktr.ee/yourname' 
       className='rounded h-7 text-left ml-10 mb-5 '
       value={userName}
       onChange={handleInputChange}
       ></input>
      <button
       className=' ml-20 bg-orange-200 rounded-full hover:bg-orange-300  px-2 h-8'
       value={claimedName}
       onClick={claimName}
       hidden={!isNameAvailable}
       > Claim your Linktree </button>
    </div>
    <p className=' h-7 text-left ml-10  text-yellow-400 '>{isNameAvailable ? 'Username is available!' : 'Username is not available!'}</p>  
  </div>

  <div className='bg-orange-200'>
  <div className='flex w-full'>
  <a href="https://linktree.com" target="_blank" className="ml-16 mt-20 md-5 border-10">
        <img src={treeImage} alt="treeImage" className="h-60 w-60" />
      </a>
      <div className='mt-10'>
        <h1 className=' text-left ml-20 mt-10 font-bold text-violet-950 text-6xl'>Create and customize <br/> your Linktree in minutes</h1>
        <h6 className='text-left ml-20 mt-10  text-violet-950'>Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast,<br />events and more. It all comes together in a link in bio landing page designed to<br />convert.</h6>
      <button className=' ml-20 bg-violet-500 hover:bg-violet-400 rounded-full mt-10 px-2 h-8 mb-10 '>Get started for free </button>
      </div>
    </div>
  </div>

  <div className='bg-indigo-400 '>
  <div className='flex w-full'>
  
      <div className='mt-10'>
        <h1 className=' text-left ml-20 mt-10 font-bold text-violet-950 text-6xl'>Share your Linktree from<br/> your Instagram, TikTok,<br/>Twitter and other bios</h1>
        <h6 className='text-left ml-20 mt-10  text-violet-950'>Add your unique Linktree URL to all the platforms and places you find your<br />audience. Then use your QR code to drive your offline traffic online.</h6>
      <button className=' ml-20 bg-violet-500 hover:bg-violet-400 rounded-full mt-10 px-2 h-8 mb-10'>Get started for free </button>
      </div>
      <a href="https://linktree.com" target="_blank" className="ml-16 mt-20 md-5 border-10 ">
        <img src={treeImage} alt="treeImage" className="h-60 w-60" />
      </a>
    </div>
  </div>
</div>
)
}
export default Home;