import React, { useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Button from "../components/Button";
import { useAdminContext } from "../context/AdminContext";

export default function Administration() {
  const buttons = [
    {
      id: 1,
      image: "src/assets/block.png",
      activeImage: "src/assets/question-block.png",
      name: "Validations",
    },
    {
      id: 2,
      image: "src/assets/block.png",
      activeImage: "src/assets/question-block.png",
      name: "Utilisateurs",
    },
    {
      id: 3,
      image: "src/assets/block.png",
      activeImage: "src/assets/question-block.png",
      name: "Street-Arts",
    },
    {
      id: 4,
      image: "src/assets/block.png",
      activeImage: "src/assets/question-block.png",
      name: "Artistes",
    },
  ];

  const { validations } = useLoaderData();
  const [collection, setCollection] = useState(validations);

  const [activeButton, setActiveButton] = useState(buttons[0].id);
  const {
    users,
    removeUser,
    artists,
    removeArtist,
    streetArt,
    removeStreetArt,
  } = useAdminContext();

  const formattedDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const handleOptionClick = (id) => {
    setActiveButton(id);
  };

  const changePendingImage = async (id, status, userId) => {
    try {
      await axios.patch(
        `http://localhost:3310/api/pendingImages/status/${id}`,
        { status, userId }
      );
      setCollection([...collection.filter((item) => item.id !== id)]);
    } catch (error) {
      console.error("Error validating image:", error);
    }
  };

  return (
    <div className="admin-page allow-scroll-container">
      <div>
        <h1>Administration</h1>
        <div className="container mt-40">
          <div className="admin-buttons mt-40 mb-30">
            {buttons.map((button) => (
              <button
                key={button.id}
                type="button"
                onClick={() => handleOptionClick(button.id)}
                className="block-button"
              >
                <div className="button-name">{button.name}</div>
                <img
                  src={
                    activeButton === button.id
                      ? button.activeImage
                      : button.image
                  }
                  className={`block mt-10${
                    activeButton === button.id ? " active" : ""
                  }`}
                  alt={`Button ${button.id}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Validations */}
      {activeButton ===
        buttons.find((button) => button.name === "Validations").id && (
        <div className="allow-scroll pos-r">
          <div className="admin-validations bg-text-block">
            {collection.length > 0 ? (
              <div className="admin-item-list">
                {collection.map((item) => (
                  <div key={item.id} className="admin-item">
                    <h5 className="t-center mb-10">
                      #{item.id} - Le {formattedDate(item.upload_date)} à{" "}
                      {item.upload_time}
                    </h5>
                    <div className="has-two-items">
                      <div className="admin-item-child">
                        <h4 className="mb-10">{item.street_art_name}</h4>
                        <p className="mb-20">
                          X : {item.street_art_longitude}
                          <br />Y : {item.street_art_latitude}
                        </p>
                        <img
                          src={item.street_art_image}
                          alt={item.street_art_image}
                        />
                      </div>
                      <div className="admin-item-child">
                        <h4 className="mb-10">{item.username}</h4>
                        <p className="mb-20">
                          X : {item.longitude}
                          <br />Y : {item.latitude}
                        </p>
                        <img
                          src={`http://localhost:3310/${item.img_src}`}
                          alt={`${item.username}'s upload`}
                        />
                      </div>
                    </div>
                    <div className="admin-button-container mt-20">
                      <Button
                        className="button"
                        type="button"
                        onClick={async () => {
                          await changePendingImage(
                            item.id,
                            "validate",
                            item.user_id
                          );
                        }}
                      >
                        Valider
                      </Button>
                      <Button
                        color="red"
                        className="button"
                        type="button"
                        onClick={() =>
                          changePendingImage(item.id, "refused", item.user_id)
                        }
                      >
                        Refuser
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h4 className="t-center mb-20 mt-20">
                Aucune validation en attente.
              </h4>
            )}
          </div>
        </div>
      )}

      {/* Utilisateurs */}
      {activeButton ===
        buttons.find((button) => button.name === "Utilisateurs").id && (
        <div className="allow-scroll pos-r">
          <div className="admin-users bg-text-block">
            <div className="admin-item-list">
              {users
                .filter((user) => !user.is_admin)
                .map((user) => (
                  <div key={user.id} className="admin-item">
                    <div className="admin-user admin-item-infos">
                      <p>Pseudo : {user.username}</p>
                      <p>Email : {user.email}</p>
                      <p>Code Postal : {user.postcode}</p>
                      <p>Ville : {user.city}</p>
                    </div>
                    <div className="admin-button-container">
                      <Button color="yellow" className="button" type="button">
                        Modifier
                      </Button>
                      <Button
                        color="red"
                        className="button"
                        type="button"
                        onClick={() => removeUser(user.id)}
                      >
                        Exclure
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Street arts */}
      {activeButton ===
        buttons.find((button) => button.name === "Street-Arts").id && (
        <div className="allow-scroll pos-r">
          <div className="admin-streetarts bg-text-block">
            <div className="admin-item-list">
              {streetArt.map((art) => (
                <div key={art.id} className="admin-item">
                  <div className="admin-item-infos d-flex d-flex-center d-flex-column">
                    <img src={art.image} alt={`Button ${art.id}`} />
                    <div>
                      <p className="mb-10">
                        #{art.id} - {art.title}
                      </p>
                      <p className="mb-10">Artiste: {art.author}</p>
                      <p className="mb-10">Adresse: {art.address}</p>
                      <p className="mb-10">Créé le: {art.creation_date}</p>
                      <p className="mb-10">Lng: {art.longitude}</p>
                      <p className="mb-10">Lat: {art.latitude}</p>
                    </div>
                  </div>
                  <div className="admin-button-container">
                    <Button color="yellow" className="button" type="button">
                      Modifier
                    </Button>
                    <Button
                      color="red"
                      className="button"
                      type="button"
                      onClick={() => removeStreetArt(art.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Artistes */}
      {activeButton ===
        buttons.find((button) => button.name === "Artistes").id && (
        <div className="allow-scroll pos-r">
          <div className="admin-artists bg-text-block">
            <div className="admin-item-list">
              {artists.map((artist) => (
                <div key={artist.id} className="admin-item">
                  <div className="admin-item-infos">
                    <p className="mb-10">
                      Artiste {artist.id} : {artist.name}
                    </p>
                    <p className="mb-10">Biographie : {artist.biography}</p>
                    <p className="mb-10">
                      <a target="_blank" rel="noreferrer" href={artist.website}>
                        Site web
                      </a>
                    </p>
                  </div>
                  <div className="admin-button-container">
                    <Button color="yellow" className="button" type="button">
                      Modifier
                    </Button>
                    <Button
                      color="red"
                      className="button"
                      type="button"
                      onClick={removeArtist}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
