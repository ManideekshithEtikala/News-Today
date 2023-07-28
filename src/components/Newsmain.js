import React, { useEffect, useState } from 'react'
import Newscomponent from './Newscomponent';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const Newsmain=(props)=>{
    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResults,settotalResults]=useState(0)
    //--------------------------------  UPDATING NEWS --------------------------------
    const updatenews=async()=> {
        props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e850f12778984595b48c6ab57410ed11&page=${page}&pageSize=${props.pagesize}`;
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(90)
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }
    const fetchmoredate = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e850f12778984595b48c6ab57410ed11&page=${page+1}&pageSize=${props.pagesize}`;
        setPage(page+1)
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        
    }
    //--------------------------   componentdidmount function -------------------------
    useEffect(()=>{
        document.title = `${props.category}-News Today`
        updatenews()
    },[])
        return (
            <div className='container my-3'>
                <h1 className='text-center ' style={{marginTop:"70px"}}>News-Today Top Headlines</h1>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchmoredate}
                    hasMore={articles.length !==totalResults}
                    loader={<Spinner/>}>
                    <div className='container'>
                        <div className='row'>
                            {articles.map((Element) => {
                                return <div className='col-md-4 my-4' key={Element.url}>
                                    <Newscomponent title={Element.title ? Element.title : ""} description={Element.description ? Element.description : ""} imgUrl={Element.urlToImage} newsUrl={Element.url} date={Element.publishedAt ? Element.publishedAt : " "} />
                                </div>;
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div >
        )
    }

Newsmain.defaultProps = {
    country: "in",
    pagesize: 5,
    category: "general"
}
Newsmain.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number

}

export default Newsmain
