import React, { Fragment, useState, useEffect } from "react";
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
  const [categories, setCatagories] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState();
  const onOpenModal = (e) => {
    setOpen(true);
    setid(e);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const url = `${process.env.REACT_APP_BASE_URL}/categories`;

  useEffect(() => {
    getCatagories();
  }, []);

  const getCatagories = async () => {
    await axios
      .get(url)
      .then((res) => {
        setCatagories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [catagoryName, setCatagoryName] = useState("");

  const postCatagory = async () => {
    await axios
      .post(url, {
        category_name: catagoryName,
      })
      .then(() => {
        alert("Catagory Added");
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  };

  const removeCatagoryies = async (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        getCatagories();
      })
      .catch((err) => {
        console.log(err);
      });
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
                          <th scope="col">Created Date</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td data-label="No">{data?.category_id}</td>
                              <td data-label="Category Name">
                                {data?.category_name}
                              </td>
                              <td data-label="Created Date">
                                {data?.created_at}
                              </td>

                              <td data-label="Action">
                                <article className="buttons-wrapper">
                                  <button className="edit-btn">
                                    <i className="far fa-edit"></i>
                                  </button>
                                  <button
                                    className="delete-btn"
                                    onClick={() =>
                                      removeCatagoryies(data.category_id)
                                    }
                                  >
                                    <i className="far fa-trash-alt"></i>
                                  </button>
                                </article>
                              </td>
                            </tr>
                          );
                        })}
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
