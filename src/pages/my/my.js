import myBackImg from '../../assets/my/返回.png'
import myHomeImg from '../../assets/my/首页.png'
import myHomeImg1 from '../../assets/my/首页1.png'
import myArticleImg from '../../assets/my/文章.png'
import myArticleImg1 from '../../assets/my/文章1.png'
import myCollectImg from '../../assets/my/收藏.png'
import myCollectImg1 from '../../assets/my/收藏1.png'
import myFollowImg from '../../assets/my/关注.png'
import myFollowImg1 from '../../assets/my/关注1.png'
import myLikeImg from '../../assets/my/喜欢.png'
import myLikeImg1 from '../../assets/my/喜欢1.png'
import myFansImg from '../../assets/my/粉丝.png'
import myFansImg1 from '../../assets/my/粉丝1.png'
import { useState,useEffect } from 'react'
import './my.css'
import classNames from 'classnames'
import { Outlet, useNavigate } from 'react-router-dom'
import { targetStore,myTagStore,visitorStore,userStore,articleStore } from '../../store';
const My = () =>{
    const { articles } = articleStore();
    const { user,updateUser } = userStore();
    const { myTag,setMyTag } = myTagStore();
    const [img1,setImg1] = useState(myHomeImg);
    const [img2,setImg2] = useState(myArticleImg);
    const [img3,setImg3] = useState(myCollectImg);
    const [img4,setImg4] = useState(myFollowImg);
    const [img5,setImg5] = useState(myLikeImg);
    const [img6,setImg6] = useState(myFansImg);
    const [myNavActive, setMyNavActive] = useState(1);
    const [followMsg,setFollowMsg] = useState('');
    useEffect(()=>{
        if(myTag !== -1){
            setMyNavActive(myTag);
        }
    },[])
    const navigate = useNavigate()
    const { target,setTarget } = targetStore();
    const [userMsg,setUserMsg] = useState(target);
    const { visitor,setVisitor } = visitorStore();
    const follow = () => {
        const myUser = user.find(item => item.id === target.id); 
        const targetUser = userMsg; 

        if (followMsg === '关 注') {
            setFollowMsg('已关注');
            updateUser({ ...myUser, follow: [...myUser.follow, targetUser.id] });
            updateUser({ ...targetUser, fans: [...targetUser.fans, myUser.id] });
            setTarget({ ...target, follow: [...target.follow, targetUser.id] });
        } else {
            setFollowMsg('关 注');
            updateUser({ ...myUser, follow: myUser.follow.filter(item => item !== targetUser.id) });
            updateUser({ ...targetUser, fans: targetUser.fans.filter(item => item !== myUser.id) });
            setTarget({ ...target, follow: target.follow.filter(item => item !== targetUser.id) });
        }
        setUserMsg(user.find(item => item.id === targetUser.id));
    };
    useEffect(()=>{
        if(visitor === target.id){
            return;
        }
        setUserMsg(user.find((item)=>item.id === visitor));
        if(target.follow.includes(visitor)){
            setFollowMsg('已关注');
        }else{
            setFollowMsg('关 注');
        }
    },[user]);
    const articleNum = articles.reduce((pre,cur)=>{
        if(cur.authorId === userMsg.id){
            return pre + cur.view;
        }
        return pre;
    },0);
    useEffect(() => {
        if (!visitor || visitor === target.id) {
            return;
        }
        const foundUser = user.find(item => item.id === visitor);
        if (foundUser) {
            setUserMsg(foundUser);
            setFollowMsg(target.follow.includes(visitor) ? '已关注' : '关 注');
        }
    }, [user, visitor, target]);
    useEffect(() => {
        if (visitor !== target.id) {
            setMyTag(1);
            setMyNavActive(1);
        }
    }, [visitor]);
    return(
        <div id="myFather">
            <div id="myHead">
                <div onClick={()=>{setVisitor('');navigate('/Home');setMyTag(-1);}}>
                    <img src={myBackImg} alt=''></img>
                    <button>返&nbsp;&nbsp;回</button>
                </div>
            </div>
            <div id='myBody'>
                <div id='myMsg'>
                    <div id='myMsgLeft'>
                        <img src={userMsg.headImg} alt=''></img>
                        <div id='myMsgLeftText'>
                            <p id='myUsername'>{userMsg.username}</p>
                            <p id='myIntroduction'>{userMsg.tag}</p>
                            <ul id='myMsgUl'>
                                <li>
                                    <p className={classNames('myMsgNum')}>{userMsg.article.length}</p>
                                    <p className={classNames('myMsgText')}>文章</p>
                                </li>
                                <li>
                                    <p className={classNames('myMsgNum')}>{articleNum>1000?(articleNum/1000).toFixed(1)+'k':articleNum}</p>
                                    <p className={classNames('myMsgText')}>阅读</p>
                                </li>
                                <li>
                                    <p className={classNames('myMsgNum')}>{userMsg.fans.length}</p>
                                    <p className={classNames('myMsgText')}>关注者</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button id='myMsgRight' onClick={()=>navigate('/ChangeData')} className={classNames({'displayNone': visitor !== target.id})}>编辑资料</button>
                        <button id='myMsgRight' onClick={follow} className={classNames({'displayNone': visitor === target.id})}>{followMsg}</button>
                    </div>
                </div>
                <ul id='myNav'>
                    <li onClick={()=>{navigate('');setMyNavActive(1);setMyTag(1);setImg1(myHomeImg1);setImg2(myArticleImg);setImg3(myCollectImg);setImg4(myFollowImg);setImg5(myLikeImg);setImg6(myFansImg);}} 
                    className={classNames({'myNavActive': myNavActive === 1})}>
                        <img src={img1} alt=''></img>
                        简介
                    </li>
                    <li onClick={()=>{navigate('MyArticle');setMyNavActive(2);setMyTag(2);setImg1(myHomeImg);setImg2(myArticleImg1);setImg3(myCollectImg);setImg4(myFollowImg);setImg5(myLikeImg);setImg6(myFansImg);}} 
                    className={classNames({'myNavActive': myNavActive === 2})}>
                        <img src={img2} alt=''></img>
                        文章
                    </li>
                    <li  onClick={()=>{navigate('MyLike');setMyNavActive(5);setMyTag(5);setImg1(myHomeImg);setImg2(myArticleImg);setImg3(myCollectImg);setImg4(myFollowImg);setImg5(myLikeImg1);setImg6(myFansImg);}} 
                    className={classNames({'myNavActive': myNavActive === 5,'displayNone': visitor !== target.id})}>
                        <img src={img5} alt=''></img>
                        喜欢
                    </li>
                    <li  onClick={()=>{navigate('MyCollect');setMyNavActive(3);setMyTag(3);setImg1(myHomeImg);setImg2(myArticleImg);setImg3(myCollectImg1);setImg4(myFollowImg);setImg5(myLikeImg);setImg6(myFansImg);}} 
                    className={classNames({'myNavActive': myNavActive === 3,'displayNone': visitor !== target.id})}>
                        <img src={img3} alt=''></img>
                        收藏
                    </li>
                    <li  onClick={()=>{navigate('MyFollow');setMyNavActive(4);setMyTag(4);setImg1(myHomeImg);setImg2(myArticleImg);setImg3(myCollectImg);setImg4(myFollowImg1);setImg5(myLikeImg);setImg6(myFansImg);}} 

                    className={classNames({'myNavActive': myNavActive === 4,'displayNone': visitor !== target.id})}>
                        <img src={img4} alt=''></img>
                        关注
                    </li>
                    <li  onClick={()=>{navigate('MyFans');setMyNavActive(6);setMyTag(6);setImg1(myHomeImg);setImg2(myArticleImg);setImg3(myCollectImg);setImg4(myFollowImg);setImg5(myLikeImg);setImg6(myFansImg1);}} 
                    className={classNames({'myNavActive': myNavActive === 6,'displayNone': visitor !== target.id})}>
                        <img src={img6} alt=''></img>
                        粉丝
                    </li>
                </ul>
                <div id='myOutlet'>
                    <Outlet></Outlet>
                </div>
            </div>
            <div id='myFooter'>
                <p>© 2025 BLOG. 保留所有权利.</p>
            </div>
        </div>
    )
}
export default My
