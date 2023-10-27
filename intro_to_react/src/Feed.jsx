import React, { Component } from 'react'
import Post from './Post';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class Feed extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        }
    };

    getPosts = async () => {
        const url = BACKEND_URL + '/api/posts'
        const res = await fetch(url)
        const data = await res.json();
        console.log(data);
        if (data.status === 'ok'){
            this.setState({posts: data.posts})
        }
    };

    showPosts = () => {
        if (this.state.posts.length === 0){
            return <h2>Loading...</h2>
        }
        else {
            return this.state.posts.map(p => <Post key={p.id} postInfo={p}/>)
        }
    }

    componentDidMount(){
        this.getPosts()
    }

  render() {
    return (
      <div className='container'>
        <h1>My Feed</h1>
        {this.showPosts()}
      </div>
    )
  }
}
