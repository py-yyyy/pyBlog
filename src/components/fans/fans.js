import fansImg from '../../assets/my/粉丝1.png'
import './fans.css'
import nullImg from '../../assets/public/null.jpg'
import classNames from 'classnames'
import { targetStore,userStore,visitorStore,myTagStore } from '../../store'
import { useNavigate } from 'react-router-dom';
const Fans = () => {
    const { setMyTag } = myTagStore();
    const { setVisitor } = visitorStore();
    const navigate = useNavigate();
    const { target} = targetStore();
    const userMsg = target;
    const { user } = userStore();
    return(
        <div id='fansFather'>
            <div id='fansTitle'>
                <img src={fansImg} alt=''></img>
                <h3>粉丝({userMsg.fans.length})</h3>
            </div>
            <ul id='fansList' className={classNames({'articleNullDiv' : userMsg.fans.length === 0})}>
                {
                    userMsg.fans.map((item,index) => {
                        return (
                            <li key={index} onClick={()=>{setVisitor(item);setMyTag(1);navigate('/My');}}>
                                <img src={user.find(i => i.id === item).headImg} alt=''></img>
                                <div>
                                    <p>{user.find(i => i.id === item).username}</p>
                                    <p className={classNames('fansDesc')}>{user.find(i => i.id === item).tag}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div id='NullImgDiv' className={classNames({'articleNullDiv' : userMsg.fans.length > 0})}>
                <img src={nullImg} alt='' id='nullImg'></img>
            </div>
        </div>
    )
}
export default Fans;

