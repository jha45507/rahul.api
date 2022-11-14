import { Link } from "react-router-dom";
const NewsItem = (props) => {
    return (
        <>
            <div className='mb-10'>{!props.data ?
                <div className="card m-auto mybox">
                    <img src={`${props.image}`} className="card-img-top mb-2 imgsize" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title text-justify">{props.title.length > 40 ? props.title.slice(0, 40) + "..." : props.title}</h5>
                        <p className="card-text text-justify mt-3">{props.description.length > 180 ? props.description.slice(0, 180) + "..." : props.description}</p>
                        <p className="card-text my-2 text-justify">By {props.author} on {props.date}</p>
                        <Link rel="noreferrer" to={`/blog/${props.slug}`} target="_blank" className="btn my-2 btn-sm btn-dark">Read more</Link>
                    </div>
                </div> : " "}
            </div>
        </>
    )

}

export default NewsItem;