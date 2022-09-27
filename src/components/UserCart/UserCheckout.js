import React  from "react";
import { useNavigate } from "react-router-dom";

const UserCheckout = () => {
    const navigate = useNavigate();
    const submit = async () => {
        navigate('/success')
    }
    return (
        <div>
            <form onSubmit={submit}>
<h1>Please Enter Payment Information</h1>
            <label className="postTitles">Shipping Address:</label>
            <br />
            <input
              size={"58"}
              minLength={1}
              type="text"
              title="name"
              required
            />
            <br />
            <label className="postTitles">Name On Card:</label>
            <br />
            <input
              size={"58"}
              minLength={1}
              type="text"
              title="name"
              required
            />
            <br />
            <label className="postTitles">Card Number:</label>
            <br />
            <input
              size={"58"}
              minLength={1}
              type="text"
              title="name"
              required
            />
            <br />
            <label className="postTitles">Expiration Date</label>
            <br />
            <input
              size={"5"}
              minLength={1}
              type="text"
              title="name"
              required
            />
            <br />
            <label className="postTitles">Security Code</label>
            <br />
            <input
              size={"3"}
              minLength={1}
              type="text"
              title="name"
              required
            />
            <br />
<button
            id="success-button"
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Place Order
          </button>
          </ form>
          </div>
    );
}
export default UserCheckout;