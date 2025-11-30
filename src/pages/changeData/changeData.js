import changeDataBackImg from '../../assets/changeData/返回.png'
import changeDataCamera from '../../assets/changeData/相机.png'
import changeDataGithubImg from '../../assets/changeData/github.png'
import changeDataTwitterImg from '../../assets/changeData/twitter.png'
import changeDataLinkedinImg from '../../assets/changeData/linkedin.png'
import changeDataLockImg from '../../assets/changeData/lock.png'
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { userStore, targetStore } from '../../store'
import './changeDate.css'
const ChangeData = () => {
    const [changePasswordShow,setChangePasswordShow] = useState(true);
    const navigate = useNavigate();
    const { user,updateUser } = userStore();
    const { target,setTarget} = targetStore();
    const [userMsg,setUserMsg] = useState(target);
    const [userMsg2,setUserMsg2] = useState(target);
    const changeDataSave = () =>{
        if(userMsg2.username === '' ){
            alert('用户名不能为空');
            return;
        }
        if(user.some(item => item.username === userMsg2.username) && userMsg2.username !== target.username){
            alert('用户名已存在');
            return;
        }
        if(userMsg2.tag === ''){
            setUserMsg({...userMsg2,tag:'暂无标签'});
        }
        if(userMsg2.profile === ''){
            setUserMsg({...userMsg2,profile:'暂无简介'});
        }
        updateUser(userMsg2);
        setTarget(userMsg2);
        alert("保存成功");
        navigate('/My');
    }
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [newPassword2,setNewPassword2] = useState('');
    const changeDataShowSave = () =>{
        if(oldPassword === '' || newPassword === '' || newPassword2 === ''){
            alert('旧密码或新密码不能为空');
            return;
        }
        if(oldPassword !== target.password){
            alert('旧密码错误');
            setOldPassword('');
            return;
        }
        if(newPassword !== newPassword2){
            alert('两次输入密码不一致');
            setNewPassword2('');
            return;
        }
        const newUserMsg = { ...userMsg, password: newPassword };
        updateUser(newUserMsg);
        setTarget(newUserMsg);
        alert("保存成功");
        navigate('/My');
    }
    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setUserMsg2({...userMsg2, headImg: reader.result});
        };
        reader.readAsDataURL(file);
    }
    return(
        <div id='changeDataFather'>
            <div id="changeDataHead">
                <div onClick={()=>navigate('/My')}>
                    <img src={changeDataBackImg} alt=''></img>
                    <button>返&nbsp;&nbsp;回</button>
                </div>
            </div>
            <div id='changeDataBody'>
                <h2>编辑资料</h2>
                <div id='changeDataMsg'>
                    <div id='changeDataMsgHead'>
                        <img src={userMsg2.headImg} alt='' id='changeDataMsgHeadImg'></img>
                        <div id='changeDataMsgHeadCamera'>
                            <img src={changeDataCamera} alt='' id='changeDataMsgHeadCameraImg'></img>
                            <input type="file" id='changeDataCameraHidden' accept="image/*" onChange={handleFileChange}></input>
                        </div>
                    </div>
                    <p id='changeDataHeadText'>点击更换头像</p>
                    <div id='changeDataUserName' className={classNames('changeDataContent')}>
                        <p>用户名</p>
                        <input placeholder='用户名' value={userMsg2.username} onChange={(e) => {setUserMsg2({...userMsg2,username:e.target.value})}}></input>
                    </div>
                    <div id='changeDataTag' className={classNames('changeDataContent')}>
                        <p>身份标签</p>
                        <input placeholder='身份标签' value={userMsg2.tag} onChange={(e) => {setUserMsg2({...userMsg2,tag:e.target.value})}}></input>
                    </div>
                    <div id='changeDataProfile' className={classNames('changeDataContent')}>
                        <p>个人简介</p>
                        <textarea placeholder='个人简介' value={userMsg2.profile} onChange={(e) => {setUserMsg2({...userMsg2,profile:e.target.value})}}></textarea>

                    </div>
                    <ul id='changeDataLink' className={classNames('changeDataContent')}>
                        <li>
                            <p>社交链接</p>
                        </li>
                        <li>
                            <img src={changeDataGithubImg} alt=''></img>
                            <input placeholder='github' value={userMsg2.github} onChange={(e) => {setUserMsg2({...userMsg2,github:e.target.value})}}></input>

                        </li>
                        <li>
                            <img src={changeDataTwitterImg} alt=''></img>
                            <input placeholder='twitter' value={userMsg2.twitter} onChange={(e) => {setUserMsg2({...userMsg2,twitter:e.target.value})}}></input>

                        </li>
                        <li>
                            <img src={changeDataLinkedinImg} alt=''></img>
                            <input placeholder='linkedin' value={userMsg2.linkedin} onChange={(e) => {setUserMsg2({...userMsg2,linkedin:e.target.value})}}></input>

                        </li>
                    </ul>
                    <div id='changeDataBtn' className={classNames('changeDataContent')}>
                        <button id='changeDataCancel' onClick={()=>navigate('/My')}>取消</button>
                        <button id='changeDataSave' onClick={changeDataSave}>保存更改</button>
                    </div>
                </div>
                <div id='changeDataSafe'>
                    <h3>账户安全</h3>
                    <div onClick={()=>setChangePasswordShow(false)}>
                        <div>
                            <img src={changeDataLockImg} alt=''></img>
                            <p>修改密码</p>
                        </div>
                        <p>&gt;</p>
                    </div>
                    <div id='changeDataChangePasswordShow' className={classNames({'changeDataPasswordDivShow':changePasswordShow})}>
                        <div id='changeDataOldPassword' className={classNames('changeDataChangePassword')}>
                            <p>旧密码</p>
                            <input type='password' placeholder='old password' value={oldPassword} onChange={(e) => {setOldPassword(e.target.value)}}></input>
                        </div>
                        <div id='changeDataNewPassword' className={classNames('changeDataChangePassword')}>
                            <p>新密码</p>
                            <input type='password' placeholder='new password' value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}></input>
                        </div>
                        <div id='changeDataNewPasswordAgain' className={classNames('changeDataChangePassword')}>
                            <p>再次输入新密码</p>
                            <input type='password' placeholder='new password again' value={newPassword2} onChange={(e) => {setNewPassword2(e.target.value)}}></input>
                        </div>
                        <div id='changeDataShowBtn'>
                            <button id='changeDataShowCancel'  onClick={()=>{setChangePasswordShow(true);setOldPassword('');setNewPassword('');setNewPassword2('');}}>取消</button>
                            <button id='changeDataShowSave' onClick={changeDataShowSave}>保存更改</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id='changeDataFooter'>
                <p>© 2025 BLOG. 保留所有权利.</p>
            </div>
        </div>
    )
}
export default ChangeData