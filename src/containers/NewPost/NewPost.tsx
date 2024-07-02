import {Button, Grid, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {BlogMutation} from "../../types";
import axiosApi from "../../axiosApi";

const NewPost = () => {

    const data = new Date();
    const todayDate = `${data.getDate().toString().padStart(2, '0')}.${(data.getMonth() + 1).toString().padStart(2, '0')}.${data.getFullYear().toString()}`;

    const [blogPost, setBlogPost] = useState<BlogMutation>({
        title: '',
        description: '',
        date: todayDate
    });

    const readInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setBlogPost((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const formSubtim = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await axiosApi.post('/blog.json', blogPost);
            console.log(blogPost);
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <Grid onSubmit={formSubtim} component="form" sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <Grid item>
                <Typography variant="h5">New post</Typography>
            </Grid>
            <Grid item>
                    <TextField onChange={readInput} name="title" value={blogPost.title} id="outlined-basic" label="Title" variant="outlined" sx={{width:'100%'}}/>
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
                />
            </Grid>
            <Grid item>
                <Button type="submit" variant="contained">Enter</Button>
            </Grid>
        </Grid>
    );
};

export default NewPost;