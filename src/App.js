import React, { useState,useRef,useCallback } from "react";
import useRestaurantSearch from "./useRestaurantSearch";

function App() {
  const [query,setQuery] = useState("");
  const [pageNumber,setPageNumber] =  useState(1);
  
const {restaurants,hasMore,loading,error} =  useRestaurantSearch(query,pageNumber);

  const observer = useRef();
  const lastRestaurantRef = useCallback(node =>{
       if(loading) return;

       if(observer.current) observer.current.disconnect();
       observer.current = new IntersectionObserver(entries=>{
         if(entries[0].isIntersecting && hasMore){
           setTimeout(()=>{
            setPageNumber(prevPageNumber => prevPageNumber +1)
           },1000)
         }
         
       })
       if(node)
       observer.current.observe(node);
  },[loading ,hasMore]);

  function handleChange(e){
    setQuery(e.target.value);
    setPageNumber(1);
  }
  return (
    <div >
    <input type = "text" value = {query} onChange = {handleChange}></input>
    <div>{restaurants.length===0 && "No result found"}</div>
    
    {
      restaurants.map((restaurant,index) =>{
      
      if(restaurants.length === index+1)
      {
        return(<div ref = {lastRestaurantRef}key = {restaurant}>
      {restaurant}
      </div>)
      }
      else
      {
        return(<div style = {{height:"100px"}} key = {restaurant}>
      {restaurant}
      </div>)
      }
     
    })}
    <div>{loading && "Loading..."}</div>
    <div>{error && "Error"}</div>       
    </div>
  );
}

export default App;


