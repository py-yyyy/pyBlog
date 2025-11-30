import githubImg from '../../assets/my/github.png'
import linkdinImg from '../../assets/my/linkedin.png'
import twitterImg from '../../assets/my/twitter.png'
import "./myIndex.css"
import { targetStore } from '../../store'
const MyIndex = () =>{
    const { target} = targetStore();
    const userMsg = target;
    return(
        <ul id="myIndexFather">
            <li id="myIndexProfile">
                <div id='myProfile'>
                    <h3>个人介绍</h3>
                    <div id='myProfileInfo'>
                        <i>{userMsg.profile}</i>
                        <ul id="myProfileList">
                            <li>
                                <img src={githubImg} alt=''></img>
                                <p>{userMsg.github || "github"}</p>
                            </li>
                            <li>
                                <img src={linkdinImg} alt=''></img>
                                <p>{userMsg.linkedin || "linkedin"}</p>
                            </li>
                            <li>
                                <img src={twitterImg} alt=''></img>
                                <p>{userMsg.twitter || "twitter"}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    )
}
export default MyIndex