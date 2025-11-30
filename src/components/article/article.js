import articleImg from '../../assets/article/文章1.png'
import './article.css'
import nullImg from '../../assets/public/null.jpg'
import classNames from 'classnames'
import { targetStore,userStore,articleStore,visitorStore } from '../../store'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
const Article = () => {
    const navigate = useNavigate();
    const { target} = targetStore();
    const { user } = userStore();
    const { visitor } = visitorStore();
    const { articles,removeArticle } = articleStore();
    const [userMsg,setUserMsg] = useState(target);
    useEffect(()=>{
        if(visitor === target.id){
            return;
        }
        setUserMsg(user.find(item => item.id === visitor));
    },[])
    const articleMsg = articles.filter(item => item.authorId === userMsg.id);
    const [deleteArticle,setDeleteArticle] = useState(-1);
    const handleDeleteArticle = (index) =>{
        if(window.confirm(`确认删除该文章吗`)){
            removeArticle(articleMsg[index].id);
        }
    }
    return(
        <div id='articleFather'>  
            <div id='articleTitle'>
                <img src={articleImg} alt=''></img>
                <h3>文章({articleMsg.length})</h3>
            </div>
            <ul id='articleList' className={classNames({'articleNullDiv' : articleMsg.length === 0})}>
                {articleMsg.map((item,index) => (
                <li key={index} onMouseOver={()=>{setDeleteArticle(index)}} onMouseOut={()=>{setDeleteArticle(-1)}}>
                    <div onClick={() => navigate(`/Detail?articleId=${item.id}`)}>
                        <div className={classNames('articleListImgDiv')}>
                            <img src={item.img[0] || userMsg.headImg} alt=''></img>
                        </div>
                        <div className={classNames('articleListText')}>
                            <p className={classNames('articleListTitle')}>{item.title}</p>
                            <p className={classNames('articleListTime')}>{item.date} ·{item.tag}</p>
                        </div>
                    </div>
                    <button onClick={()=>handleDeleteArticle(index)} className={classNames({'deleteArticle' : deleteArticle === index && visitor === target.id})}>删 除</button>
                </li>))}
            </ul>
            <div id='NullImgDiv' className={classNames({'articleNullDiv' : articleMsg.length > 0})}>
                <img src={nullImg} alt='' id='nullImg'></img>
            </div>
        </div>
    )
}
export default Article;
 