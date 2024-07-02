import {Button, Grid, TextField, Typography} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {BlogMutation} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate, useParams} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const NewPost = () => {

    const data = new Date();
    const todayDate = `${data.getDate().toString().padStart(2, '0')}.${(data.getMonth() + 1).toString().padStart(2, '0')}.${data.getFullYear().toString()} ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`;
    const params = useParams();

    const [blogPost, setBlogPost] = useState<BlogMutation>({
        title: '',
        description: '',
        date: todayDate
    });

    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate()

    const readInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setBlogPost((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }



    const formSubtim = async (e: React.FormEvent) => {
        e.preventDefault()
        setSpinner(true)

        try {
            if (params.id) {
                await axiosApi.put(`/blog/${params.id}/.json`, blogPost)
            } else {
                await axiosApi.post('/blog.json', blogPost);
            }
        } catch (e) {
            console.error('Error', e);
        }
        setSpinner(false)
        navigate('/')

    }

    const fetchData = useCallback( async () => {

        if (params.id) {
            const response = await axiosApi.get(`/blog/${params.id}.json`);
            const data = response.data;
            setBlogPost(prevState => {
                return {
                    ...prevState,
                    title: data.title,
                    description: data.description
                }
            })
        }

    },[])

    useEffect(() => {
        void fetchData()
    }, [fetchData]);

    if (spinner) {
        return <Spinner />
    }

    return (
        <>
        <Grid onSubmit={formSubtim} component="form" sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <Grid item>
                {
                    params.id ? <Typography variant="h5">Edit post</Typography> : <Typography variant="h5">New post</Typography>
                }
            </Grid>
            <Grid item>
                    <TextField onChange={readInput} name="title" value={blogPost.title} id="outlined-basic" label="Title" variant="outlined" sx={{width:'100%'}} required/>
            </Grid>
            <Grid item>
                <Typography variant="h6">Description</Typography>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={10}
                    variant="outlined"
                    sx={{ width: '100%' }}
                    onChange={readInput}
                    name="description"
                    value={blogPost.description}
                    required
                />
            </Grid>
            <Grid item>
                <Button type="submit" variant="contained">Enter</Button>
            </Grid>
        </Grid>
        </>
    );
};

export default NewPost;