import './index.css'
import indexOtherImg from '../../assets/index/other.png'
import indexTwitterImg1 from '../../assets/index/twitter.png'
import indexTwitterImg2 from '../../assets/index/twitter2.png'
import indexCameraImg1 from '../../assets/index/相机.png'
import indexCameraImg2 from '../../assets/index/相机2.png'
import indexGithubImg1 from '../../assets/index/github.png'
import indexGithubImg2 from '../../assets/index/github2.png'
import indexCateGoryImg from '../../assets/index/category1.png'
import indexHotImg from '../../assets/index/热门.png'
import indexEyesImg from '../../assets/index/眼睛.png'
import indexDateImg from '../../assets/index/日历.png'
import { useState,useEffect } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { targetStore,articleStore,tagStore,userStore } from '../../store'
import _ from 'lodash'
import { categoryTagStore,navStore,visitorStore } from '../../store';
const Index = () =>{
    const { setVisitor } = visitorStore();
    const { setNav } = navStore();
    useEffect(()=>{
        setNav(1);
    },[setNav])
    const { setCategory } = categoryTagStore();
    const navigate = useNavigate();
    const [img3,setImg3] = useState(indexTwitterImg1);
    const [img4,setImg4] = useState(indexGithubImg1);
    const [img5,setImg5] = useState(indexCameraImg1);
    const [hotHover,setHotHover] = useState(-1);
    const { target} = targetStore();
    const userMsg = target;
    const { getfetchArticle, articles } = articleStore();
    useEffect(() => {
        getfetchArticle();
    }, [getfetchArticle]);
    const newArticles = _.sortBy(articles, ['date']).reverse().slice(0, 4);
    let hotArticles = _.sortBy(articles, ['view']).reverse().slice(0, 6);
    useEffect(()=>{
        hotArticles = _.sortBy(articles, ['view']).reverse().slice(0, 6);
    })
    const { getfetchTag, tags } = tagStore();
    useEffect(() => {
        getfetchTag();
    }, [getfetchTag]);
    const { user } = userStore();
    return(
        <div id='indexFather'>
            { articles.length && (
                <div id='indexHead'>
                    <div id='indexHeadImg'>
                        <img src={articles[0].img[0] || target.headImg} alt='' ></img>
                    </div>
                    <div>
                        <div id='indexHeadTitle'>
                            <p>{articles[0].tag}</p>
                            <img src={indexDateImg} alt=''></img>
                            {articles[0].date}
                        </div>
                        <h1>{articles[0].title}</h1>
                        <p>{articles[0].content}</p>
                        <button onClick={()=>navigate(`/Detail?articleId=${articles[0].id}&nav=Home`)}>阅读全文</button>
                    </div>
                </div>
            ) || ''}
            <div id='indexBody'>
                <div id='indexBodyLeft'>
                    <div id='indexBodyImg'>
                        <img src={indexOtherImg} alt=''></img>
                        <p>推荐文章</p>
                    </div>
                    <ul id='indexBodyUl'>
                        {newArticles.length && newArticles.map(article =>
                            <li key={article.id}>
                                <div className={classNames('indexLiTitle')}>
                                    <p className={classNames('indexLiP')}>{article.tag}</p>
                                    <img src={indexDateImg} alt=''></img>
                                    {article.date}
                                    <img src={indexEyesImg} alt=''></img>
                                    { article.view>1000?(article.view/1000).toFixed(1)+'k':article.view }
                                </div>
                                <h2>{article.title}</h2>
                                <p>{article.content}</p>
                                <button onClick={()=>navigate(`/Detail?articleId=${article.id}&nav=Home`)}>阅读全文</button>
                            </li>
                        )}
                    </ul>
                </div>
                <div id='indexBodyRight'>
                    <div id='indexUserMsg'>
                        <img src={ userMsg.headImg } alt='' onClick={()=>{navigate('/My');setVisitor(userMsg.id)}}></img>
                        <p id='indexUserName'>{userMsg.username}</p>
                        <p id='indexUserIntroduce'>{userMsg.tag}</p>
                        <ul>
                            <li onMouseOver={()=>{setImg3(indexTwitterImg2)}} onMouseLeave={()=>{setImg3(indexTwitterImg1)}}>
                                <img src={img3} alt=''></img>
                            </li>
                            <li onMouseOver={()=>{setImg4(indexGithubImg2)}} onMouseLeave={()=>{setImg4(indexGithubImg1)}}>
                                <img src={img4} alt=''></img>
                            </li>
                            <li onMouseOver={()=>{setImg5(indexCameraImg2)}} onMouseLeave={()=>{setImg5(indexCameraImg1)}}>
                                <img src={img5} alt=''></img>
                            </li>
                        </ul>
                        <div id='indexUserMsgBtn'>
                            <button onClick={()=>{navigate('/Publish')}} id='indexPublishBtn'>发表文章</button>
                            <button onClick={()=>{navigate('/',{replace:true})}} id='indexOutBtn'>退出登录</button>
                        </div>
                    </div>
                    <div id='indexCategory'>
                        <div id='indexCategoryTitle'>
                            <img src={indexCateGoryImg} alt=''></img>
                            <p>文章分类</p>
                        </div>
                        <ul>
                            {tags.length && tags.map((tag) =>
                            <li key={tag.id} onClick={()=>{navigate(`Category`);setCategory(tag.name)}}>{tag.name}</li>
                            )}
                        </ul>
                    </div>
                    <div id='indexHot'>
                        <div id='indexHotTitle'>
                            <img src={indexHotImg} alt=''></img>
                            <p>热门文章</p>
                        </div>
                        <ul>
                            {hotArticles.length && hotArticles.map((article,index) =>
                            <li key={article.id} onClick={()=>navigate(`/Detail?articleId=${article.id}&nav=Home`)} onMouseOver={()=>{setHotHover(index)}} onMouseLeave={()=>{setHotHover(-1)}}>
                                <div className={classNames('indexHotImg')}>
                                    <img src={article.img[0]|| user.find((item) => item.id === article.authorId).headImg} alt=''></img>
                                </div>
                                <div className={classNames('indexHotWord')}>
                                    <p className={classNames({'indexHotHover':hotHover===index})}>{article.title}</p>
                                    <div>
                                        <img src={indexEyesImg} alt=''></img>
                                        <p>{article.view>1000?(article.view/1000).toFixed(1)+'k':article.view} 阅读</p>
                                    </div>
                                </div>
                            </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Index
