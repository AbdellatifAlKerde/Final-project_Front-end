import React, { useState } from "react";
import "./ownerRegister.css";
import logo from "../../assets/images/LOGO (1).svg";
import TextField from "../../components/text-field/TextField";
import MainButton from "../../components/main-button/MainButton";
import axios from "axios";
import Spinner from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Cookies from "js-cookie";

function OwnerRegister() {
  const navigate = useNavigate();
  const [ownerData, setOwnerData] = useState({
    name: "",
    description: "",
    location: "",
    username: "",
    password: "",
    isSuper: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    const value = e.target.value;
    setOwnerData({ ...ownerData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    const restoForm = {
      name: ownerData.name,
      description: ownerData.description,
      location: ownerData.location,
    };

    const ownerForm = {
      username: ownerData.username,
      password: ownerData.password,
      isSuper: ownerData.isSuper,
    };
    e.preventDefault();
    setIsLoading(true);
    try {
      const ownerResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/register`,
        ownerForm
      );
      console.log(ownerResponse);
      if (ownerResponse.status === 201) {
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        Cookies.set("admin-token", ownerResponse.data.token, {
          expires: oneWeek,
        });
        Cookies.set("isSuper", ownerResponse.data.isSuper, {
          expires: oneWeek,
        });

        const restoResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/rest`,
          restoForm
        );
        console.log(restoResponse);
        navigate("/admin-login");
      } else {
        console.log("Invalid data");
      }
    } catch (e) {
      console.log(e);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="owner-register-header">
        <div
          className="owner-register-header-logo"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="quick bite logo" />
        </div>
        <nav className="owner-register-header-navigation">
          <MainButton
            name="Login"
            style={{
              paddingBlock: ".7rem",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => navigate("/admin-login")}
          >
            <span style={{ marginLeft: ".5rem" }}>
              <PersonRoundedIcon />
            </span>
          </MainButton>
        </nav>
      </header>
      <div className="owner-register-page">
        <div className="owner-register-container">
          <form className="owner-register-form" onSubmit={handleSubmit}>
            <h2>Get started</h2>
            <a href="/admin-login">Already have an account?</a>
            <div className="owner-register-form-content">
              <div
                style={{ color: "var(--accent-color)", cursor: "pointer" }}
                onClick={() => setError("")}
              >
                {error}
              </div>
              <div>
                <TextField
                  label="Restaurant name"
                  type="text"
                  name="name"
                  onChange={handleFormChange}
                  required={true}
                />
              </div>
              <div>
                <TextField
                  label="Restaurant location"
                  type="text"
                  name="location"
                  onChange={handleFormChange}
                  required={true}
                />
              </div>
              <div>
                <TextField
                  label="About the restaurant"
                  type="text"
                  name="description"
                  onChange={handleFormChange}
                  required={true}
                />
              </div>
              <div>
                <TextField
                  label="Username"
                  type="text"
                  name="username"
                  onChange={handleFormChange}
                  required={true}
                />
              </div>
              <div>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleFormChange}
                  required={true}
                />
              </div>
              <div>
                <MainButton
                  type="submit"
                  name={isLoading ? "" : "Submit"}
                  style={{
                    width: "100%",
                  }}
                  disabled={isLoading}
                >
                  {isLoading && <Spinner />}
                </MainButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default OwnerRegister;
