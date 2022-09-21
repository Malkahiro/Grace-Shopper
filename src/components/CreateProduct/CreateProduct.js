import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../axios-services/index"

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [released, setReleased] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [format, setFormat] = useState("");
    const [creator, setCreator] = useState("");
    const [genre, setGenre] = useState("");
    const [isPhysical, setIsPhysical] = useState(true);
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      try {
      event.preventDefault();
      const newProduct = {
        name: name,
        released: released,
        description: description,
        type: type,
        format: format,
        creator: creator,
        genre: genre,
        isPhysical: isPhysical,
        price: price,
        imageURL: image,
      };
      await createProduct(newProduct);
      navigateNew();
    } catch (error) {
      console.error(error)
    }
    };
    const navigateNew = () => {
        navigate("/admin");
      };
      return (
        <div id="newProductBox">
          <h1 id="new-product-header">Create New Product</h1>
          <form id="newProduct" onSubmit={handleSubmit}>
            <label className="postTitles">Name:</label>
            <br />
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              size={"58"}
              minLength={1}
              type="text"
              title="name"
              value={name}
              required
            />
            <br />
            <label className="postTitles">Release Date:</label>
            <br />
            <input
              size={"58"}
              minLength={1}
              id="releasedID"
              onChange={(event) => {
                setReleased(event.target.value);
              }}
              type="text"
              title="released"
              value={released}
              required
            />
             <br />
            <label className="postTitles">Description:</label>
            <br />
            <input
              size={"58"}
              minLength={1}
              id="descriptionID"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              type="text"
              description="description"
              value={description}
              required
            />
             <br />
            <label className="postTitles">Type:</label>
            <br />
            <input
              size={"58"}
              minLength={1}
              id="typeID"
              onChange={(event) => {
                setType(event.target.value);
              }}
              type="text"
              title="type"
              value={type}
              required
            />
             <br />
            <label className="postTitles">Format:</label>
            <br />
            <input
              size={"58"}
              minLength={1}
              id="formatID"
              onChange={(event) => {
                setFormat(event.target.value);
              }}
              type="text"
              title="format"
              value={format}
              required
            />
             <br />
            <label className="postTitles">Creator:</label>
            <br />
            <input
              size={"58"}
              minLength={1}
              id="creatorID"
              onChange={(event) => {
                setCreator(event.target.value);
              }}
              type="text"
              title="creator"
              value={creator}
              required
            />
             <br />
            <label className="postTitles">Genre:</label>
            <br />
            <input
              size={"58"}
              minLength={1}
              id="genreID"
              onChange={(event) => {
                setGenre(event.target.value);
              }}
              type="text"
              title="genre"
              value={genre}
              required
            />
             <br />
            <label className="postTitles">Image URL:</label>
            <br />
            <input
              size={"58"}
              minLength={1}
              id="imageID"
              onChange={(event) => {
                setImage(event.target.value);
              }}
              type="text"
              title="imageURL"
              value={image}
              required
            />
            <br />
            <label className="postTitles">Price:</label>
            <br />
            <input
              placeholder="$"
              id="price-box"
              size={"5"}
              className="postTitles"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              type="text"
              price="price"
              value={price}
              required
            />
            <div className="postTitles">
              <input
                id="checkbox"
                className="postTitles"
                onChange={(event) => {
                  setIsPhysical(event.target.checked);
                }}
                type="checkbox"
                name="isPhysical"
                checked={isPhysical}
              />
              Digital Copy
            </div>
            <button className="m-button" type="submit">
              Submit Product
            </button>
          </form>
        </div>
      );
}
export default CreateProduct;