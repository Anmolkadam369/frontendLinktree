import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import logoImage from '../images/download.png';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LoginPage() {
    const auth = useAuth();
    const navigate = useNavigate();
   
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    function validateForm() {
        let valid = true;
        const errors = {};
        console.log(errors)
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
            valid = false;
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
            valid = false;
        } else if (
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}/.test(formData.password)) {
            errors.password = 'Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character';
            valid = false;
        }


        setFormErrors(errors);
        return valid;
    }

    function createAccount() {

        if (!validateForm()) {
            return;
        }

        console.log(formData);

        fetch('https://linktreeclone-3hlf.onrender.com/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.status === true) {
                    console.log(result);
                    console.log("____________________")
                    console.log(result.data.userName, result.tokenData.token, result.tokenData.userId)
                    let comingToken = result.tokenData.token;
                    const comingUserId = result.tokenData.userId;
                    console.log("some", comingToken, comingUserId)

                    // Pass an object with token and userId properties
                    auth.saveAuthData({ token: comingToken, userId: comingUserId });
                    navigate(`/userAuth/dashBoard`);
                }
                else {
                    setErrorMessage('Username is already registered. Please choose a different username.');
                }
            })
            .catch((error) => {
                console.error('error', error);
            });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(name, value);
    };

    return (
        <div>
            <div className='flex h-12 w-full rounded-md'>
                <a href="https://linktree.com" target="_blank" className="h-6 w-20 ml-4 mt-3 md-5 border-4 rounded">
                    <img src={logoImage} alt="linktree logo" />
                </a>
            </div>

            <div className='text-center'>
                <h1 className='text-center mt-10 text-3xl font-extrabold '>Welcome back </h1>
                <h1 className='text-center mt-5'>Sign in ! </h1>

                <input
                    type="text"
                    name="email"
                    className='mt-5 box-content h-1 w-1/2 p-4 border-2 '
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.email && <div className="text-red-500 mt-2">{formErrors.email}</div>}

                <input
                    type='password'
                    name="password"
                    className='mt-5 box-content h-1 w-1/2 p-4 border-2 '
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />

                {formErrors.password && <div className="text-red-500 mt-2">{formErrors.password}</div>}

                <button className='mt-10 h-10 w-1/2 text-white border-2 rounded-full bg-blue-900' onClick={createAccount}>Sign In</button>

                {errorMessage && (
                    <div className="text-red-500 mt-2">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginPage;


