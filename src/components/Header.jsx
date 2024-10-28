import Modal from "./Modal.jsx";
import NewPost from "./NewPost.jsx";
import {useState} from "react";
import styles from './Header.module.css';
import {Link} from "react-router-dom";

function Header() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={styles.header}>
            <p draggable={true} className={styles.logo}>ReactPost</p>
            <Link to={'/create-post'}>
                <p
                    className={styles.button}
                    onClick={() => setShowModal(true)}
                >
                    Post!
                </p>
            </Link>
            {
                showModal &&
                <Modal setShowModal={setShowModal}>
                    <NewPost
                        setShowModal={setShowModal}
                    />
                </Modal>
            }
        </div>
    )
}


export default Header;