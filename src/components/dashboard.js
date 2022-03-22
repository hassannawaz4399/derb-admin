import React, { useState, useEffect, Fragment } from "react";
import Breadcrumb from "./common/breadcrumb";
import "./users/User.scss";
import { Navigation, Box, MessageSquare, Users } from "react-feather";
import CountUp from "react-countup";
import axios from "axios";
import "./dashboard.scss";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Media,
  Row,
} from "reactstrap";

const Dashboard = () => {
  const [user, setUser] = useState([]);

  const url = `${process.env.REACT_APP_BASE_URL}/users`;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await axios
      .get(url)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Breadcrumb title="Dashboard" parent="Dashboard" />
      <Container fluid={true}>
        <Row>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-warning">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Navigation className="font-warning" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Earnings</span>
                    <h3 className="mb-0">
                      $ <CountUp className="counter" end={6659} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden  widget-cards">
              <CardBody className="bg-secondary ">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Box className="font-secondary" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Products</span>
                    <h3 className="mb-0">
                      $ <CountUp className="counter" end={9856} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className="o-hidden widget-cards">
              <CardBody className="bg-primary">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <MessageSquare className="font-primary" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Messages</span>
                    <h3 className="mb-0">
                      $ <CountUp className="counter" end={8933} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-danger ">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Users className="font-danger" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">New Vendors</span>
                    <h3 className="mb-0">
                      $ <CountUp className="counter" end={45631} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6 xl-100">
            <Card>
              <CardHeader>
                <h5>Total User</h5>
              </CardHeader>
              <CardBody>
                <article className="tableoverflow">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td data-label="Name">{data?.first_name}</td>
                            <td data-label="Email">{data?.email}</td>
                            <td data-label="Phone-no">{data?.mobile}</td>

                            <td data-label="Role">{data?.role}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </article>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

// javascript:void(0)

export default Dashboard;
