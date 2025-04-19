import React, { useEffect, useState } from 'react';
import Newscomponent from './Newscomponent';
import axios from 'axios';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const Newsmain = ({ country = "in", pagesize = 5, category = "general", setProgress }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updatenews = async () => {
        setProgress(20);
        let url = `https://gnews.io/api/v4/top-headlines?category=${category}&coutnry=%27${country}%27&apikey=a094726cf7f1164b03afb2bc5280dd5a`;
        setLoading(true);
        const response = await axios.get(url);
        setProgress(30);
        const parsedData = response.data;
        setProgress(90);
        if (Array.isArray(parsedData.articles)) {
            setArticles(parsedData.articles);
        } else {
            setArticles([]);
        }
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setProgress(100);
    }

    const fetchmoredate = async () => {
        let url = `https://gnews.io/api/v4/top-headlines?category=${category}&coutnry=%27${country}%27&apikey=a094726cf7f1164b03afb2bc5280dd5a`;
        setPage(page + 1);
        const response = await axios.get(url);
        const parsedData = response.data;
        if (Array.isArray(parsedData.articles)) {
            setArticles(articles.concat(parsedData.articles))
          } else {
            setArticles([]);
        }
        setTotalResults(parsedData.totalResults);
    };

    useEffect(() => {
        document.title = `${category}-News Today`;
        updatenews();
    }, [category]);

    return (
        <div className="container my-3">
            <h1 className='text-center ' style={{ marginTop: "70px" }}>News-Today Top Headlines</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchmoredate}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className='row'>
                        {articles.map((Element) => {
                            return <div className='col-md-4 my-4' key={Element.url}>
                                <Newscomponent title={Element && Element.title ? Element.title : ""} description={Element && Element.description ? Element.description : ""} imgUrl={Element && Element.image ? Element.image : "https://www.reuters.com/resizer/oS-g0F3l-coD4v2m0AUi30a592Q=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/N2J6Z4XWY5M4ZCUF66DPZTOQIM.jpg"} newsUrl={Element && Element.url ? Element.url: "https://www.reuters.com/world/middle-east/iran-supreme-leader-khamenei-praises-hamas-attack-israel-2023-10-10/"} date={Element && Element.publishedAt ? Element.publishedAt : " "} />
                            </div>;
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )

}

export default Newsmain;