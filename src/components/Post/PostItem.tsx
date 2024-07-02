import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import React from "react";
import {NavLink} from "react-router-dom";

interface Props {
    date: string;
    title: string;
    id: string;
}

const PostItem: React.FC<Props> = ({date, title, id}) => {
    return (
        <Card sx={{ minWidth: 275, marginTop: 3}}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {date}
                </Typography>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                </CardContent>
            <CardActions>
                <Button component={NavLink} to={`/posts/${id}`} sx={{color:'inherit'}}>More</Button>
            </CardActions>
        </Card>

    );
};

export default PostItem;