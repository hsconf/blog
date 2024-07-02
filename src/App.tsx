
import './App.css'
import NavBar from "./components/NavBar/NavBar";
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import NewPost from "./containers/NewPost/NewPost";
import Post from "./containers/Post/Post";
import About from "./containers/About/About";
import Contacts from "./containers/contacts/Contacts";

const App = () => {
    return (
        <>
            <header>
                <NavBar />
            </header>
                <Container component="main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/posts" element={<Home />}></Route>
                        <Route path="/posts/:id" element={<Post />} />
                        <Route path="/posts/:id/edit" element={<NewPost />} />
                        <Route path="posts/new-post" element={<NewPost />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contacts" element={<Contacts />} />
                    </Routes>
                </Container>
        </>
    );
};

export default App
