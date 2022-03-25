import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import designer from "../../assets/images/dashboard/designer.jpg";
import TabsetProfile from "./tabset-profile";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Media, Row, Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userId = sessionStorage.getItem("userId");

const Profile = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/users/${userId}`;

  let [user, setuser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    dob: "",
    password: "",
  });
  const [image, setimg] = useState([]);

  useEffect(() => {
    getuser();
  }, []);

  const getuser = async () => {
    await axios.get(url).then((res) => {
      setuser(res.data.data);
    });
  };

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
        getuser();
      })
      .catch((err) => {
        toast.error("Please Fill All Field", {
          theme: "dark",
        });
      });
  };

  return (
    <Fragment>
      <ToastContainer />
      <Breadcrumb title="Profile" parent="Settings" />
      <Container fluid={true}>
        <Row>
          <Col xl="4">
            <Card>
              <CardBody>
                <div className="profile-details text-center">
                  <img
                    src={user?.picture}
                    alt="img"
                    className="img-fluid img-90 rounded-circle blur-up lazyloaded"
                  />
                  <h5 className="f-w-600 f-16 mb-0">
                    {user?.first_name} {user?.last_name}
                  </h5>
                  <span>{user?.email}</span>
                  <div className="social">
                    <div className="form-group btn-showcase">
                      <Button color="btn social-btn btn-fb d-inline-block">
                        {" "}
                        <i className="fa fa-facebook"></i>
                      </Button>
                      <Button color="btn social-btn btn-twitter d-inline-block">
                        <i className="fa fa-google"></i>
                      </Button>
                      <Button color="btn social-btn btn-google d-inline-block mr-0">
                        <i className="fa fa-twitter"></i>
                      </Button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="project-status">
                  <h5 className="f-w-600 f-16">Employee Status</h5>
                  <Media>
                    <Media body>
                      <h6>
                        Performance <span className="pull-right">80%</span>
                      </h6>
                      <div className="progress sm-progress-bar">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "90%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Media>
                  </Media>
                  <Media>
                    <Media body>
                      <h6>
                        Overtime <span className="pull-right">60%</span>
                      </h6>
                      <div className="progress sm-progress-bar">
                        <div
                          className="progress-bar bg-secondary"
                          role="progressbar"
                          style={{ width: "60%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Media>
                  </Media>
                  <Media></Media>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card className="profile-card">
              <CardBody>
                <TabsetProfile data={user} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;
