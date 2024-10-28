import styles from "./Modal.module.css";
import {useNavigate} from "react-router-dom";


function Modal({children, setShowModal}) {
    const navigate = useNavigate();

    function closeHandler(){
        setShowModal(false);
        navigate('..');
    }
    return (
        <>
            <div className={styles.container} onClick={closeHandler}>
            </div>

            <div className={styles.overlay}>
                {children}
            </div>
        </>
    )
}


export default Modal;