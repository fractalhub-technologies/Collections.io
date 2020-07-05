import React, { useState, useEffect } from "react";
import { getCollections } from "../helpers/api";
import Navbar from "./navbar";
import CollectionItem from "./collection-item";
import styles from "./collections.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    async function fetchCollection() {
      try {
        const response = await getCollections();
        setCollections(response.data);
      } catch (error) {
        setError("Error happened");
      }
      setIsLoading(false);
    }

    fetchCollection();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <Navbar />
        <div className={styles.slider}>
          <div className={styles.title}>Collections</div>
          <Slider {...settings}>
            {collections.map((coll) => (
              <CollectionItem
                key={coll.name}
                name={coll.name}
                owner={coll.owner}
                desc={coll.desc}
                snippets={coll.snippets}
              />
            ))}
          </Slider>
        </div>

        {/* <div className={styles.title}>Collections</div>
        <div className={styles.container}>
          {isLoading && "Loading..."}
          {error ? error : null}
          {collections.map((coll) => (
            <CollectionItem
              key={coll.name}
              name={coll.name}
              owner={coll.owner}
              desc={coll.desc}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
