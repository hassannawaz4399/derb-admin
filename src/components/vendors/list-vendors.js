import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import "../users/User.scss";
import { Card, CardBody, CardHeader, Container } from "reactstrap";

const List_vendors = () => {
  return (
    <Fragment>
      <Breadcrumb title="Vendor List" parent="Vendors" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Vendor Details</h5>
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
      </Container>
    </Fragment>
  );
};

export default List_vendors;
