import collectImg from '../../assets/collect/收藏1.png'
import nullImg from '../../assets/public/null.jpg'
import './collect.css'
import { targetStore,userStore,articleStore } from '../../store'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames';
const Collect = () => {
    const navigate = useNavigate();
    const { target} = targetStore();
    const { user } = userStore();
    const { articles } = articleStore();
    const userMsg = user.find(item => item.id === target.id);
    const articleMsg = articles.filter(item => item.collect.includes(userMsg.id));
    return(
        <div id='collectFather'>
            <div id='collectTitle'>
                <img src={collectImg} alt=''></img>
                <h3>收藏({articleMsg.length})</h3>
            </div>
            <ul id='collectList' className={classNames({'articleNullDiv' : articleMsg.length === 0})}>
                {articleMsg.map(item => (
                <li key={item.id} onClick={() => navigate(`/Detail?articleId=${item.id}`)}>
                    {item.title}
                </li>))}
            </ul> 
            <div id='NullImgDiv' className={classNames({'articleNullDiv' : articleMsg.length > 0})}>
                <img src={nullImg} alt='' id='nullImg'></img>
            </div>
        </div>
    )
}
export default Collect;

