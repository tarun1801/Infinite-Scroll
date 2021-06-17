import {useEffect, useState} from 'react';
import axios from "axios";

export default function useRestaurantSearch(query,pageNumber ) {

    const [loading ,setLoading]=useState(true);
    const [error ,setError]=useState(false);
    const [restaurants ,setRestaurants]=useState([]);
    const [hasMore ,setHasMore]=useState(true);
    useEffect(()=>{
        setRestaurants([]);
    },[query])
    
    useEffect(()=>{
        setLoading(true);
        setError(false);
        let cancel;
       setTimeout(()=>{
        axios({
            method : "GET",
            url:"http://localhost:8080/restaurants",
            params : {q:query , page : pageNumber},
            cancelToken : new axios.CancelToken(c => cancel=c)

        }).then(res => {

            setRestaurants(prevRestaurants =>{
                return [...new Set([...prevRestaurants,...res.data.docs.map(b => b.name)])]
            })
            setHasMore(res.data.docs.length>0)
            setLoading(false);
            console.log(res.data)
        }).catch(e =>{
            console.log(e)
            
            if(axios.isCancel(e)){  
                return
                setError(true);
            } 
        })
        return ()=>{
            cancel();
        }

       },500);
      
        


    },[query,pageNumber])
    


    return {loading ,error , restaurants,hasMore}
    
}
