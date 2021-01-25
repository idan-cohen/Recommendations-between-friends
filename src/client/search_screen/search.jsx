import React from "react";
import Gallery from 'react-grid-gallery';
import './search.scss';
import { FaTheaterMasks } from 'react-icons/fa';
import { GiPopcorn, GiWhiteBook, GiExitDoor } from 'react-icons/gi'
import { SiCoffeescript } from 'react-icons/si'
import { IoRestaurant } from 'react-icons/io5'
import { FcSettings } from 'react-icons/fc'
import { useHistory } from 'react-router-dom'
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux'

const IMAGES =
[{
        src: "https://media-cdn.tripadvisor.com/media/photo-s/11/51/dd/e3/large-delicious-dishes.jpg",
        thumbnail: "https://media-cdn.tripadvisor.com/media/photo-s/11/51/dd/e3/large-delicious-dishes.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "לנדוור", title: "לנדוור"}],
        caption: "לנדוור סינמה סיטי, ירושלים",
},  
{
        src: "https://www.gansipur.co.il/warehouse/dynamic/64199.jpg",
        thumbnail: "https://www.gansipur.co.il/warehouse/dynamic/64199.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "קפה גן סיפור", title: "קפה גן סיפור"}],
        caption: "קפה גן סיפור, ירושלים"
},
{
        src: "https://www.my-events.co.il/wp-content/uploads/2017/07/rimonbistro-halavi-a2.jpg",
        thumbnail: "https://www.my-events.co.il/wp-content/uploads/2017/07/rimonbistro-halavi-a2.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "קפה רימון", title: "קפה רימון"}],
        caption: "קפה רימון, ירושלים"
}]



const SearchPage = ()=>{
    const user = useSelector(state => state.userName);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const history = useHistory();

    const log_out = ( )=> {
        alert('להתראות '+user+' מקווים לראותך שוב!')
        dispatch("SETUSERNAME",{payload:null});
        dispatch("SETTOKEN",{payload:null});
        dispatch("SETLOGGED",{payload:false});
        history.push('/');
    }
    const go_profile = () => {
        history.push('/profile')
    }

    const searcher = () => {
        history.push('/place');
    }

    return(
        <div className="page">
            <header className="navbar">
                <button onClick = {go_profile} style={{ position: "relative", top: "10%", left: "40%", backgroundColor: "transparent", border: "none", cursor: "pointer" }}><FcSettings style={{ fontSize:36 }}/></button>
                <button onClick = {log_out} style={{ position: "relative", top: "10%", right: "40%", backgroundColor: "transparent", border: "none", cursor: "pointer", color: "rgb(53, 111, 123)" }}><GiExitDoor style={{fontSize:36}}/></button>
                <div style={{ position:"relative", top:"45%"}}>
                    <input id="search-box" type="text" placeholder="חפש המלצות על מסעדות, הצגות, סרטים וספרים"/>
                </div>
            </header>
            <section className="section">
                <button className="btn"><IoRestaurant style={{fontSize:36}}/><p/>מסעדה</button>
                <button className="btn"><SiCoffeescript style={{fontSize:36}}/><p/>בית קפה</button>
                <button className="btn"><FaTheaterMasks style={{fontSize:36}}/><p/>הצגה</button>
                <button className="btn"><GiPopcorn style={{fontSize:36}}/><p/>סרט</button>
                <button className="btn"><GiWhiteBook style={{fontSize:36}}/><p/>ספר</button>

                <div style={{ position: "absolute", right: "30%" }}>
                    <h1 style={{ color:"rgb(53, 111, 123)"}}>מומלצים</h1>
                    <Gallery images={IMAGES} />
                </div>
            </section>
        </div>
      );
}


export default SearchPage;
