import './login.css';
import yaoshiImg from '../../assets/login/yaoshi.png';
import passwordImg from '../../assets/login/password.png';
import usernameImg from '../../assets/login/username.png';
import classNames from 'classnames'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../store';
import { targetStore } from '../../store';
const Login = () =>{
    const {user,getfetchUser} = userStore();
    const {setTarget} = targetStore();
    useEffect(()=>{
        getfetchUser();
    },[getfetchUser]);
    const [focusNum, setFocusNum] = useState(0);
    const getFocus = (num) =>{
        setFocusNum(num);
    }
    const lostFocus = () =>{
        setFocusNum(0);
    }
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const loginCheck = () =>{
        if(username === '' || password === ''){
            alert('用户名或密码不能为空');
            return false;
        }
        if(user.some(item => item.username === username && item.password === password)){
            alert('登录成功');
            setTarget(user.find(item => item.username === username));
            alert(`欢迎回来，${username}`);
            navigate('/Home',{replace:true});
        }
        else{
            alert('用户名或密码错误');
            setUsername('');
            setPassword('');
        }
    }
    return(
        <div id='father'>
            <div id='head'>
                <div id='headImg'>
                    <img src={yaoshiImg} alt='' />
                </div>
                <p id='headP1'>用户登录</p>
                <p id='headP2'>请输入您的账号信息</p>
            </div>
            <div id='body'>
                <div id='loginForm'>
                    <div id='userName'>
                        <p>用户名</p>
                        <div id='nameDiv' className={classNames({'divFocus': focusNum === 1})}>
                            <img src={usernameImg} alt='' />
                            <input type='text' placeholder='请输入用户名' onFocus={()=>getFocus(1)} onBlur={()=>lostFocus()} value={username} onChange={(e) => {setUsername(e.target.value)}} />
                        </div>
                    </div>
                    <div id='password'>
                        <p>密&nbsp;&nbsp;&nbsp;&nbsp;码</p>
                        <div id='passwordDiv' className={classNames({'divFocus': focusNum === 2})}>
                            <img src={passwordImg} alt='' />
                            <input type='password' placeholder='请输入密码' onFocus={()=>getFocus(2)} onBlur={()=>lostFocus()} value={password} onChange={(e) => {setPassword(e.target.value)}} />
                        </div>
                    </div>
                </div>
                <div id='loginBtn'>
                    <button onClick={()=>(loginCheck())}>登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
                </div>
                <div id='register'>
                    <p>没有账号？<span onClick={()=>{
                        navigate('/Register');
                    }}>点击注册</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login