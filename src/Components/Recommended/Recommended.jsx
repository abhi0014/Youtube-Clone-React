import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { valueConvertor } from '../../data'
import { API_KEY } from '../../data'
import moment from 'moment'
import { Link } from 'react-router-dom'
const Recommended = ({ categoryId }) => {

    const [apiData, setApidata] = useState([])
    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
        try {
            const response = await fetch(relatedVideo_url);
            const result = await response.json();
      
            // Check if the items array exists and is not null
            if (result && result.items) {
              setApidata(result.items);
            } else {
              console.error('No items found in the API response.');
              setApidata([]);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            setApidata([]);
          }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (


        <div className='recommended'>
            {apiData.map((item, index) => {
                return (
                    <Link to={`/video/${categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url } alt="" />
                        <div className="recommended-vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelttile}</p>
                            <p>{valueConvertor(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
                        </div>
                    </Link>
                )
            })}



        </div>
    )
}

export default Recommended