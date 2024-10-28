import {useState} from 'react'
import { Link, Form, redirect } from 'react-router-dom';

import styles from "./NewPost.module.css";

const endPoint = 'http://localhost:8080'

function NewPost(props) {
    const [post, setPost] = useState("");
    const [author, setAuthor] = useState("");

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!post || !author) {
            return;
        }
        fetch(
            endPoint + '/posts',
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        id: parseInt(getRandomArbitrary(1, 10_000)).toString(),
                        author: author,
                        body: post,
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json()).then((data) => {
            console.log(data)
            props.setShowModal(false);
            return redirect('/');
        });
        // props.setPosts((prev) => [...prev, {id: crypto.randomUUID(), author: author, body: post}]);
    }

    return (
        <form className={styles.form}>
            <p>
                <label>Author</label>
                <textarea onChange={(e) => setAuthor(e.target.value)} required rows={1}/>
            </p>
            <p>
                <label>Post</label>
                <textarea onChange={(e) => setPost(e.target.value)} required rows={3}/>
            </p>
            <button onClick={handleSubmit}>Add!</button>
        </form>
    )
}

export default NewPost;