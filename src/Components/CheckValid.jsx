import { react, useState } from 'react'
import { useNavigate,useLocation,useParams } from 'react-router-dom';
import logoImage from '../images/download.png';
import { useAuth } from './AuthContext';

    function CheckValid(){
      const navigate = useNavigate();
        const [email, setEmail] = useState("");
        
        const[isResendMail, setIsResendMail] = useState(false);
        const {token} = useParams();
        console.log("oyeeee1",token)

        console.log("email", email)

        const emailVerification=()=>{
            fetch (`http://localhost:3001/verification2`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({email:email})
            })
            .then((response) => response.json())
            .then((result) => {
            console.log(result);
            if (result.status == true) {
                console.log("mail sent")
              console.log('tonextpage');
            }
          })
          .catch((error) => {
            console.error('error', error);
          });
        }

        function clicked(){
        fetch(`http://localhost:3001/validation/${token}`,{
            method:"GET",
        })
        .then((response)=>response.json())
        .then((result) => {
            console.log(result);
            if (result.status == true) {
              console.log('right');
              navigate("/userAuth/dashBoard")
            }
            if (result.status == false){
                 console.log("time out!!!");
                 setEmail(result.email)
                 setIsResendMail(true);
                }
          })
          .catch((error) => {
            console.error('error', error);
          });
        }



        const handleInputChange=(e)=>{
            const{name, value} = e.target;
           setFormData((prevData)=>({
            ...prevData,
            [name]:value,
           }))
           console.log(name,value)
          }
        return(
          <div>
            <div className='flex h-12 w-full rounded-md'>
                <a href="https://linktree.com" target="_blank" className="h-6 w-20 ml-4 mt-3 md-5 border-4 rounded">
                    <img src={logoImage} alt="linktree logo" />
                </a>
            </div>
            <div className='text-center'>
           <h1 className='ml-20 mt-20 text-4xl font-extrabold '>Your account has<br/>been verified </h1> 
           <button className= 'ml-20 mt-10  mb-10 h-10 w-1/4 text-white border-2 rounded-full bg-blue-900' onClick={clicked} >Sign In To Continue</button>
            {isResendMail && (
                <div className='text-center'>
                <h1 className='ml-20 mt-20 text-4xl font-extrabold '>Opps!!! You timed Out!!!</h1>
           
                <h5 className='mt-5 '>Click here to resend Mail</h5>
           <button className= ' ml-20 mt-10  mb-10 h-10 w-1/4 text-white border-2 rounded-full bg-blue-900' onClick={emailVerification} >resend Mail</button>

                </div>
            )}
            </div>
            </div>
        )
    }
export default CheckValid;