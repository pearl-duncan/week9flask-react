import React, { useState } from 'react'
import Navbar from './Navbar';
import './main.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import News from './News';
import Feed from './Feed';
import SinglePost from './Post';
import SignUp from './Signup';
import CreatePost from './CreatePost';


const getUserFromLS = () => {
    const foundUser = localStorage.getItem('user131');
    if (foundUser) {
        return JSON.parse(foundUser)
    }
    else return null
};

export default function AppFunction() {
    const [user, setUser] = useState(getUserFromLS)
    const [count, setCount] = useState(0)

    const addToCount = () => {
        setCount(count+1)
    }

    const logMeIn = (user) => {
        setUser(user);
        localStorage.setItem('user131', JSON.stringify(user))
    };
    const logMeOut = () => {
        setUser(null)
        localStorage.removeItem('user131')
    };

    return (
        <div>
            <Navbar user={user} logMeOut={logMeOut}/>

            <Routes>
                <Route path='/' element={<Home count={count} addToCount={addToCount} />} />
                <Route path='/login' element={<Login logMeIn={logMeIn}/>} />
                <Route path='/news' element={<News />} />
                <Route path='/posts' element={<Feed />} />
                <Route path='/posts/:postId' element={<SinglePost />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/posts/create' element={<CreatePost user={user} />}/>
            </Routes>
        </div>
    )

}