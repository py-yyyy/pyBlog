import followImg from '../../assets/follow/关注1.png'
import './follow.css'
import nullImg from '../../assets/public/null.jpg'
import classNames from 'classnames'
import { targetStore,userStore,visitorStore,myTagStore } from '../../store'
import { useNavigate } from 'react-router-dom';
const Follow = () => {
    const { setMyTag } = myTagStore();
    const { setVisitor } = visitorStore();
    const navigate = useNavigate();
    const { target} = targetStore();
    const userMsg = target;
    const { user } = userStore();
    return(
        <div id='followFather'>
            <div id='followTitle'>
                <img src={followImg} alt=''></img>
                <h3>关注({userMsg.follow.length})</h3>
            </div>
            <ul id='followList' className={classNames({'articleNullDiv' : userMsg.follow.length === 0})}>
                {
                    userMsg.follow.map((item,index) => {
                        return (
                            <li key={index} onClick={()=>{setVisitor(item);setMyTag(1);navigate('/My');}}>
                                <img src={user.find(i => i.id === item).headImg} alt=''></img>
                                <div>
                                    <p>{user.find(i => i.id === item).username}</p>
                                    <p className={classNames('followDesc')}>{user.find(i => i.id === item).tag}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div id='NullImgDiv' className={classNames({'articleNullDiv' : userMsg.follow.length > 0})}>
                <img src={nullImg} alt='' id='nullImg'></img>
            </div>
        </div>
    )
}
export default Follow;

