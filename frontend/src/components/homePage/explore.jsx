import React, { useState, useEffect } from "react";
import "./home.css";
//Modules
import { useParams } from "react-router-dom";
//API
import { getPopularCollections } from "../../helpers/api";
//components
import Collections from "./collections";
import SideNav from "./sidenav";
import Navbar from "./navbar";
import Search from "./search";
import Carousel from "./carousel";

function Explore() {
  //states
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  
  // const params = useParams();
  const [searchText, setSearchText] = useState("");

  //lifecycle funcs
  useEffect(() => {
    console.log("rendering Home View");
    async function fetchCollection() {
      console.log("fetching collection data");
      try {
        const response = await getPopularCollections();
        setCollections(response.data);
      } catch (error) {
        console.error(error);
        setError("Error happened");
      }
      setIsLoading(false);
    }

    fetchCollection(refresh);
    setRefresh(false);
  }, [refresh]);

  return (
    <div className="root">
      <SideNav setRefresh={setRefresh} />
      <div className="main">
        <Navbar searchText={searchText} setSearchText={setSearchText} />
        <div
          className={!searchText.length ? "container" : "container dispnone"}
        >
          <h1>COLLECTIONS</h1>
          {error && <h4>{error}</h4>}
          {isLoading && <h4>Loading..</h4>}
          <Carousel title="Popular Collections">
            {collections.map((collection) => (
              <Collections key={collection.id} collection={collection} />
            ))}
          </Carousel>
        </div>

        <Search searchText={searchText} />
      </div>
    </div>
  );
}

export default Explore;
