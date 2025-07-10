import React, {useState, useEffect} from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector(state => state.auth.userData);
    const status = useSelector(state => state.auth.status);

    useEffect(() => {
        if (userData) { 

            appwriteService.getPosts([
               
            ]).then((allPosts) => {
                if (allPosts) {
                    
                    const userPosts = allPosts.documents.filter(post => post.userId === userData.$id);
                    setPosts(userPosts);
                }
            });
        } else {
            setPosts([]);
        }
    }, [userData]);

    if (!status) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-slate-950 text-white min-h-[calc(100vh-16rem)] flex items-center justify-center">
                <Container>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                        Please log in to view your posts.
                    </h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-slate-950 text-white min-h-[calc(100vh-16rem)] flex items-center justify-center">
                <Container>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                        You haven't created any posts yet.
                    </h1>
                </Container>
            </div>
        );
    }


    return (
        <div className='w-full py-8 bg-slate-950 text-white min-h-[calc(100vh-16rem)]'>
            <Container>
                <div className='flex flex-wrap -m-2'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;