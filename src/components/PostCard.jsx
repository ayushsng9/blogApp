import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-slate-900 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-800'>
            <div className='w-full mb-4 overflow-hidden rounded-lg'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300' />
            </div>
            <h2
            className='text-xl font-semibold text-white truncate'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard