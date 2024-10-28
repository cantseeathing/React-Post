import styles from './Post.module.css';


function Post(props){
    return(
        <div draggable={true} className={styles.post}>
            <p className={styles.author}>{props.author}</p>
            <p className={styles.text}>{props.post}</p>
        </div>
    )
}

export default Post;