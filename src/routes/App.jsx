import {useEffect, useState} from 'react'
import '../App.css'
import PostsList from "../components/PostsList.jsx";
import Loading from "../components/Loading.jsx";

const endPoint = 'http://localhost:8080'

// const endPoint = ''

function App() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        fetch(endPoint + '/posts')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data)
                setIsLoading(false);
            });

    }, []);


    return (
        <main>
            <PostsList posts={posts}/>
            {isLoading && <Loading/>}
        </main>
    )
}

export default App
