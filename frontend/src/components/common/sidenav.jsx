import React, { useState, useEffect } from "react";
//ICONS
import {
  faHome,
  faFolderOpen,
  faPlusCircle,
  faTimes,
  faHashtag,
  faBed,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//MODULES
import { useHistory, Link } from "react-router-dom";
//API
import { postNewCollection, getFollowedCollections } from "../../helpers/api";
import Modal from "./modal";

function SideNav({ setRefresh }) {
  let history = useHistory();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [modalView, setModalView] = useState(false);
  const [error, setError] = useState("");
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await getFollowedCollections();
        const followed = response.data;
        setFollowed(followed);
      } catch (error) {
        setError(error);
      }
    }

    getData();
  }, []);

  const createCollection = async (e) => {
    e.preventDefault();
    const payload = { name, desc };
    try {
      const response = await postNewCollection(payload);
      setModalView(false);
      history.push(`/detail/${response.data.id}`);
      setRefresh(true);
    } catch {
      console.log("Failed to create a new collection");
      setError("Invalid Entry");
    }
  };

  const redirectHome = () => {
    history.push("/home");
  };
  const rediretExplore = () => {
    history.push("/explore");
  };
  const redirectUser = () => {
    const username = localStorage.getItem("user");
    history.push(`/user/${username}`);
  };
  const redirectNotification = () => {
    history.push("/notifications");
  };
  return (
    <div className="sidenav">
      <div className="sidenav-container">
        <div className="dotdotdot" onClick={() => {}}>
          ...
        </div>
        <div className="sidenav-link" onClick={redirectHome}>
          {" "}
          <FontAwesomeIcon icon={faHome} />
          &nbsp;Home
        </div>
        <div className="sidenav-link" onClick={rediretExplore}>
          {" "}
          <FontAwesomeIcon icon={faHashtag} />
          &nbsp;Explore
        </div>
        <div className="sidenav-link" onClick={redirectNotification}>
          {" "}
          <FontAwesomeIcon icon={faBell} />
          &nbsp;Notification
        </div>
        <div className="sidenav-link" onClick={redirectUser}>
          {" "}
          <FontAwesomeIcon icon={faUserCircle} />
          &nbsp;Profile
        </div>
        <div className="line" />
        <h4>COLLECTIONS</h4>
        <div className="followed-colls">
          {followed.map((coll) => (
            <Link key={coll.id} to={`/detail/${coll.id}`}>
              {coll.name}
            </Link>
          ))}
        </div>
        <div className="line" />
        <div
          onClick={() => {
            setModalView(true);
          }}
          className="addCollection sidenav-link"
        >
          ADD COLLECTION&nbsp;
          <FontAwesomeIcon icon={faPlusCircle} />
        </div>
      </div>
      <div>
        {modalView && (
          <Modal setModalView={setModalView}>
            <div className="form">
              <h4>CREATE NEW COLLECTION</h4>
              <div className="formContainer">
                <div className="formCard" />
                <div className="formText">
                  <h5>Name</h5>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <h5>Description</h5>
                  <textarea
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="errorText">{error}</div>
              <div className="buttonHolder">
                <button onClick={createCollection}>CREATE</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default SideNav;
