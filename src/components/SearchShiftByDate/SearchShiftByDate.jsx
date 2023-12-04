import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
 






const SearchShiftByDate = () => {


    const [search, setSearch] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        
      };
    
    return (  
        <form onSubmit={handleSubmit} className="searchbar">
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="date"
            id="search"
          
          ></input>
          <button type="submit" className="searchButton"> Search Shift </button>
        </form>
      );
      
}
 
export default SearchShiftByDate;