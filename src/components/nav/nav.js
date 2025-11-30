import './nav.css'
import blogImg from '../../assets/nav/logo.png'
import serachImg from '../../assets/nav/serach.png'
import { useState } from 'react';
import className from 'classnames'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { navStore, serachTextStore,categoryTagStore } from '../../store';
const Nav = (props)=>{
    const { setCategory } = categoryTagStore();
    const { setSerachText } = serachTextStore();
    const { nav, setNav } = navStore();
    const navigate = useNavigate();
    const [navTransform, setNavTransform] = useState(false);
    const [navSerachTransform, setNavSerachTransform] = useState(false);
    const [serachText1, setSerachText1] = useState('');
    const handleKeyup = (e) =>{
        if(e.key === 'Enter'){
            if(serachText1 === ''){
                return
            }
            setSerachText(serachText1)
            setSerachText1('');
            setNav('0');
            navigate(`Serach`)
        }
    }
    return(
        <div className={className("navFather", props.className)} onMouseEnter={()=>setNavTransform(true)} onMouseLeave={()=>setNavTransform(false)}>
            <div id='navDiv'>
                <img src={blogImg} alt='' className={className({'navTransform': navTransform})}></img>
                BLOSSOME
            </div>
            <div id='navRight'>
                <div id='ul'>
                    <Link className={className('navLink',{"navLinkActive": nav === 1})} to='' onClick={()=>setNav(1)}>首&nbsp;&nbsp;&nbsp;&nbsp;页</Link>
                    <Link className={className('navLink',{"navLinkActive": nav === 2})} to='Category' onClick={()=>{setNav(2);setCategory('');}}>分&nbsp;&nbsp;&nbsp;&nbsp;类</Link>
                    <Link className={className('navLink',{"navLinkActive": nav === 3})} to='About' onClick={()=>setNav(3)}>关&nbsp;&nbsp;&nbsp;&nbsp;于</Link>
                </div>
                <div id='navSerach' className={className({'navSerachTransform': navSerachTransform})}>
                    <img src={serachImg} alt='' />
                    <input placeholder='搜索' value={serachText1} onChange={(e)=>setSerachText1(e.target.value)} onFocus={()=>setNavSerachTransform(true)} onBlur={()=>setNavSerachTransform(false)} onKeyUp={handleKeyup}></input>
                </div>
            </div>
        </div>
    )
}
export default Nav