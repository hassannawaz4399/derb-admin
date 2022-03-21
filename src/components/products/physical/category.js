import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import "../../users/User.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import axios from "axios";

const Category = () => {
  const url = "http://localhost:5000/api/categories";
  const [open, setOpen] = useState(false);
  const [catagoryName, setCatagoryName] = useState("");
  const [catagoryImage, setCatagoryImage] = useState("");

  const postCatagory = async (e) => {
    e.preventDefault();
    await axios
      .post(url, {
        category_name: catagoryName,
        image: catagoryImage,
      })
      .then(() => {
        alert("Catagory Added");
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Breadcrumb title="Category" parent="Physical" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Products Category</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-popup pull-right">
                  <button className="addbtn" onClick={onOpenModal}>
                    Add Category
                  </button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Category
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form enctype="multipart/form-data" action="/upload">
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Category Name :
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Catagories"
                            value={catagoryName}
                            onChange={(e) => setCatagoryName(e.target.value)}
                          />
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="button"
                        color="primary"
                        onClick={(e) => postCatagory(e)}
                      >
                        Add
                      </Button>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={() => onCloseModal("VaryingMdo")}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
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
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <!-- Container-fluid Ends--> */}
    </Fragment>
  );
};

export default Category;
