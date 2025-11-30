import './detail.css'
import { useNavigate } from 'react-router-dom';
import detailBackImg from '../../assets/detail/返回.png'
import detailDateImg from '../../assets/detail/日历.png'
import detailEyesImg from '../../assets/detail/眼睛.png'
import detailLikeImg from '../../assets/detail/喜欢.png'
import detailLikeImg1 from '../../assets/detail/喜欢1.png'
import detailCollectImg from '../../assets/detail/收藏.png'
import detailCollectImg1 from '../../assets/detail/收藏1.png'
import detailReplyImg from '../../assets/detail/回复.png'
import detailOpenImg from '../../assets/detail/下.png'
import nullImg from '../../assets/public/null.jpg'
import { useState,useEffect } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { articleStore,userStore,targetStore,visitorStore } from '../../store';
import { v4 as uuid } from 'uuid';
const Detail = () => {
    const { setVisitor } = visitorStore();
    const [openReply, setOpenReply] = useState(null);
    const [searchParams] = useSearchParams();
    const articleId = searchParams.get('articleId');
    const navigate = useNavigate();
    const { articles,getfetchArticle,updateArticle } = articleStore();
    useEffect(() => {
        getfetchArticle();
    }, [getfetchArticle]);
    const { user,updateUser } = userStore();
    const article = articles.find(item => item.id === articleId);
    useEffect(() => {
        if(article){
            article.view += 1;
            updateArticle(article);
        }
    }, []);
    const author = user.find(item => item.id === article.authorId);
    const { target } = targetStore();
    const userMsg = user.find(item => item.id === target.id);
    const img = article.like.includes(userMsg.id) ? detailLikeImg1 : detailLikeImg;
    const [likeImg,setLikeImg] = useState(img);
    const collect = article.collect.includes(userMsg.id) ? detailCollectImg1 : detailCollectImg;
    const [collectImg,setCollectImg] = useState(collect);
    const [commentContent, setCommentContent] = useState('');
    const [placeholder,setPlaceholder] = useState('分享你的看法...');
    const [replyId,setReplyId] = useState('');
    const handleKeyup = (e) =>{
        if(e.keyCode === 13){
            postComment();
        }
    }
    const postComment = () => {
        if(commentContent === ''){
            alert('评论内容不能为空');
            return;
        }
        if(placeholder === '分享你的看法...'){
            const newComment = {
                id: uuid(),
                userId: userMsg.id,
                content: commentContent,
                date: new Date().toISOString().split('T')[0],
                reply:[]
            };
            const newArticle = {...article, comment: [...article.comment, newComment]};
            updateArticle(newArticle);
            setCommentContent('');
            alert('评论成功');
        }
        else{
            const newComment = {
                id: uuid(),
                userId: userMsg.id,
                content: commentContent,
                date: new Date().toISOString().split('T')[0]
            };
            const newComments = article.comment.map(item =>
                item.id === replyId
                    ? { ...item, reply: [...item.reply, newComment] }
                    : item
            );
            const newArticle = { ...article, comment: newComments };
            updateArticle(newArticle);
            setCommentContent('');
            setPlaceholder('分享你的看法...');
            alert('回复成功');
        }
        
    }
    const nav = searchParams.get('nav');
    return (
        <div id='detailFather'>
            <div id="detailHead">
                <div onClick={()=>navigate(nav ? `/${nav}` : -1)}>
                    <img src={detailBackImg} alt=''></img>
                    <button>返&nbsp;&nbsp;回</button>
                </div>
            </div>
            <div id="detailBody">
                <div id="detailContent">
                    <h2>{article.title}</h2>
                    <div id='detailAuthorMsg'>
                        <div>
                            <img src={author.headImg} alt='' id='detailAuthorMsgImg' onClick={()=>{
                                setVisitor(author.id);
                                navigate('/My');
                            }}></img>
                            <p>{author.username}</p>
                        </div>
                        <div>
                            <img src={detailDateImg} alt=''></img>
                            <p>{article.date}</p>
                        </div>
                        <div>
                            <img src={detailEyesImg} alt=''></img>
                            <p>{article.view>1000?(article.view/1000).toFixed(1)+'k':article.view}</p>
                        </div>
                        <span>{article.tag}</span>
                    </div>
                    <div id='detailContentText'>
                        <p>
                            {article.content}
                        </p>
                        <ul id='detailContentImg'>
                            {articles && article.img.map((img, index) => (
                            <li key={index}>
                                <img src={img} alt=''></img>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div id='detailLikeDiv'>
                    <div onClick={()=>{
                        if(likeImg === detailLikeImg){
                            setLikeImg(detailLikeImg1);
                            let newArticle1 = {...article, like: [...article.like, userMsg.id]};
                            updateArticle(newArticle1);
                            let newUser1 = {...userMsg, like: [...userMsg.like, articleId]};
                            updateUser(newUser1);
                        }else{
                            setLikeImg(detailLikeImg);
                            let newArticle2 = {...article, like: article.like.filter(id => id !== userMsg.id)};
                            updateArticle(newArticle2);
                            let newUser2 = {...userMsg, like: userMsg.like.filter(id => id !== articleId)};
                            updateUser(newUser2);
                        }
                    }}>
                        <img src={likeImg} alt=''></img>
                        <p>喜欢({article.like.length>1000?(article.like.length/1000).toFixed(1)+'k':article.like.length})</p>
                    </div>
                    <div onClick={()=>{
                        if(collectImg === detailCollectImg){
                            setCollectImg(detailCollectImg1);
                            let newArticle3 = {...article, collect: [...article.collect, userMsg.id]};
                            updateArticle(newArticle3);
                            let newUser3 = {...userMsg, collect: [...userMsg.collect, articleId]};
                            updateUser(newUser3);
                        }else{
                            setCollectImg(detailCollectImg);
                            let newArticle4 = {...article, collect: article.collect.filter(id => id !== target.id)};
                            updateArticle(newArticle4);
                            let newUser4 = {...userMsg, collect: userMsg.collect.filter(id => id !== articleId)};
                            updateUser(newUser4);
                        }
                    }}>
                        <img src={collectImg} alt=''></img>
                        <p>收藏</p>
                    </div>
                </div>
            </div>
            <div id='detailComment'>
                <h3>评论</h3>
                <div id='detailCommentInput'>
                    <textarea id='detailCommentInputText' type='text' placeholder={placeholder || '分享你的看法...'} value={commentContent} onChange={(e) => setCommentContent(e.target.value)} onKeyUp={handleKeyup}></textarea>
                    <button onClick={postComment}>发布评论</button>
                </div>
                <ul id='detailCommentList' className={classNames({'articleNullDiv' : article.comment.length === 0})}>
                    {article.comment.map((comment,index) => (
                    <li key={index}>
                        <div>
                            <img src={user.find(item => item.id === comment.userId).headImg} alt='' className={classNames('detailCommentImg')}></img>
                            <div>
                                <div className={classNames('detailUser')}>
                                    <p>{user.find(item => item.id === comment.userId).username}</p>
                                    <p className={classNames('detailUserTime')}>{comment.date}</p>
                                </div>
                                <p>{comment.content}</p>
                                <ul className={classNames('detailCommentLike')}>
                                    <li onClick={()=>{setReplyId(comment.id);setPlaceholder(`回复${user.find(item => item.id === comment.userId).username}`)}}>
                                        {/* 点击回复修改textarea的placeholder属性为“回复xxx” */}
                                        <a href='#detailCommentInputText'>
                                            <img src={detailReplyImg} alt=''></img>
                                            <p>回复</p>
                                        </a>
                                    </li>
                                    <li onClick={()=>setOpenReply(index)} className={classNames({'articleNullDiv' : openReply === index || comment.reply.length === 0})}>
                                        {/* 展开后消失，0条回复隐藏 */}
                                        <p>展开{comment.reply.length}条回复</p>
                                        <img src={detailOpenImg} alt=''></img>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <ul className={classNames('detailCommentListSon')} style={{display: openReply === index ? 'block' : 'none'}}>
                            {comment.reply.map((reply,index) => (
                            <li key={index}>
                                <img src={user.find(item => item.id === reply.userId).headImg} alt='' className={classNames('detailCommentImg')}></img>
                                <div>
                                    <div className={classNames('detailUser')}>
                                        <p>{user.find(item => item.id === reply.userId).username}</p>
                                        <p className={classNames('detailUserTime')}>{reply.date}</p>
                                    </div>
                                    <p>{reply.content}</p>
                                    <ul className={classNames('detailCommentLike')}>
                                    </ul>
                                </div>
                            </li>))}
                        </ul>
                    </li>))}
                </ul>
                <div id='nullImgDiv' className={classNames({'articleNullDiv' : article.comment.length > 0})}>
                    <img src={nullImg} alt='' id='nullImg'></img>
                </div>
            </div>
            <div id='detailFooter'>
                <p>© 2025 BLOG. 保留所有权利.</p>
            </div>
        </div>
    )
}

export default Detail
