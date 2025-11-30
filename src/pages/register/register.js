import './register.css';
import yaoshiImg from '../../assets/login/yaoshi.png';
import passwordImg from '../../assets/login/password.png';
import usernameImg from '../../assets/login/username.png';
import classNames from 'classnames'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../store';
import { v4 as uuid } from 'uuid';
const Register = () =>{
    const {user,getfetchUser,registerUser} = userStore();
    useEffect(()=>{
        getfetchUser();
    },[getfetchUser]);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const register = () =>{
        if(username === '' || password === ''){
            alert('请输入用户名和密码');
            return;
        }
        if(user.some(item => item.username === username)){
            alert('用户名已存在，请更换用户名');
            setUsername('');
            return;
        }
        const newUser = {
            "id": uuid(),
            "headImg": "https://wx4.sinaimg.cn/mw690/008dSQGEgy1i3jdqndqohj30kg0kg77o.jpg",
            "username": username,
            "password": password,
            "tag": "暂无标签",    
            "profile": "暂无简介",
            "github":"",
            "twitter":"",
            "linkedin":"",
            "article": [],
            "collect": [],
            "like": [],
            "follow": [],
            "fans": []
        };
        registerUser(newUser);
        alert('注册成功，请登录');
        navigate('/');
    }
    const [focusNum, setFocusNum] = useState(0);
    const getFocus = (num) =>{
        setFocusNum(num);
    }
    const lostFocus = () =>{
        setFocusNum(0);
    }
    const navigate = useNavigate();
    return(
        <div id='father'>
            <div id='head'>
                <div id='headImg'>
                    <img src={yaoshiImg} alt='' />
                </div>
                <p id='headP1'>用户注册</p>
                <p id='headP2'>请输入您的账号信息</p>
            </div>
            <div id='body'>
                <div id='loginForm'>
                    <div id='userName'>
                        <p>用户名</p>
                        <div id='nameDiv' className={classNames({'divFocus': focusNum === 1})}>
                            <img src={usernameImg} alt='' />
                            <input type='text' placeholder='请输入用户名' onFocus={()=>getFocus(1)} onBlur={()=>lostFocus()} value={username} onChange={(e)=>{setUsername(e.target.value);}}/>
                        </div>
                    </div>
                    <div id='password'>
                        <p>密&nbsp;&nbsp;&nbsp;&nbsp;码</p>
                        <div id='passwordDiv' className={classNames({'divFocus': focusNum === 2})}>
                            <img src={passwordImg} alt='' />
                            <input type='password' placeholder='请输入密码' onFocus={()=>getFocus(2)} onBlur={()=>lostFocus()} value={password} onChange={(e)=>{setPassword(e.target.value);}}/>
                        </div>
                    </div>
                </div>
                <div id='registerBtn'>
                    <button onClick={register}>注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
                </div>
                <div id='login'>
                    <p>已有账号？<span onClick={()=>{
                        navigate('/');
                    }}>返回登录</span></p>
                </div>
            </div>
        </div>
    )
}

export default Register