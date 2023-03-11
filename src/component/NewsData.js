import React, { useEffect, useState } from 'react'
import getNews from '../services/getNews'
import moment from 'moment';
import alanBtn from '@alan-ai/alan-sdk-web'
export default function NewsData() {
    const [newsData, setNews] = useState([]);
    const [selectOpt, setSelectOpt] = useState('');
    const alanK = 'ffef78e320da8c12b5269332efa566682e956eca572e1d8b807a3e2338fdd0dc/stage';
    const getAll = async () => {
        let data = await getNews(selectOpt);
        setNews(data.data.articles);
    }
    const selectCategory = (event) => {
        setSelectOpt(event.target.value);
    }

    useEffect(() => {
        alanBtn({
            key: alanK,
            onCommand: (commandData) => {
                setSelectOpt(commandData.data);
            }
        });
    }, []);
    useEffect(() => {
        getAll();
    }, [selectOpt])
    return (
        <div className="main">
            <div className="header">
                <h1>News Today</h1>
            </div>
            <div className="dropDown">
                <div>
                    <select
                        className="select"
                        name="category"
                        id="category"
                        onChange={selectCategory}
                    >
                        <option value="">Select a Category</option>
                        <option value="general">General</option>
                        <option value="health">Health</option>
                        <option value="sports">Sports</option>
                        <option value="business">Business</option>
                    </select>
                </div>
            </div>
            <div className='grid-main'>
                {newsData?.map((news) => {
                    return (
                        <div className='grid-child'>
                            <img className="image" src={news?.urlToImage} />
                            <p className="newsTitle">{news?.title}</p>
                            <p className="newsContent">{news?.content}</p>
                            <div className="space-between" >
                                <p className="newsAuthor">Author: {news?.author ? news?.author : 'Unknown'}</p>
                                <p className="newsPublished">{moment(news?.pusblishedAt).format('LL')}</p>
                            </div>
                            <a className="newsLink" href={news?.url} target="blank">Read More ...</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}