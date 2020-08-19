import React, { useState, useEffect } from "react";
import "./home.sass";
//api
import { getFollowedCollections } from "../../helpers/api";
//componentss
import { useStateValue } from "../../helpers/stateProvider";

function Home() {
  //states
  const [followedCollections, setFollowedCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);
  //globalstates
  const [, dispatch] = useStateValue();
  //mount
  useEffect(() => {
    // temp
    localStorage.setItem("token", "7f32ddcb88eb6ab14e786fa3bc90b260324e0a9c");
    // temp
    console.log("[RENDERING] >> Home ");
    async function fetchFollowedCollection() {
      console.log("[GET] >> FollowedCollections");
      try {
        const response = await getFollowedCollections();
        setFollowedCollections(response.data);
      } catch (error) {
        console.log(`[ERROR] >> ${error.response}`);
        setGetError("Error communicating with server");
      }
    }
    fetchFollowedCollection();
    setIsLoading(false);
  }, []);

  return (
    <main className="home">
      <header>This should be aqua yellow</header>
      <section>
        <div className="followedCollections">
          {isLoading
            ? null
            : followedCollections.map((collection) => (
                <div key={collection.id}>
                  {/* Insert component here */}
                  <h4>{collection.name}</h4>
                </div>
              ))}
          {getError && <div>{getError}</div>}
        </div>
        <button
          onClick={() => {
            dispatch({
              type: "OPEN_FORM",
              form: "create_collection",
            });
          }}
        >
          CREATE COLLECTIOn
        </button>
        <button
          onClick={() => {
            dispatch({
              type: "OPEN_FORM",
              form: "edit_collection",
            });
          }}
        >
          EDIT COLLECTIOn
        </button>
      </section>
    </main>
  );
}

export default Home;
