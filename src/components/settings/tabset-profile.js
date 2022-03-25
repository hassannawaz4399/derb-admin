import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Settings } from "react-feather";
import { Table } from "reactstrap";
import "../users/User.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userId = sessionStorage.getItem("userId");

const TabsetProfile = (data) => {
  const { first_name, last_name, email, gender, mobile, dob, password } =
    data.data;
  const url = `${process.env.REACT_APP_BASE_URL}/users/${userId}`;

  let [user, setuser] = useState({
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
    dob: dob,
    password: password,
  });
  const [image, setimg] = useState([]);

  const change = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submit = () => {
    const formData = new FormData();
    formData.append("user_image", image);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("gender", user.gender);
    formData.append("dob", user.dob);

    axios
      .put(url, formData)
      .then((res) => {
        toast.success("Profile Update Successfully", {
          theme: "dark",
        });
        // getuser();
      })
      .catch((err) => {
        toast.error("Please Fill All Field", {
          theme: "dark",
        });
      });
  };

  return (
    <div>
      <ToastContainer />
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">
            <User className="mr-2" />
            Profile
          </Tab>
          <Tab className="nav-link">
            <Settings className="mr-2" />
            Update Profile
          </Tab>
        </TabList>

        <TabPanel>
          <div className="tab-pane fade show active">
            <h5 className="f-w-600 f-16">Profile</h5>
            <div className="table-responsive profile-table">
              <Table>
                <tbody>
                  <tr>
                    <td>First Name:</td>
                    <td>{first_name}</td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td>{last_name}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <td>Gender:</td>
                    <td>{gender}</td>
                  </tr>
                  <tr>
                    <td>Mobile Number:</td>
                    <td>{mobile}</td>
                  </tr>
                  <tr>
                    <td>DOB:</td>
                    <td>{dob}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <h3 className="heading">Update Your Profile</h3>
          <article className="option-wrapper">
            <label className="setting">
              <p className="text">First Name</p>
              <input
                type="text"
                name="first_name"
                value={user?.first_name}
                onChange={(e) => change(e)}
              />
            </label>
            <label className="setting">
              <p className="text">Last Name</p>
              <input
                type="text"
                name="last_name"
                value={user?.last_name}
                onChange={(e) => change(e)}
              />
            </label>
            <label className="setting">
              <p className="text">Email</p>
              <input
                type="text"
                name="email"
                value={user?.email}
                onChange={(e) => change(e)}
              />
            </label>
            <label className="setting">
              <p className="text">Password</p>
              <input
                type="password"
                name="password"
                value={user?.password}
                onChange={(e) => change(e)}
              />
            </label>
            <label className="setting">
              <p className="text">Gender</p>
              <article>
                <input
                  className=".input"
                  type="radio"
                  id="Check"
                  name="check"
                  value="Male"
                  onChange={(e) => change(e)}
                />
                <label className="mx-3">Male</label>
                <input
                  type="radio"
                  name="check"
                  id="Check"
                  value="Female"
                  onChange={(e) => change(e)}
                />
                <label className="mx-3">Female</label>
              </article>
            </label>
            <label className="setting">
              <p className="text">DOB</p>
              <input type="date" name="dob" onChange={(e) => change(e)} />
            </label>
            <label className="setting">
              <p className="text">Update Image</p>
              <input
                type="file"
                placeholder="upload Image"
                name="image"
                onChange={(e) => setimg(e.target.files[0])}
              />
            </label>
          </article>
          <article className="updatebtn">
            <button className="btn1" onClick={submit}>
              Update
            </button>
          </article>
          {/* <div className="tab-pane fade"> */}
          {/* <div className="account-setting">
            <h5 className="f-w-600 f-16">Notifications</h5>
            <Row>
              <Col>
                <Label className="d-block">
                  <Input
                    className="checkbox_animated"
                    id="chk-ani"
                    type="checkbox"
                    defaultChecked
                  />
                  Allow Desktop Notifications
                </Label>
                <Label className="d-block">
                  <Input
                    className="checkbox_animated"
                    id="chk-ani1"
                    type="checkbox"
                  />
                  Enable Notifications
                </Label>
                <Label className="d-block">
                  <Input
                    className="checkbox_animated"
                    id="chk-ani2"
                    type="checkbox"
                  />
                  Get notification for my own activity
                </Label>
                <Label className="d-block mb-0">
                  <Input
                    className="checkbox_animated"
                    id="chk-ani3"
                    type="checkbox"
                    defaultChecked
                  />
                  DND
                </Label>
              </Col>
            </Row>
          </div>
          <div className="account-setting deactivate-account">
            <h5 className="f-w-600 f-16">Deactivate Account</h5>
            <Row>
              <Col>
                <Label className="d-block">
                  <Input
                    className="radio_animated"
                    id="edo-ani"
                    type="radio"
                    name="rdo-ani"
                    defaultChecked
                  />
                  I have a privacy concern
                </Label>
                <Label className="d-block">
                  <Input
                    className="radio_animated"
                    id="edo-ani1"
                    type="radio"
                    name="rdo-ani"
                  />
                  This is temporary
                </Label>
                <Label className="d-block mb-0">
                  <Input
                    className="radio_animated"
                    id="edo-ani2"
                    type="radio"
                    name="rdo-ani"
                    defaultChecked
                  />
                  Other
                </Label>
              </Col>
            </Row>
            <Button type="button" color="primary">
              Deactivate Account
            </Button>
          </div>
          <div className="account-setting deactivate-account">
            <h5 className="f-w-600 f-16">Delete Account</h5>
            <Row>
              <Col>
                <Label className="d-block">
                  <Input
                    className="radio_animated"
                    id="edo-ani3"
                    type="radio"
                    name="rdo-ani1"
                    defaultChecked
                  />
                  No longer usable
                </Label>
                <Label className="d-block">
                  <Input
                    className="radio_animated"
                    id="edo-ani4"
                    type="radio"
                    name="rdo-ani1"
                  />
                  Want to switch on other account
                </Label>
                <Label className="d-block mb-0">
                  <Input
                    className="radio_animated"
                    id="edo-ani5"
                    type="radio"
                    name="rdo-ani1"
                    defaultChecked
                  />
                  Other
                </Label>
              </Col>
            </Row>
            <Button type="button" color="primary">
              Delete Account
            </Button>
          </div> */}
          {/* </div> */}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabsetProfile;
