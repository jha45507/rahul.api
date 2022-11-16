import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ReadMore = (props) => {
  const API_URL = `https://top-news-backend.onrender.com`;
  const params = useParams();
  const { slug } = params;
  const [slugData, setSlugData] = useState(null);
  const [handlepage, setHandlepage] = useState(null)
  const byslugFunc = async () => {
    props.setProgress(70)
    const hedlines = await fetch(
      `${API_URL}/api/headlines?filters[slug][$contains]=${slug}&populate=*`
    );
    const hedlineData = await hedlines.json();

    if (hedlineData.data.length >= 1) {
      setSlugData(hedlineData);
      const api = await fetch(`${API_URL}/api/headlines?populate=*`)
      const apiData = await api.json();
      props.setProgress(100)
      setHandlepage(apiData.data)
    }
  }

  let previous, next;

  for (const i in handlepage) {
      if(handlepage[i].attributes.slug === slug){
        if(i <= handlepage.length){
          previous = handlepage[parseInt(i) - 1]
          next = handlepage[parseInt(i) + 1]
          break
        }
      }  
    }

  useEffect(() => {
    byslugFunc()
    // eslint-disable-next-line
  }, [slug])


  return (
    <div className="mainbgimg">
      <div className="flex justify-center">
        <div className='mt-20 showdiv sm:w-3/4 sm:mx-6 flex justify-center rounded-2xl bgimg mx-2 px-2 w-full'>
          {slugData !== null ? (
            <div className="text-light sm:w-2/4 text-center mt-3">
              <h1 className="fs-1 underline underline-offset-8">{slugData.data[0].attributes.title}</h1>
              <img src={`${slugData.data[0].attributes.image.data.attributes.formats.small.url}`} className="rounded-md mt-8 mx-auto w-full showimg" alt="" />
              <p className="mt-3 text-lg justify text-justify textshadow">{slugData.data[0].attributes.description}</p>
              <p className="mb-3 textshadow"> By {slugData.data[0].attributes.author} On {slugData.data[0].attributes.publishedAt}</p>
            </div>) : " "}
        </div>
      </div>
      <div className="flex justify-around py-3">
      <Link  to={`/blog/${previous && previous.attributes.slug}`}  className={`${previous===undefined && 'hidden'} btn btn-primary btn-sm btn-sm`}>&#60; &#60; Previous &#62;</Link>
      <Link  to={`/blog/${next && next.attributes.slug}`}  className={`${next===undefined && 'hidden'} btn btn-primary btn-sm btn-sm `}>&#60; Next &#62; &#62;</Link>
      </div>
    </div>
  );
};

export default ReadMore;
