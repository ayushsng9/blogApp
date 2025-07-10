import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Select, Input, RTE } from '../index';
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) =>
        state.auth ? state.auth.userData : null
    );

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-');
        }
        return '';
    }, []);

    
    useEffect(() => {
        if (post?.title) {
            setValue('slug', slugTransform(post.title), {
                shouldValidate: true,
            });
        }
    }, [post, slugTransform, setValue]);

    
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        if (post) {
            let file = null;

            if (data.image && data.image[0]) {
                file = await service.uploadFile(data.image[0]);
                await service.deleteFile(post.featuredImage);
            }

            const updatedPost = await service.updatePost(post.$id, {
                title: data.title,
                content: data.content,
                slug: data.slug,
                status: data.status,
                featuredImage: file ? file.$id : post.featuredImage,
            });

            if (updatedPost) navigate(`/post/${updatedPost.$id}`);
        } else {
            const file = data.image[0]
                ? await service.uploadFile(data.image[0])
                : null;

            if (file) {
                data.featuredImage = file.$id;

                const newPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                    authorName: userData.name
                });

                if (newPost) navigate(`/post/${newPost.$id}`);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap bg-slate-900 p-8 rounded-lg shadow-xl border border-slate-800"
        >
            <div className="w-full lg:w-2/3 px-2 mb-4 lg:mb-0">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 bg-slate-800 border-slate-700 text-gray-900 placeholder-slate-400 focus:border-fuchsia-500 focus:ring-fuchsia-500"
                    labelClass="text-slate-200"
                    {...register('title', { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 bg-slate-800 border-slate-700 text-gray-900 placeholder-slate-400 focus:border-fuchsia-500 focus:ring-fuchsia-500"
                    labelClass="text-slate-200"
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>

            <div className="w-full lg:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 bg-slate-800 border-slate-700 text-gray-900 placeholder-slate-400 focus:border-fuchsia-500 focus:ring-fuchsia-500"
                    labelClass="text-slate-200"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4 rounded-lg overflow-hidden border border-slate-700">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}
                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className="mb-4 bg-slate-800 border-slate-700 text-gray-900 focus:border-fuchsia-500 focus:ring-fuchsia-500"
                    labelClass="text-slate-200"
                    {...register('status', { required: true })}
                />
                <Button
                    type="submit"
                    bgColor="bg-fuchsia-600"
                    className="w-full text-white font-bold py-3 rounded-lg transition-colors duration-300 shadow-md hover:bg-fuchsia-700 hover:shadow-lg"
                >
                    {post ? 'Update Post' : 'Create Post'}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
