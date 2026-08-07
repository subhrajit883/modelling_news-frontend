import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { newsUrl } from '../../../config/config'

function NewsPost() {
    const [news, setNews] = useState([])
    const fetchNews = async () => {
        try {
            const res = await axios.get(newsUrl.getAllNews)
            setNews(res.data.data);
            console.log("news", res.data.data);
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchNews()
    }, [])
    return (
        <div>NewsPost</div>
    )
}

export default NewsPost    