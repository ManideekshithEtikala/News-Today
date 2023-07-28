import React from 'react'
const Newscomponent = (props) => {
    let { title, description, imgUrl, newsUrl, date } =props;
    return (
        <div className="card" style={{
            width: "18rem",
            border: "2px solid black",
        }}>
            <img src={!imgUrl ? "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" : imgUrl} className="card-img-top" alt='img is not there' />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">Published on {date}</small></p>
                <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
    )
}
export default Newscomponent