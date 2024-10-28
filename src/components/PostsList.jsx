import Post from "./Post.jsx";
import styles from "./PostsList.module.css";

function PostsList({posts}) {
    if (posts.length === 0) {
        return (
            <p>Add a new post!</p>
        );
    }
    return (
        <div className={styles.posts}>
            {
                posts.map(
                    (post) => <Post author={post.author} post={post.body} key={post.id}/>
                )
            }
        </div>
    )
}

export default PostsList;