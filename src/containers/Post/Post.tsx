import {NavLink, useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {useCallback, useEffect, useState} from "react";
import {apiBlog} from "../../types";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import Spinner from "../../components/Spinner/Spinner";

const Post = () => {
    const [drawPost, setDrawPost] = useState<apiBlog>();
    const params = useParams();
    const link = `/blog/${params.id}.json`
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(false);



    const fetchData = useCallback(async () => {
        setSpinner(true)
        try {
            const response = await axiosApi.get<apiBlog | null>(link);
            const onePost = response.data;

            if (onePost !== null) {
                setDrawPost(onePost)
            }
        } catch (error) {
            console.log(error)
        }
        setSpinner(false)
    }, [])

    useEffect(() => {
        void fetchData()
    }, [fetchData]);

    const deletePost = async () => {
        await axiosApi.delete(`/blog/${params.id}.json`)
        navigate('/')
    }

    if (spinner) {
        return <Spinner />
    }

    return (
        <Card sx={{ minWidth: 275, marginTop: 5 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {drawPost?.date}
                    </Typography>
                    <Box>
                        <Button component={NavLink} to={`/posts/${params.id}/edit`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'green', fontSize: '16px' }}>
                            Edit
                        </Button>
                        |
                        <Button onClick={deletePost} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red', fontSize: '16px' }}>
                            Delete
                        </Button>
                    </Box>
                </Box>
                <Typography variant="h5" component="div">
                    {drawPost?.title}
                </Typography>
                <Typography variant="body2" style={{fontSize: '18px', marginTop: '10px'}}>
                    {drawPost?.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Post;