import './category.css'
import categoryWjjImg from '../../assets/category/文件夹.png'
import categoryWzImg from '../../assets/category/文章.png'
import categoryCoffeImg from '../../assets/category/咖啡杯.png'
import classNames from 'classnames'
import { tagStore,articleStore,navStore,categoryTagStore } from '../../store'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Category = () =>{
    const { setNav } = navStore();
    useEffect(()=>{
        setNav(2);
    },[setNav])
    const { category, setCategory } = categoryTagStore();
    const navigate = useNavigate();
    const { tags } = tagStore();
    const { articles } = articleStore();
    const [chooseTag, setChooseTag] = useState(-1);
    const [tagList, setTagList] = useState(tags);
    const [tagSum, setTagSum] = useState(tagList.length / 2);
    const [articleSum, setArticleSum] = useState([]);
    const [articleList, setArticleList] = useState([]);
    useEffect(() => {
        setArticleSum(Array(tagList.length).fill(3));
    }, [tagList]);
    useEffect(() => {
        const grouped = tagList.map(tag =>
            articles.filter(article => article.tag === tag.name)
        );
        setArticleList(grouped);
    }, [articles, tagList]);
    const handleTag = (index, name) => {
        setChooseTag(index);
        if (name === '全部文章') {
            setTagList(tags);
            setTagSum(tags.length / 2);
            setCategory('');
        } else {
            setTagList(tags.filter(item => item.name === name));
            setTagSum(1);
            setCategory(name);
        }
    };
    useEffect(()=>{
        if(category){
            setChooseTag(tags.findIndex(item => item.name === category));
            setTagList(tags.filter(item => item.name === category));
        }
    },[])
    return(
        <div id="categoryFather">
            <div id="categoryHead">
                <h1>文章分类</h1>
                <p>探索不同主题的文章集合，找到你感兴趣的内容</p>
            </div>
            <div id='categoryChoose'>
                <h3>分类筛选</h3>
                <ul>
                    <li className={classNames({'categoryChoose':chooseTag === -1})} onClick={() => handleTag(-1,'全部文章')}>全部文章</li>
                    {tags.map((item,index) => (
                        <li key={index} className={classNames({'categoryChoose':chooseTag === index})} onClick={() => handleTag(index,item.name)}>{item.name}</li>
                    ))}
                </ul>
                <div>
                    <img src={categoryWjjImg} alt="" />
                    共<span> {tags.length} </span>个分类
                    <img src={categoryWzImg} alt="" />
                    总计<span> {articles.length} </span>篇文章
                </div>
            </div>
            {articleList.length && tagList.length && (
            <ul id='categoryList'>
                {tagList.slice(0,tagSum).map((tag,index) => (
                <li key={index}>
                    <div className={classNames('categoryListTitle')}>
                        <div className={classNames('categoryListTitleUp')}>
                            <div className={classNames('categoryListTitleLeft')}>
                                <div>
                                      <img src={categoryCoffeImg} alt="" />
                                </div>
                                <h3>{tag.name}</h3>
                            </div>
                            <p className={classNames('categoryListTitleRight')}>{(articleList[index]?.length || 0)}篇文章</p>
                        </div>
                        <p className={classNames('categoryListTitleDown')}>{tag.introduced}</p>
                    </div>
                    <div className={classNames('categoryListBody')}>
                        <p>最新文章</p>
                        <ul>
                            {(articleList[index] || []).slice(0,articleSum[index]).map((article,index) => (
                                <li key={index} onClick={()=>navigate(`/Detail?articleId=${article.id}`)}>
                                    <p className={classNames('categoryListBodyTitle')}>{article.title}</p>
                                    <p className={classNames('categoryListBodyTime')}>{article.date}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className={classNames('categoryListMore',{'displayNone': (articleList[index]?.length || 0) <= 3 || articleSum[index] !== 3})} onClick={()=>setArticleSum(articleList[index].length)}>查看全部文章 &gt;</p>
                </li>))}
            </ul>
            )}
            <button id='categoryMoreBtn' className={classNames({'displayNone':tagSum === tagList.length})} onClick={()=>{setTagSum(tagList.length)}}>查看更多分类</button>
        </div>
    )
}
export default Category
