import './publish.css'
import publishBackImg from '../../assets/publish/返回.png'
import publishAddImg from '../../assets/publish/添加图片.png'
import publishCancelImg from '../../assets/publish/取消.png'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { useState,useEffect } from 'react'
import { targetStore, articleStore,tagStore,userStore } from '../../store'
import { v4 as uuid } from 'uuid';
const Publish = () =>{
    const {user,updateUser} = userStore();
    const { target } = targetStore();
    const { articles,addArticle } = articleStore();
    const { tags } = tagStore();
    const img1 = 'https://wx4.sinaimg.cn/orj360/008dSQGEgy1i3jdqm1dahj30u40ml12x.jpg'
    const navigate = useNavigate();
    const [publishCancel,setPublishCancel] = useState(-1);
    const [publishTitle,setPulishTitle] = useState('');
    const [pulishContent,setPulishContent] = useState('');
    const [pulishTag,setPulishTag] = useState('');
    const [pulishImg,setPulishImg] = useState([]);
    const publishSubmitBtn = () =>{
        if(publishTitle === ''){
            alert('文章标题不能为空');
            return;
        }
        if(pulishTag === ''){
            alert('文章分类不能为空');
            return;
        }
        if(pulishContent === ''){
            alert('文章内容不能为空');
            return;
        }
        const newArticle = {
            id: uuid(),
            title: publishTitle,
            content: pulishContent,
            img: pulishImg,
            authorId: target.id,
            date: new Date().toISOString().split('T')[0],
            tag: pulishTag,
            view: 0,
            like: [],
            collect: [],
            comment: []
        };
        const newUser = user.find(item => item.id === target.id);
        newUser.article = [...newUser.article,newArticle.id];
        updateUser(newUser);
        console.log(newArticle);
        addArticle(newArticle);
        alert('发表成功');
        navigate('/Home');
    }
    return (
        <div id="publishFather">
            <div id="publishHead">
                <div onClick={()=>navigate('/Home')}>
                    <img src={publishBackImg} alt=''></img>
                    <button>返&nbsp;&nbsp;回</button>
                </div>
            </div>
            <div id='publishBody'>
                <h2>发表文章</h2>
                <div id='publishContent'>
                    <ul>
                        <li>
                            <p>文章标题</p>
                            <input placeholder='请输入文章标题' value={publishTitle} onChange={(e)=>setPulishTitle(e.target.value)} className={classNames('publishInput','publishTitle')}></input>
                        </li>
                        <li>
                            <p>文章分类</p>
                            <select className={classNames('publishInput')} value={pulishTag} onChange={(e)=>setPulishTag(e.target.value)}>
                                <option selected value={''}>选择分类</option>
                                {tags.length && tags.map(tag => (
                                    <option key={tag.id} value={tag.name}>{tag.name}</option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <p>添加图片</p>
                            <div id='publishAddImgDiv'>
                                <ul className={classNames('publishAddImgUl')}>
                                    {pulishImg.map((img,index) => (
                                    <li key={index} onMouseOver={()=>setPublishCancel(index)} onMouseLeave={()=>setPublishCancel(-1)}>
                                        <img src={img} alt='' className={classNames('publishShowImg')}></img>
                                        <img src={publishCancelImg} alt='' className={classNames({'publishCancelImg':publishCancel===index},'publishCancelImg2')} onClick={()=>{
                                            setPulishImg(pulishImg.filter((item) => item !== img));
                                        }}></img>
                                    </li>))}
                                    <li>
                                        <div className={classNames('publishAddImg')}>
                                            <img src={publishAddImg} alt=''></img>
                                            <input type="file" id='publishCameraHidden' accept="image/*" onChange={(e)=>{
                                                const file = e.target.files[0];
                                                const reader = new FileReader();
                                                reader.readAsDataURL(file);
                                                reader.onloadend = () => {
                                                    setPulishImg([...pulishImg, reader.result]);
                                                }
                                            }}></input>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </li>
                        <li>
                            <p>文章内容</p>
                            <textarea placeholder='请输入文章内容' value={pulishContent} onChange={(e)=>setPulishContent(e.target.value)} className={classNames('publishInput')}></textarea>
                        </li>
                    </ul>
                    <div id='publishBtn'>
                        <button id='publishCancelBtn' onClick={()=>navigate('/Home')}>取消</button>
                        <button id='publishSubmitBtn' onClick={publishSubmitBtn}>发表</button>
                    </div>
                </div>
            </div>
            <div id='publishFooter'>
                <p>© 2025 BLOG. 保留所有权利.</p>
            </div>
        </div>
    )
}

export default Publish; 