//rfc react functional component 
//rcc react class component
//extends = inheriets 


import React, { Component } from 'react';
import Navbar from './Navbar';
import './main.css' ;
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import News from './News';
import Feed from './Feed';
import Signup from './Signup';
import SinglePost from './SinglePost';
import ToDo from './ToDo';


export default class App extends Component {
constructor() {
  super();
  this.state = {
    user: null,
    count: 0,
    toDo: []
  }
  console.log('i am constructing')
}

addToCount = () => {
  this.setState({
    count: this.setState.count + 1
  })
}

logMeIn = (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  this.setState({user: username})
}

addToDo = (e) => {
  e.preventDefault();
  const inputToDo = e.target.toDo.value;
  this.setState({toDo: inputToDo})
};

componentDidMount(){
  console.log('i have just mounted')
}

  render() {
    console.log('i am rendering')
    return (
      <div>
        <Navbar user={this.state.user}/>

        <Routes>
          <Route path='/' element={<Home count={this.state.count} addToCount={this.addToCount} />} />
          <Route path='/user/login' element={<Login user={this.state.user} />} />
          <Route path='/news' element={<News />} />
          <Route path='/posts' element={<Feed/>} />
          <Route path='/posts/:postId' element={<SinglePost />}/>
          <Route path='/user/create' element={<Signup />}/>
          <Route path='/to-do' element={<ToDo todo={this.state.toDo} />}/>

        </Routes>
        <Footer />
      </div>
    )
  }
}

