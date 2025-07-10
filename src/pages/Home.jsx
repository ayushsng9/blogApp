import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authStatus) {
            appwriteService.getPosts([]).then((posts) => {
                if (posts) setPosts(posts.documents);
            });
        } else {
            setPosts([]);
        }
    }, [authStatus]);

    // Logged-out Hero Section
    if (!authStatus) {
        return (
            <div className="relative w-full min-h-screen overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)] animate-pulse"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(139,92,246,0.3),transparent_50%)] animate-pulse"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-float-delayed"></div>
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-xl animate-bounce"></div>
                </div>

                <div className="relative z-10 flex items-center justify-center min-h-screen py-20 px-4">
                    <Container>
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-8 backdrop-blur-sm">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-purple-300 text-sm font-medium">Join 10,000+ Writers</span>
                            </div>

                            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6 leading-tight tracking-tight">
                                Discover & Share
                                <br />
                                <span className="text-5xl md:text-6xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                                    Your Stories
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                                Join our premium community of writers and thinkers. Share your unique perspective with the world and connect with like-minded creators.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                                <Link
                                    to="/signup"
                                    className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        Get Started Free
                                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </Link>
                                <Link
                                    to="/login"
                                    className="group px-10 py-4 border-2 border-purple-500/50 text-purple-300 font-bold rounded-2xl text-lg shadow-lg hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-200 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                                >
                                    Sign In
                                </Link>
                            </div>

                            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500 text-sm">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                                    <span>100% Free to Start</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                                    <span>No Credit Card Required</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                                    <span>Premium Features</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>

                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                    @keyframes float-delayed {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }
                    .animate-float-delayed {
                        animation: float-delayed 6s ease-in-out infinite 2s;
                    }
                `}</style>
            </div>
        );
    }

    // No posts found
    if (authStatus && posts.length === 0) {
        return (
            <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"></div>
                <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
                    <Container>
                        <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                            No posts at the moment.
                            </h1>
                            <p className="text-base md:text-lg text-slate-400 max-w-md">
                                Check back later to discover new stories from our creative community.
                            </p>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }

    // Show Posts
    return (
        <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>

            <div className="relative z-10 py-16 px-4">
                <Container>
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-4 tracking-tight">
                            Latest Stories
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Discover compelling stories and groundbreaking ideas shared by our community of passionate writers.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {posts.map((post, index) => (
                            <div
                                key={post.$id}
                                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl shadow-2xl hover:shadow-purple-500/20 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transform hover:scale-105 transition-all duration-500 overflow-hidden"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 p-1">
                                    <PostCard {...post} />
                                </div>
                                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-500/30 transition-all duration-300"></div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}

export default Home;
