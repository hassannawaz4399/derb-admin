import React, { useState, useEffect, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import axios from "axios";
import "../users/User.scss";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const List_vendors = () => {
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState();
  const onOpenModal = (e) => {
    setOpen(true);
    setid(e);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

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
      <Breadcrumb title="Vendor List" parent="Vendors" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Vendor Details</h5>
          </CardHeader>
          <CardBody>
            <article>
              <Modal isOpen={open} toggle={onCloseModal}>
                <ModalHeader toggle={onCloseModal}>
                  <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                    Add Category
                  </h5>
                </ModalHeader>
                <ModalBody>
                  <Form className="mx-auto">
                    <FormGroup>
                      <Label
                        htmlFor="recipient-name"
                        className="col-form-label title ml-3"
                      >
                        Action :
                      </Label>
                      <select
                        className="custom-container"
                        // value={status}
                        // onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="0">Block</option>
                        <option value="1">Un Block</option>
                      </select>
                    </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => onCloseModal("VaryingMdo")}
                  >
                    Close
                  </Button>
                  <Button type="button" color="primary">
                    Submit
                  </Button>
                </ModalFooter>
              </Modal>
            </article>
            <article className="tableoverflow">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user
                    .filter((data) => data.role == "VENDOR")
                    .map((data, index) => {
                      return (
                        <tr key={index}>
                          <td data-label="Name">{data?.first_name}</td>
                          <td data-label="Email">{data?.email}</td>
                          <td data-label="Phone-no">{data?.mobile}</td>

                          <td data-label="Role">{data?.role}</td>
                          <td data-label="Action">
                            <article className="buttons-wrapper">
                              <button
                                className="edit-btn"
                                onClick={() => onOpenModal(data?.id)}
                              >
                                <i className="far fa-edit"></i>
                              </button>
                            </article>
                          </td>
                        </tr>
                      );
                    })}
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
