import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

import "./style.css";

const Datatable = ({ myData, myClass, multiSelectOption, pagination }) => {
  const url = "http://localhost:5000/api/categories";
  const [open, setOpen] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [data, setData] = useState(myData);
  const [catagories, setCatagories] = useState([]);

  useEffect(() => {
    getCatagories();
  }, []);

  const getCatagories = async () => {
    const data = await axios.get(url);

    setCatagories(data.data.data);
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

  const selectRow = (e, i) => {
    if (!e.target.checked) {
      setCheckedValues(checkedValues.filter((item, j) => i !== item));
    } else {
      checkedValues.push(i);
      setCheckedValues(checkedValues);
    }
  };

  const handleRemoveRow = () => {
    const updatedData = myData.filter(function (el) {
      return checkedValues.indexOf(el.id) < 0;
    });
    setData([...updatedData]);
    toast.success("Successfully Deleted !");
  };

  const renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          data[cellInfo.index][cellInfo.index.id] = e.target.innerHTML;
          setData({ myData: data });
        }}
        dangerouslySetInnerHTML={{
          __html: myData[cellInfo.index][cellInfo.index.id],
        }}
      />
    );
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const del = data;
      del.splice(index, 1);
      setData([...del]);
    }
    toast.success("Successfully Deleted !");
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const columns = [];
  for (var key in myData[0]) {
    let editable = renderEditable;
    if (key === "image") {
      editable = null;
    }
    if (key === "status") {
      editable = null;
    }
    if (key === "avtar") {
      editable = null;
    }
    if (key === "vendor") {
      editable = null;
    }
    if (key === "order_status") {
      editable = null;
    }

    columns.push({
      name: <b>{Capitalize(key.toString())}</b>,
      header: <b>{Capitalize(key.toString())}</b>,
      selector: key,
      Cell: editable,
      style: {
        textAlign: "center",
      },
    });
  }

  if (multiSelectOption === true) {
    columns.push({
      name: (
        <button
          className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
          onClick={(e) => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              handleRemoveRow();
          }}
        >
          Delete
        </button>
      ),
      id: "delete",
      accessor: (str) => "delete",
      cell: (row) => (
        <div>
          <span>
            <input
              type="checkbox"
              name={row.id}
              defaultChecked={checkedValues.includes(row.id)}
              onChange={(e) => selectRow(e, row.id)}
            />
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else {
    columns.push({
      name: <b>Action</b>,
      id: "delete",
      accessor: (str) => "delete",
      cell: (row, index) => (
        <div>
          <span onClick={() => handleDelete(index)}>
            <i
              className="fa fa-trash"
              style={{
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "#e4566e",
              }}
            ></i>
          </span>

          <span>
            <i
              onClick={onOpenModal}
              className="fa fa-pencil"
              style={{
                width: 35,
                fontSize: 20,
                padding: 11,
                color: "rgb(40, 167, 69)",
              }}
            ></i>
            <Modal
              isOpen={open}
              toggle={onCloseModal}
              style={{ overlay: { opacity: 0.1 } }}
            >
              <ModalHeader toggle={onCloseModal}>
                <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                  Edit Product
                </h5>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label htmlFor="recipient-name" className="col-form-label">
                      Category Name :
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      name="category_name"
                      placeholder="Catagories"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="message-text" className="col-form-label">
                      Category Image :
                    </Label>
                    <Input
                      className="form-control"
                      id="validationCustom02"
                      type="file"
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  color="primary"
                  onClick={() => onCloseModal("VaryingMdo")}
                >
                  Update
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
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  }
  return (
    <div>
      <Fragment>
        {/* <DataTable
          data={data}
          columns={columns}
          className={myClass}
          pagination={pagination}
          striped={true}
          center={true}
        /> */}

        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Catagory Id</th>
              <th>Catagory Name</th>
              <th>Satus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {catagories.map((catagory, index) => {
              const { category_id, category_name } = catagory;
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src="https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
                      alt="product Image"
                      className="product-image"
                    />
                  </td>
                  <td>{category_id}</td>
                  <td>{category_name}</td>
                  <td>Delivered</td>
                  <td>
                    <article className="buttons-wrapper">
                      <button className="edit-btn">
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => removeCatagoryies(category_id)}
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

        <ToastContainer />
      </Fragment>
    </div>
  );
};

export default Datatable;
