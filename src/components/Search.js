import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
const Search = () => {
  const API_URL = `https://top-news-backend.onrender.com`;
  const params = useParams();
  const { query } = params;
  const [slugData, setSlugData] = useState(null);
  console.log(slugData)
  const byslugFunc = async () => {
    const hedlines = await fetch(`${API_URL}/api/headlines?filters[*][$containsi]=${query}&populate=*`);
    const hedlineData = await hedlines.json();
    setSlugData(hedlineData)
  }
  useEffect(() => {
    byslugFunc()
    // eslint-disable-next-line
  }, [query])
  return (
    <div className='fluid-container mb-5'>
      <h1 className='fs-1 text-center mt-20 mb-5 fw-bold text-light'>News App - Top News Headlines </h1>
      <div className='container'>
        <div className='row'>
          <p className="text-white text-3xl pb-7 text-center"> {` Your Search Keybord [ ${query} ] matched in : ${slugData && slugData.data !== null ? slugData.data.length  + " Articles" : <Loading/> }`} </p>
          {slugData && slugData.data !== null ? slugData.data.map((element, key) => {
            return <div className='col-md-4' key={key}>
              <NewsItem title={element.attributes.title} description={element.attributes.description} image={element.attributes.image.data.attributes.url} author={element.attributes.author} date={element.attributes.publishedAt} slug={element.attributes.slug} />
            </div>
          }) : " Sorry No Content "}
        </div>
      </div>
    </div>
  );
};
export default Search;
