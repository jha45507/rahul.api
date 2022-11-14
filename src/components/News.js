import NewsItem from './NewsItem'
import Loading from './Loading'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from 'react';
const News = (props) => {
    const [post, setPost] = useState({
        articles: undefined,
        loading: false,
    })

    const [totalResults, setTotalResults] = useState()
    const [haseMore, setHaseMore] = useState(true)

    const updateNews = async () => {
        props.setProgress(10)
        let headlines = `https://top-news-backend.onrender.com/api/headlines?populate=*&pagination[limit]=3`
        let data = await fetch(headlines);
        props.setProgress(40)
        let parsedata = await data.json();
        props.setProgress(70)
        setPost({ articles: parsedata.data });
        props.setProgress(100)
    }

    const totalPageFunc = async  ( ) => { 
        let total = await fetch(`https://top-news-backend.onrender.com/api/headlines`);
        let totalPage = await total.json();
        setTotalResults( totalPage.meta.pagination.total)
     }

    setTimeout(() => {
        setHaseMore(totalResults > (post.articles !== undefined &&  post.articles.length) ? true: false)
       }, 1000);

    useEffect(() => {
        updateNews()
         totalPageFunc()
        // eslint-disable-next-line
    }, [])

    const fetchMoreData =  async () => {
        let headlines = `https://top-news-backend.onrender.com/api/headlines?populate=*&pagination[start]=${post.articles.length}&pagination[limit]=3`
        let data = await fetch(headlines);
        let parsedata = await data.json();
        setPost({ articles: post.articles.concat(parsedata.data) });
    }

    return (
        <>
            <div className='fluid-container mb-5'>
                <h1 className='fs-1 text-center mt-20 mb-5 fw-bold text-light'>News App - Top News Headlines </h1>
                {post.loading && <Loading />}
                <InfiniteScroll
                    dataLength={ post.articles !== undefined && post.articles.length}
                    next={fetchMoreData}
                    hasMore={ haseMore}
                    loader={<Loading />} >
                    <div className='container'>
                        <div className='row'>
                            {post.articles !== undefined  ? post.articles.map((element, key) => {
                                return <div className='col-md-4' key={key}>
                                    <NewsItem title={element.attributes.title} description={element.attributes.description} image={element.attributes.image.data.attributes.url} author={element.attributes.author} date={element.attributes.publishedAt} slug={element.attributes.slug} />
                                </div>
                            }) : "No Data"}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}
export default News;
