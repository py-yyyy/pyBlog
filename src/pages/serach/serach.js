import serachImg from '../../assets/serach/serach.png'
import searchCrossImg from '../../assets/serach/错叉.png'
import searchCrossImg2 from '../../assets/serach/错叉2.png'
import srachDateImg from '../../assets/serach/日历.png'
import srachEyesImg from '../../assets/serach/眼睛.png'
import { useState,useEffect } from 'react'
import './serach.css'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom';
import { articleStore } from '../../store';
import { navStore, serachTextStore } from '../../store';
const Search = () =>{
    const { setNav } = navStore();
    useEffect(()=>{
        setNav(0);
    },[setNav])
    const navigate = useNavigate();
    const { articles } = articleStore();
    const [serachList, setSerachList] = useState([]);
    const { serachText,setSerachText } = serachTextStore();
    const [crossImg,setCrossImg] = useState(searchCrossImg);
    const [serachDivFocus,setSerachDivFocus] = useState(false);
    const [serachCategoryFocus,setSerachCategoryFocus] = useState(1);
    const [serachValue, setSerachValue] = useState(serachText);
    const [serachPage, setSerachPage] = useState(1);
    const [serachListPage, setSerachListPage] = useState(0);
    useEffect(()=>{
        if(serachValue === ''){
            return
        }
        if(serachCategoryFocus === 1)
        { 
            setSerachList(articles.filter(item=>{
                return item.title.includes(serachValue) || item.tag.includes(serachValue) || item.content.includes(serachValue);
            }));
            setSerachListPage(0);
            setSerachPage(1);
        }
        else if(serachCategoryFocus === 2)
        {
            setSerachList(articles.filter(item=>{
                return item.content.includes(serachValue);
            }));
            setSerachListPage(0);
            setSerachPage(1);
        }
        else if(serachCategoryFocus === 3)
        {
            setSerachList(articles.filter(item=>{
                return item.tag.includes(serachValue);
            }));
            setSerachListPage(0);
            setSerachPage(1);
        }
        else if(serachCategoryFocus === 4)
        {
            setSerachList(articles.filter(item=>{
                return item.title.includes(serachValue);
            }));
            setSerachListPage(0);
            setSerachPage(1);
        }
    },[articles,serachValue,serachCategoryFocus])
    const handleKeyup = (e) =>{
        if(e.key === 'Enter'){
            if(serachText === ''){
                return
            }
            setSerachValue(serachText);
        }
    }
    const handelPage = (num) =>{
        if(serachPage + num <= 0 || serachPage + num > Math.ceil(serachList.length/4)){
            return
        }
        setSerachPage(serachPage + num);
        setSerachListPage(serachListPage + num * 4);
    }
    return(
        <div id="serachFather">
            <h1 id='serachH1'>搜索结果</h1>
            <div id="serachHead">
                <div id="serachDiv" className={classNames({'serachDivFocus': serachDivFocus})} onFocus={()=>setSerachDivFocus(true)} onBlur={()=>setSerachDivFocus(false)}>
                    <img src={serachImg} alt=''></img>
                    <input placeholder='搜索' onKeyUp={handleKeyup} value={serachText} onChange={(e)=>setSerachText(e.target.value)}></input>
                    <img src={crossImg} alt='' onMouseOver={()=>setCrossImg(searchCrossImg2)} onMouseLeave={()=>setCrossImg(searchCrossImg)} onClick={()=>{setSerachText('');}}></img>
                </div>
                <p>搜索关键词：<span>"{serachValue}"</span>，找到 {serachList.length} 篇相关文章</p>
            </div>
            <div id='serachContent'>
                <ul id='serachCategory'>
                    <li className={classNames({'serachCategoryFocus': serachCategoryFocus === 1})} onClick={()=>setSerachCategoryFocus(1)}>全部结果</li>
                    <li className={classNames({'serachCategoryFocus': serachCategoryFocus === 2})} onClick={()=>setSerachCategoryFocus(2)}>文章</li>
                    <li className={classNames({'serachCategoryFocus': serachCategoryFocus === 3})} onClick={()=>setSerachCategoryFocus(3)}>分类</li>
                    <li className={classNames({'serachCategoryFocus': serachCategoryFocus === 4})} onClick={()=>setSerachCategoryFocus(4)}>标题</li>
                </ul>
                <ul id='serachResult'>
                    {serachList.slice(serachListPage,serachListPage+4).map((item,index) => (
                    <li key={index}>
                        <div className={classNames('serachLiTitle')}>
                            <p className={classNames('serachLiP')}>{item.tag}</p>
                            <img src={srachDateImg} alt=''></img>
                            {item.date}
                            <img src={srachEyesImg} alt=''></img>
                            {item.view>1000?(item.view/1000).toFixed(1)+'k':item.view}
                        </div>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                        <button onClick={()=>navigate(`/Detail?articleId=${item.id}`)}>阅读全文</button>
                    </li>))}
                </ul>
            </div>
            <div id='serachPage'>
                <p>共 {Math.ceil(serachList.length/4)} 页</p>
                <div>
                    <button onClick={()=>handelPage(-1)} className={classNames({'serachPageBtn': serachPage === 1||serachList.length === 0})}>上一页</button>
                    <p>第<span>{serachPage}</span>页</p>
                    <button onClick={()=>handelPage(1)} className={classNames({'serachPageBtn': serachPage === Math.ceil(serachList.length/4)||serachList.length === 0})}>下一页</button>
                </div>
            </div>
        </div>
    )
}

export default Search