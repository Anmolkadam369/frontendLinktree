import { react, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from '../images/download.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes, faLink, faPersonMilitaryPointing, faFolder } from '@fortawesome/free-solid-svg-icons';



function DashBoard() {
  const [isDivVisible, setDivVisibility] = useState(false);
  const [isDivVisible2, setDivVisibility2] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [isShowAddedLink, setIsShowAddedLink] = useState(false);
  const [wholeAddedLinks, setWholeAddedLinks] = useState([]);
  const [headers, setHeaders] = useState([]);

  const [addedHeder, setAddedHeder] = useState({
    headerInfo: '',
  });

  const [addedLink, setAddedLink] = useState({
    accName: '',
    link: '',
  });

  console.log(addedLink)
  console.log("whole added ", wholeAddedLinks)



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddedLink((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value)
  }

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setAddedHeder((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("header", name, value)
  }



  const addLink = () => {
    console.log("wholeAddedLinks.length", wholeAddedLinks.length)
    if (wholeAddedLinks.length < 3) {
      if (addedLink.accName.trim() !== '' && addedLink.link.trim() !== '') {
        setIsShowAddedLink(true);
        const newAddedLinks = [...wholeAddedLinks, addedLink];
        console.log("newAddedLinks", newAddedLinks);
        setWholeAddedLinks(newAddedLinks);
        setAddedLink({
          accName: '',
          link: '',
        });
        // setErrorMessage(''); // Clear any existing error message
      } else {
        setErrorMessage('Please enter both account name and link');
        console.log("Error Message Set:", errorMessage);
      }
    } else {
      setErrorMessage('You can only add up to 3 links.');
      console.log("Error Message Set:", errorMessage);
      setAddedLink({
        accName: '',
        link: '',
      });
    }
  };


  const addHeaderHere = () => {
    console.log("himmat", addedHeder)
    setIsShowAddedLink(true);
    if (addedHeder.headerInfo.trim() !== '') {
      headers.pop();
      const newAddedHeader = [...headers, addedHeder.headerInfo];
      setHeaders(newAddedHeader);
      setAddedHeder({
        headerInfo: '',
      });
    }
    else {
      console.error('Please enter headerInfo');
    }
  }
  console.log("header", headers)

  const toggleDivVisibility = () => {
    setDivVisibility(!isDivVisible);
  };

  const toggleDivVisibility2 = () => {
    setDivVisibility2(!isDivVisible2);
  };

  const deleteItem = (index) => {
    const updatedLinks = [...wholeAddedLinks];
    updatedLinks.splice(index, 1);
    setWholeAddedLinks(updatedLinks);
  };

  const editItems = (index) => {
    const edit = wholeAddedLinks[index];
    setAddedLink({
      accName: edit.accName,
      link: edit.link,
    })
    const updatedLinks = [...wholeAddedLinks];
    updatedLinks.splice(index, 1);
    setWholeAddedLinks(updatedLinks);
  }

  const submitted = ()=>{
    const updatedData ={
      header : headers,
      wholeAddedLinks:wholeAddedLinks,
    }

    fetch('https://linktreeclone-3hlf.onrender.com/createdLinkTree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          console.log(result);
          // navigate(`/moreInfo`);
        }
         else {
          setErrorMessage(result.message);
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  }


  return (
    <div>
      <div className='flex h-12 w-full rounded-md'>
        <a href="https://linktree.com" target="_blank" className="h-6 w-20 ml-4 mt-3 md-5 border-4 rounded">
          <img src={logoImage} alt="linktree logo" />
        </a>
      </div>
      <div className=' flex h-12  mt-5 md-5 ml-9 rounded-full bg-orange-200 text-gray-500 '>
        <p className='p-3 ml-10 font-bold text-blue-500  '> Your Linktree is live: </p>
        <p className='ml-auto p-3 font-bold text-blue-500 '> Share your Linktree to your socials </p>
      </div>
      <div className='ml-20'>
        <p className='p-5 ml-20 shadow text-yellow-800'>Set up your Linktree</p>
        <div className='flex ml-20'>


          <div className=" ml-5 flex items-center justify-center mb-4">
            <button className='h-14  rounded bg-white-900 hover:bg-orange-200 font-bold text-blue-800 border-2 p-4  flex justify-center border-black'>
              <FontAwesomeIcon icon={faLink} className='text-white rounded bg-green-900 p-1 mr-2' />
              Add 3 Links
            </button>
          </div>

          <div className=" flex items-center justify-center mb-4">
            <button className=' ml-20  h-14  rounded bg-white-900 hover:bg-orange-200 font-bold text-blue-800 border-2 p-4 flex justify-center border-black'>
              <FontAwesomeIcon icon={faPersonMilitaryPointing} className='text-white rounded bg-green-900 p-1 mr-2' />
              Customize Your Page
            </button>
          </div>
        </div>
        <div className=' flex  justify-center h-12 w-1/2 mt-5 md-5 ml-20 rounded-full bg-orange-200 text-green-500 ' onClick={toggleDivVisibility} >
          <p className='p-3 font-extrabold '> + Add Your Links </p>
        </div>

        <div className=" mt-10 ml-20  items-center justify-center mb-4 ">
          <button className='h-14  rounded bg-white-900 hover:bg-orange-200 font-bold text-purple-500 border-2 p-4 flex justify-center' onClick={toggleDivVisibility2}>
            <FontAwesomeIcon icon={faFolder} className='text-white rounded bg-green-900 p-1 mr-2' />
            + Add Headers </button>
        </div>

        {isDivVisible2 && (
          <div className='flex relative mb-10'>
            <input
              type="text"
              name="headerInfo"
              className='ml-20 mt-5 box-content h-1 w-1/4 p-4 border-2'
              placeholder='Enter Header'
              value={addedHeder.headerInfo}
              onChange={handleInputChange2}
            />

            <button className='ml-10 h-14 mt-3 rounded-full bg-white-900 hover:bg-blue-300 font-bold text-purple-500 border-2 p-4 flex items-center justify-center border-black' onClick={addHeaderHere}>
              <FontAwesomeIcon icon={faFolder} className='text-white rounded bg-green-900 p-1 mr-2' />
              Add
            </button>
            <button
              className='absolute top-0 right-0 m-2 cursor-pointer font-extrabold'
              onClick={toggleDivVisibility2}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}


        {isDivVisible && (
          <div className='border-2 border-solid border-black '>

            <div className='flex relative mb-10'>
              <input
                type="text"
                name="accName"
                className='ml-20 mt-5 box-content h-1 w-1/4 p-4 border-2'
                placeholder='Enter Account Name'
                value={addedLink.accName}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="link"
                className='ml-20 mt-5 box-content h-1 w-1/4 p-4 border-2'
                placeholder='Enter Your Link'
                value={addedLink.link}
                onChange={handleInputChange}

              />
              <button className='ml-10 h-14 mt-3 rounded-full bg-white-900 hover:bg-blue-300 font-bold text-purple-500 border-2 p-4 flex items-center justify-center border-black' onClick={addLink} disabled={wholeAddedLinks.length > 3}>
                <FontAwesomeIcon icon={faFolder} className='text-white rounded bg-green-900 p-1 mr-2' />
                Add
              </button>
              <button
                className='absolute top-0 right-0 m-2 cursor-pointer font-extrabold'
                onClick={toggleDivVisibility}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="text-red-500 ml-20 mt-2 text-center">
            <p>{errorMessage}</p>
          </div>
        )}

        {isShowAddedLink && (
          <div className=' ml-20 mr-20 mb-20 mt-5  p-5 rounded bg-orange-200 text-gray-900'>
            {headers.length != 0 && (
              <p className='ml-20 w-1/2 rounded-full p-6 bg-yellow-300 mb-10 '>{headers}</p>
            )}
            {isShowAddedLink ? (
              <div>
                {wholeAddedLinks.map((link, index) => (
                  <div className='ml-20 w-1/2 rounded-full p-6 bg-green-300 mb-10 mt-10' key={index}>
                    <p>Account Name: {link.accName}</p>
                    <p>Account Link: {link.link}</p>
                    <button className='mt-3  ml-20 rounded bg-white-900  text-gray-900' onClick={() => editItems(index)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className='ml-5 rounded bg-white-900  text-red-500' onClick={() => deleteItem(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
                <div className="flex items-center justify-center">
                <button className='ml-10 h-14 mt-5 rounded-full bg-green-600 hover:bg-blue-300 font-bold text-purple-500 border-2 p-4 flex items-center justify-center border-black' onClick={submitted}>
                  Go For it
                </button>
                </div>


              </div>

            ) : (
              <div>
                <p>Add your link buddy !!! </p>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  )
}

export default DashBoard;