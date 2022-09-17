import React  from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();
    const submit = async () => {
        navigate('/products')
    }
    return (
        <div>
            <form onSubmit={submit}>
<h1>You Have Successfully Placed Your Order!</h1>
<button
            id="success-button"
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            OK
          </button>
          </ form>
          </div>
    );
}
export default Success;