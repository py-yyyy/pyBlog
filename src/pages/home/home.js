import './home.css'
import { Outlet } from 'react-router-dom';
import Nav from '../../components/nav/nav.js';
import Foot from '../../components/foot/foot.js'
import classNames from 'classnames';
import { useState,useEffect } from 'react';
const Home = () =>{
    const [homeScrollY, setHomeScrollY] = useState(false);
    const handleScroll = () => {
        setHomeScrollY(window.scrollY === 0);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []); 
    return(
        <div id='homeFather'>
            <Nav className={classNames('homeNav',{'homeScrollY': homeScrollY === true })}></Nav>
            <div id='homeOutlet'>
                <keep-alive>
                    <Outlet />
                </keep-alive>
            </div>
            <Foot></Foot>
        </div>
    )
}

export default Home