import footLogoImg from '../../assets/foot/logo.png'
import './foot.css'
const Foot = () => {
    return(
        <div id='footFather'>
            <div id='footMsg'>
                <div>
                    <img src={footLogoImg} alt=''></img>
                    <p>BLOSSOME</p>
                </div>
                <p>
                    BLOSSOME分享技术与生活，记录成长的点滴思考与感悟。
                </p>
            </div>
            <p>© 2025 BLOSSOME. 保留所有权利.</p>
        </div>
    )
}

export default Foot