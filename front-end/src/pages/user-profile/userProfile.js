import React, { useContext, useEffect, useState } from "react";
import "./userProfile.css";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "../../components/text-field/TextField";
import MainButton from "../../components/main-button/MainButton";
import axios from "axios";

function UserProfile() {
  const { user, orders } = useContext(ProductDataContext);
  const [userOrders, setUserOrders] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editUserData, setEditUserData] = useState({
    username: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    userOrdersData();
  }, [orders]);

  const filteredOrders = orders.filter(
    (order) => order.user.name === user.name
  );

  const userOrdersData = () => {
    setUserOrders(filteredOrders);
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    setEditUserData({ ...editUserData, [event.target.name]: value });
  };

  const editUserProfile = async () => {
    const editUserProfileDataForm = {
      username: editUserData.username,
      address: editUserData.address,
      phone: editUserData.phone,
      email: editUserData.email,
      password: editUserData.password,
    };
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/${user._id}`,
        editUserProfileDataForm
      );
      console.log(response);
      setIsEdit(false);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const getRowId = (row) => {
    return row._id;
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "products",
      headerName: "Products",
      width: 400,
      renderCell: (params) => {
        const products = params.row.products
          .map((product) => `${product._id.name}: ${product.quantity}`)
          .join(", ");
        return (
          <div style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
            {products}
          </div>
        );
      },
    },
    { field: "total", headerName: "Total ($)", width: 80 },
    { field: "createdAt", headerName: "Order Date", width: 200 },
  ];

  return (
    <div className="user-profile-page">
      <div className="user-profile-page-container">
        <h2 className="user-profile-heading">User Profile</h2>
        <div className="user-profile-data">
          <div>
            <TextField
              type="text"
              label="Username:"
              name="username"
              disabled={!isEdit}
              placeholder={user ? user.username : "Loading..."}
              defaultValue={user && user.username}
              // value={user && user.username}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Address:"
              name="address"
              disabled={!isEdit}
              placeholder={user ? user.address : "Loading..."}
              defaultValue={user && user.address}
              // value={user && user.address}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Phone:"
              name="phone"
              disabled={!isEdit}
              placeholder={user ? user.phone : "Loading..."}
              defaultValue={user && user.phone}
              // value={user && user.phone}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <TextField
              type="email"
              label="Email:"
              name="email"
              disabled={!isEdit}
              placeholder={user ? user.email : "Loading..."}
              defaultValue={user && user.email}
              // value={user && user.email}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <TextField
              type="password"
              label="Password:"
              name="password"
              disabled={!isEdit}
              placeholder="******"
              defaultValue={user && user.password}
              // value={user && user.password}
              onChange={handleEditChange}
            />
          </div>
        </div>
        <div className="user-edit-profile">
          {isEdit ? (
            <div className="user-edit-profile-btns">
              <MainButton name="Submit" onClick={() => editUserProfile()} />
              <MainButton
                name="Cancel"
                style={{ backgroundColor: "var(--text-color-1)" }}
                onClick={() => setIsEdit(false)}
              />
            </div>
          ) : (
            <div className="user-edit-profile-btns">
              <MainButton name="Edit Profile" onClick={() => setIsEdit(true)} />
            </div>
          )}
        </div>
        <Box sx={{ height: 400, width: "100%", paddingInline: "2rem" }}>
          <h2 className="user-profile-orders-heading">My Orders:</h2>
          <DataGrid
            sx={{ width: "100%" }}
            rows={userOrders}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowId={getRowId}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}
export default UserProfile;
