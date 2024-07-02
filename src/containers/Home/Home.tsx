import PostItem from "../../components/Post/PostItem";
import axiosApi from "../../axiosApi";
import { useCallback, useEffect, useState } from "react";
import { apiBlogs, Blog } from "../../types";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
    const [posts, setPosts] = useState<Blog[]>([]);
    const [spinner, setSpinner] = useState(false);

    const getData = useCallback(async () => {
        setSpinner(true)
        try {
            const response = await axiosApi.get<apiBlogs | null>('/blog.json');
            const post = response.data;

            if (post !== null) {
                const postAll: Blog[] = Object.keys(post).map(id => ({
                    ...post[id],
                    id
                }));

                setPosts(postAll);
            }
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
        setSpinner(false)
    }, []);

    useEffect(() => {
        void getData();
    }, [getData]);

    if (spinner) {
        return <Spinner />
    }

    return (
        <>
            <div style={{overflowY: 'scroll', maxHeight: '650px'}}>
                {posts.slice().reverse().map(post => (
                    <PostItem key={post.id} title={post.title} date={post.date} id={post.id}/>
                ))}
            </div>
        </>
    );
};

export default Home;
