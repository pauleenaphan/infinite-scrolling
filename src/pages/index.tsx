import React, { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchInts = async(currPage: number) =>{
  const response = await fetch(`/api/int?page=${currPage}`);
  const data = await response.json();
  console.log("data", data);
  return data.data; 
}

export default function Home() {
  const [pageNum, setPageNum] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['integers', pageNum], 
    queryFn: () => fetchInts(pageNum), 
  });

  // detects when user has reach the bottom of the page
  useEffect(() =>{
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY; // viewport height + scrolled distance
      const documentHeight = document.documentElement.offsetHeight; // total height of the page 
      
      // scroll has reached the bottom of the page
      if (scrollPosition >= documentHeight) {
        setPageNum((prevPageNum) => prevPageNum + 1); 
      }
    };

    // attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

  }, [])
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred!</div>;

  return (
    <div>
      {data?.map((integer: number, index: number) => 
      <div className="text-4xl text-center p-5"
        key={index}>
          {integer}
        </div>)}
    </div>
  );
}
