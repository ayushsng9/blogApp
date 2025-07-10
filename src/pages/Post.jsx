import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        if (!post) return;
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 bg-slate-950 text-white min-h-[calc(100vh-16rem)]">
            <Container>
                <div className="w-full max-w-4xl mx-auto flex justify-center mb-8 relative p-2 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full h-96 object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 z-10 space-x-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-fuchsia-600"
                                    className="px-5 py-2.5 font-semibold text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-fuchsia-700"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-red-600"
                                className="px-5 py-2.5 font-semibold text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-red-700"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2">
                        {post.title}
                    </h1>
                    <p className="text-lg text-slate-400 font-medium">
                        By:{" "}
                        <span className="text-fuchsia-400">
                            {post.authorName || "Unknown Author"}
                        </span>
                    </p>
                </div>

                <div className="browser-css text-slate-200 leading-relaxed text-lg max-w-4xl mx-auto">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
