import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, valueConvertor } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router'
const PlayVideo = () => {

    const {videoId} = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    // const fetchVideoData = async () => {
    //     // fetching video data
    //     const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    //     const response = await fetch(videoDetails_url)
    //     const result = await response.json()
    //     setApiData(result.items[0])
    // }
    // const fetchChannelData = async () => {
    //     // Fetching channel data
    //     const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
    //     const response = await fetch(channelData_url)
    //     const result = await response.json();
    //     setChannelData(result.items[0]);


    //     const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
    //     const comment_response = await fetch(comment_url)
    //     const comment_result = await comment_response.json()
    //     setCommentData(comment_result.items)
    // }
    const fetchVideoData = async () => {
        try {
            // fetching video data
            const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
            const response = await fetch(videoDetails_url)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json()
            setApiData(result.items[0])
        } catch (error) {
            console.error("Error fetching video data:", error);
            // Handle the error, e.g., show a message to the user
        }
    }
    
    const fetchChannelData = async () => {
        try {
            // Fetching channel data
            const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
            const response = await fetch(channelData_url)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setChannelData(result.items[0]);
            
            const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${API_KEY}`
            const comment_response = await fetch(comment_url)
            if (!comment_response.ok) {
                throw new Error(`HTTP error! Status: ${comment_response.status}`);
            }
            const comment_result = await comment_response.json()
            setCommentData(comment_result.items)
        } catch (error) {
            console.error("Error fetching channel or comment data:", error);
            // Handle the error, e.g., show a message to the user
        }
    }
    

    useEffect(() => {
        fetchVideoData()
    }, [videoId])
    useEffect(() => {
        fetchChannelData()
    }, [apiData])
    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="play-video-info">
                <p>{apiData ? valueConvertor(apiData.statistics.viewCount) : "16k"} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
                <div>
                    <span><img src={like} alt="" />{apiData ? valueConvertor(apiData.statistics.likeCount) : 155}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />6</span>
                    <span><img src={save} alt="" />4</span>
                </div>
            </div>
            <hr />
            <div className='publisher'>
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? valueConvertor(channelData.statistics.subscriberCount) : "100k"} Subscribers </span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description here"}</p>
                <p>Subscribe to watch more of like this</p>
                <hr />
                <h4>{apiData ? valueConvertor(apiData.statistics.commentCount) : 102} Comments</h4>

                {commentData.map((item, index) => {
                    return (
                        <div key={index} className="comments">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>{moment(item.snippet.publishedAt).fromNow()}</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{valueConvertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>

        </div>
    )
}

export default PlayVideo