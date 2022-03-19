import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/sub-category";
import Datatable from "../../common/datatable";
import {
  Modal,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Table,
} from "reactstrap";

const Sub_category = () => {
  const url = "http://localhost:5000/api/subcategories";
  const [open, setOpen] = useState(false);
  const [subCatagories, setSubCatagories] = useState([]);
  const [subCatagoryName, setSubCatagoryName] = useState("");
  const [subCatagoryImage, setSubCatagoryImage] = useState([]);

  const postSubCatagory = async (e) => {
    debugger;
    e.preventDefault();

    await axios
      .post(url, {
        sub_category_name: subCatagoryName,
        image: subCatagoryImage,
        primary_category_id: 12,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  };

  useEffect(() => {
    getSubCatagories();
  }, []);

  const getSubCatagories = async () => {
    const data = await axios.get(url);

    setSubCatagories(data.data.data);
  };

  const removeSubCatagories = async (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        getSubCatagories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Breadcrumb title="Sub Category" parent="Physical" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Products Sub Category</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button
                    type="button"
                    color="primary"
                    onClick={onOpenModal}
                    data-toggle="modal"
                    data-original-title="test"
                    data-target="#exampleModal"
                  >
                    Add Sub Category
                  </Button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Physical Product
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
                            value={subCatagoryName}
                            onChange={(e) => setSubCatagoryName(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            Category Image :
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            type="file"
                            onChange={(e) =>
                              setSubCatagoryImage(e.target.files[0])
                            }
                          />
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="button"
                        color="primary"
                        onClick={(e) => postSubCatagory(e)}
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

                <Table hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Subcategory Name</th>
                      <th>Primary Category ID</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subCatagories.map((subCatagory, index) => {
                      const { sub_category_name, primary_category_id, image } =
                        subCatagory;
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <img
                              src={image}
                              alt="product Image"
                              className="product-image"
                            />
                          </td>
                          <td>{sub_category_name}</td>
                          <td>{primary_category_id}</td>

                          <td>
                            <article className="buttons-wrapper">
                              <button className="edit-btn">
                                <i className="far fa-edit"></i>
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() =>
                                  removeSubCatagories(primary_category_id)
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
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <!-- Container-fluid Ends--> */}
    </Fragment>
  );
};
export default Sub_category;
