import React, { useState } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CreatePost = ({ user }) => {
    // controlled form
    const [title, setTitle] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [caption, setCaption] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            title,
            caption,
            img_url : imgUrl
        }

        const url = BACKEND_URL + '/api/posts/create'
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify(body)
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok'){
            // show message
            // redirect to feed
        }





    };


    return (
        <div className='text-center p-4'>
            <h1>Create a Post</h1>
            <form onSubmit={handleSubmit} className='mx-auto col-4 rounded border p-4 text-start'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="title"
                        name='title'
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imgUrl" className="form-label">Image URL</label>
                    <input
                        type="text"
                        name='imgUrl'
                        className="form-control"
                        id="imgUrl"
                        value={imgUrl}
                        onChange={(e)=>{setImgUrl(e.target.value)}}
                        />
                </div>
                <div className="mb-3">
                    <label htmlFor="caption" className="form-label">Caption</label>
                    <input type="text" name='caption' className="form-control" id="caption" value={caption}
                        onChange={(e)=>{setCaption(e.target.value)}}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default CreatePost