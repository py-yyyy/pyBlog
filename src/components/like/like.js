import likeImg from '../../assets/like/like1.png'
import nullImg from '../../assets/public/null.jpg'
import './like.css'
import classNames from 'classnames'
import { targetStore,userStore,articleStore } from '../../store'
import { useNavigate } from 'react-router-dom'
const Like = () => {
    const navigate = useNavigate();
    const { target} = targetStore();
    const { user } = userStore();
    const { articles } = articleStore();
    const userMsg = user.find(item => item.id === target.id);
    const articleMsg = articles.filter(item => item.like.includes(userMsg.id));
    return(
        <div id='likeFather'>
            <div id='likeTitle'>
                <img src={likeImg} alt=''></img>
                <h3>点赞({articleMsg.length})</h3>
            </div>
            <ul id='likeList' className={classNames({'articleNullDiv' : articleMsg.length === 0})}>
                {articleMsg.map(item => (
                    <li key={item.id} onClick={() => navigate(`/Detail?articleId=${item.id}`)}>
                        {item.title}
                    </li>
                ))}
            </ul> 
            <div id='NullImgDiv' className={classNames({'articleNullDiv' : articleMsg.length > 0})}>
                <img src={nullImg} alt='' id='nullImg'></img>
            </div>
        </div>
    )
}
export default Like;

