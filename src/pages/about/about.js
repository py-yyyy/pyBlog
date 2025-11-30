import './about.css'
import aboutIntroduceImg from '../../assets/about/书本.png'
import Table from '../../components/table/table.js'
import aboutTableImg from '../../assets/about/统计.png'
import aboutTableRightImg from '../../assets/about/咖啡杯.png'
import aboutContactImg from '../../assets/about/意见反馈.png'
import aboutWeChatImg from '../../assets/about/微信公众号.png'
import aboutEmailImg from '../../assets/about/邮件.png'
import aboutGithubImg from '../../assets/about/github.png'
import classNames from 'classnames'
import { articleStore,tagStore } from '../../store'
import { useState,useEffect } from 'react'
import { navStore } from '../../store';
const About = () =>{
    const { setNav } = navStore();
    useEffect(()=>{
        setNav(3);
    },[setNav])
    const { articles } = articleStore();
    const { tags } = tagStore();
    const [ articleList, setArticleList ] = useState([]);
    useEffect(() => {
        const grouped = tags.map(tag =>
            articles.filter(article => article.tag === tag.name)
        );
        setArticleList(grouped);
    }, [articles,tags]);
    return(
        <div id="aboutFather">
            <div id="aboutHead">
                <h1>关于BLOSSOME</h1>
                <p>一个分享知识、记录思考的个人创作空间</p>
            </div>
            <div id='aboutIntroduce'>
                <div id='aboutIntroduceTitle'>
                    <div>
                        <img src={aboutIntroduceImg} alt=''></img>
                    </div>
                    <h3>博客简介</h3>
                </div>
                <div id='aboutIntroduceContent'>
                    <p>BLOSSOME创立于2025年7月，是一个专注于分享技术、生活与思考的个人创作平台,旨在用通俗易懂的文字，传递有价值的信息与思考</p>
                    <p>在这里，我们相信文字的力量,每一篇文章都是一次思想的梳理，一次知识的沉淀，一次与读者的对话。无论你是技术爱好者、终身学习者，还是寻找生活灵感的旅人，都能在这里找到有价值的内容</p>
                </div>
                <div id='aboutIntroduceEnd'>
                    <i id='aboutIntroduceEndP1'>"用简单的语言，分享复杂的世界；用真诚的思考，连接有趣的灵魂。"</i>
                    <p id='aboutIntroduceEndP2'>—— BLOSSOME</p>
                </div>
            </div>
            <div id='aboutTable'>
                <div id='aboutIntroduceTitle'>
                    <div>
                        <img src={aboutTableImg} alt=''></img>
                    </div>
                    <h3>博客数据</h3>
                </div>
                <div id='aboutTableContent'>
                    <Table />
                    <ul id='aboutTableRight'>
                        { tags.length && tags.map((tag,index)=>(
                        <li key={index}>
                            <div className={classNames('aboutTableImg')}>
                                <img src={aboutTableRightImg} alt=''></img>
                            </div>
                            <div className={classNames('aboutTableText')}>
                                <h4>{tag.name}</h4>
                                <p>{tag.introduced}</p>
                            </div>
                        </li>))}
                    </ul>
                </div>
            </div>
            <div id='aboutContact'>
                <div id='aboutIntroduceTitle'>
                    <div>
                        <img src={aboutContactImg} alt=''></img>
                    </div>
                    <h3>联系与反馈</h3>
                </div>
                <p>如果你对博客有任何建议、疑问或合作意向，欢迎通过以下方式与我们联系，你的每一条反馈，都是博客进步的动力</p>
                <div id='aboutContactContent'>
                    <div id='aboutContactContentLeft'>
                        <div className={classNames('aboutContactWay')}>
                            <div className={classNames('aboutContactWayImg')}>
                                <img src={aboutEmailImg} alt=''></img>
                            </div>
                            <div>
                                <p>电子邮件</p>
                                <p className={classNames('aboutContactWayText')}>2663065552@qq.com</p>
                            </div>
                        </div>
                        <div className={classNames('aboutContactWay')}>
                            <div className={classNames('aboutContactWayImg')}>
                                <img src={aboutWeChatImg} alt=''></img>
                            </div>
                            <div>
                                <p>微信公众号</p>
                                <p className={classNames('aboutContactWayText2')}>BLOSSOME博客</p>
                            </div>
                        </div>
                        <div className={classNames('aboutContactWay')}>
                            <div className={classNames('aboutContactWayImg')}>
                                <img src={aboutGithubImg} alt=''></img>
                            </div>
                            <div>
                                <p>Github</p>
                                <p className={classNames('aboutContactWayText')}>https://github.com/</p>
                            </div>
                        </div>
                    </div>
                    <div id='aboutContactContentRight'>
                        <div>
                            <p>你的名字</p>
                            <input type='text' placeholder='请输入你的名字'></input>
                        </div>
                        <div>
                            <p>电子邮箱</p>
                            <input type='text' placeholder='请输入你的邮箱'></input>
                        </div>
                        <div>
                            <p>反馈内容</p>
                            <textarea placeholder='请输入你的建议或反馈'></textarea>
                        </div>
                        <button>提交反馈</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About
