import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class Post extends Component {
  render() {
    const p = this.props.postInfo
    return (
        <div className="card mx-auto" style={{ width: '18rem' }}>
            <img src={p.img_url} className="card-img-top" alt={p.title}/>
            <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <h6 className='card-subtitle mb-2 text-body-secondary'>{p.author}</h6>
                <p className="card-text">{p.caption}</p>
                <Link to={`/posts/${p.id}`} className="btn btn-primary">Go to post</Link>
                <Link to={'/'} className="btn btn-success">Like</Link>

            </div>
        </div>
    )
  }
}
