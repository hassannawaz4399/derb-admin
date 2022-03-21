import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import "../users/User.scss";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

const Orders = () => {
  return (
    <Fragment>
      <Breadcrumb title="Orders" parent="Sales" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Manage Order</h5>
              </CardHeader>
              <CardBody>
                <article className="tableoverflow">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Catagory</th>
                        <th scope="col">Subcatagory</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-label="No">1</td>
                        <td data-label="Product Name">Pew</td>
                        <td data-label="Price">shdd</td>

                        <td data-label="Action">wdquiy</td>
                      </tr>
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

export default Orders;
