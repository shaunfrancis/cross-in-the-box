import Message from '../Message/Message';
import styles from './PlaceholderMessage.module.css';

export default function PlaceholderMessage(){
    return (
        <Message customHeaderChildren={<div className={styles["placeholder"]}></div>}>
            <div className={styles["placeholder"]}></div>
            <div className={styles["placeholder"]}></div>
        </Message>
    )
}