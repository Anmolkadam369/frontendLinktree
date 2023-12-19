
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import logoImage from '../images/download.png';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';


function AboutYou(){
    const navigate = useNavigate();
    const auth = useAuth();
    const token = auth.authData.token;
    const userId = auth.authData.userId;
    console.log("mytoken", auth.authData.token)
    console.log("useId", auth.authData.userId)
    let array = ["business", "Influencer & Digital Creator", "Education","Entertainment","fashion & Beauty", "Food & Beverage", "Government & Politics", "Health & Wellness", "Non-Profit", "Other", "Tech", "Travel & Touirsm"];
    const [errorMessage, setErrorMessage] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [clickedTwice, setIsClickedTwice] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedValueSubCat, setSelectedValueSubCat] = useState(null);

    let[shownArray, setShownArray] = useState([]);
    const [formData, setFormData] = useState({
        name : "",
        selectedValue:"",
        selectedValueSubCat:'',
      });
    const [formErrors, setFormErrors] = useState({
        name : ""
      });

      function validateForm(){
        let valid=true;
        const errors={};

        if(!formData.name.trim()){
            errors.name='name is required';
            valid=false
        }
        else if(!/^[A-Za-z]+(?:\s[A-Za-z]+)?$/.test(formData.name)){
            errors.name = "Invalid name";
            valid=false;
        }
        setFormErrors(errors);
        return valid;
      }
      function showData(){
        if(!validateForm()) return;
         setIsClicked(true)
      }

      const handleButtonCategory = (value) => {
        console.log("some1")
        setIsClickedTwice(true)
        setSelectedValue(value);
        if(value =="business"){ 
            let dummyArray = ['Agency & Consulting','Automobiles', 'Crafts', 'Financial Services', 'Home Imporvements & Maintenance',
        "HR & Recruiting", "legal Services", "Marketing & Advertising", "Public Relations", "Real Estate", "Recreation"];
            setShownArray(dummyArray)
        }
        if(value =="Influencer & Digital Creator"){ 
            let dummyArray = ['Agency & Consulting','Adult', 'Cosplay', 'Crafts', 'Designer','Model',"Visual Arts", 
            "Fashion & Beauty","Lifestyle", "Other"];
            setShownArray(dummyArray)
        }
        if(value =="Influencer & Digital Creator"){ 
            let dummyArray = ['Agency & Consulting','Adult', 'Cosplay', 'Crafts', 'Designer','Model',"Visual Arts", 
            "Fashion & Beauty","Lifestyle", "Other"];
            setShownArray(dummyArray)
        }
        if(value =="Education"){ 
            let dummyArray = ['Agency & Consulting','Campus Organization', 'Schools & Universities', 'Teacher', 'E-learning' ];
            setShownArray(dummyArray)
        }
        if(value =="Entertainment"){ 
            let dummyArray = ['Agency & Consulting','Actor', 'Comedy', 'Crafts', 'Dance & Theatre','Film & TV',"Gaming & Esports", 
            "Live Events","Music", "Performance Art","Publications & Digital Media", "Radio & Podcasts","Sports","Talent Agency", "Talent Management"];
            setShownArray(dummyArray)
        }
        if(value =="fashion & Beauty"){ 
            let dummyArray = ['Agency & Consulting','Clothing & Accesssories', 'Fragrances', 'Jewelry', 'Makeup & Skincare','Nail Care',"Shoes", 
            "Tatoos & Peircings"];
            setShownArray(dummyArray)
        }
        if(value =="Food & Beverage"){ 
            let dummyArray = ['Agency & Consulting','Alcohol', 'Bars & Restraurants', 'Chef', 'Coffee & Tea','Desserts',"Groceries", 
            "Home Cooking"];
            setShownArray(dummyArray)
        }
        if(value =="Government & Politics"){ 
            let dummyArray = ['Agency & Consulting','Activism', 'Countries & Municipalities', 'Emergency Services', 'Judiciary','Law Enforcement',"Library", 
            "Military & Veterans","Policy", "Politicians & Campaigns","Public Services"];
            setShownArray(dummyArray)
        }
        if(value =="Health & Wellness"){ 
            let dummyArray = ['Agency & Consulting','Cannabis', 'Fitness', 'Life Coaching', 'Healthcare','Nutrition',"Retreats & Spa", 
            "Spirituality"];
            setShownArray(dummyArray)
        }
        if(value =="Non-Profit"){ 
            let dummyArray = ['Agency & Consulting','Climate', 'Community Organization', 'Disaster Relief', 'Diversity & Inclusion','Museums',"Wildlife"];
            setShownArray(dummyArray)
        }
        if(value =="Other"){ 
            let dummyArray = ['Agency & Consulting','Affiliate Marketing', 'Contensts & Giveaways', 'Crowdfunding', 'Election Press Kit','Fan Club',"Memes", 
            "Personal","Pets", "Portfolio","Public Figure","Religion","Not Listed"];
            setShownArray(dummyArray)
        }
        if(value =="Tech"){ 
            let dummyArray = ['Agency & Consulting','Education', 'Fintech', 'Hardware', 'Mobile App','SaaS',"Social Media"];
            setShownArray(dummyArray)
        }
        if(value =="Travel & Touirsm"){ 
            let dummyArray = ['Agency & Consulting','Attractions', 'Hotels & Lodging', 'Transportation'];
            setShownArray(dummyArray)
        }
      };


      const handleButtonSubCategory = (value)=>{
        setSelectedValueSubCat(value)
      }

      function continueButton(){
        
       console.log('selectedValue:', selectedValue);
  console.log('selectedValueSubCat:', selectedValueSubCat);

  const updatedFormData = {
    ...formData,
    selectedValue: selectedValue,
    selectedValueSubCat: selectedValueSubCat,
  };

  console.log('updatedFormData:', updatedFormData);

  fetch(`https://linktreeclone-3hlf.onrender.com/includeName/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedFormData),
  })
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    if (result.status == true) {
      console.log('tonextpage');
      const email = result.data.email;
      console.log("emssssssssssail",email)
      navigate('/verification', { state: { email } });
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

    return (
        <div>
          <div className='flex h-12 w-full rounded-md'>
            <a href="https://linktree.com" target="_blank" className="h-6 w-20 ml-4 mt-3 md-5 border-4 rounded">
              <img src={logoImage} alt="linktree logo" />
            </a>
          </div>
        
          <div className='text-left ml-20 '>
          <div className='text-left ml-20 '>
            <h1 className='ml-20 mt-20 text-4xl font-extrabold '>Tell us about yourself</h1>
            <h1 className='ml-20 mt-5'>This will personalize your Linktree experience.!</h1>
            
              <input
            type="text"
            name="name"
            className='ml-20 mt-5 box-content h-1 w-1/4 p-4 border-2 '
            placeholder='Tell us your Name'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {formErrors.name && <div className="text-red-500 ml-20 mt-2">{formErrors.name}</div>}
        <br/>
           <button className= ' ml-20 mt-10 h-10 w-1/4 text-white border-2 rounded-full bg-blue-900' onClick={showData}>Continue</button>
           
           
           {isClicked && (
        <div className='ml-20 mt-10 w-1/2'>
            <p className='font-bold'>Select one category that best describes your Linktree:</p>
        {array.map((item, index) => (
          <button
            key={index}
            className={`mt-4 mr-4 bg-white hover:bg-orange-300 text-gray-500 font-bold px-2 border-2 rounded-full ${
              selectedValue === item ? 'border-blue-500' : ''
            }`}
            onClick={() => handleButtonCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      )}
            {clickedTwice && (
                <div className='ml-20 mt-10 w-1/2'>
                <p className='font-bold'>Pick your Business category (optional):</p>
        {shownArray.map((item, index) => (
          <button
            key={index}
            className={`mt-4 mr-4 bg-white hover:bg-orange-300 text-gray-500 font-bold px-2 border-2 rounded-full ${
              selectedValue === item ? 'border-blue-500' : ''
            }`}
            onClick={() => handleButtonSubCategory(item)}
          >
            {item}
          </button>
        ))}
        <br />
           <button className= ' mt-10  mb-10 h-10 w-1/2 text-white border-2 rounded-full bg-blue-900' onClick={continueButton}>Continue</button>
      </div>
      )}

            

          </div>
        </div>
        </div>
      );


}

export default AboutYou;