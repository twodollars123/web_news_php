import { useState } from "react";
import { Table } from "reactstrap";
import ModalAdmin from "../../../../Layout/AdminLayout/components/ModalAdmin";
import { useStore, actions } from "../../../../store";

import "./ListAccount.scss";

function ListAccount({ data, fetch }) {
  const [state, dispatch] = useStore();
  const [modalDelete, setModalDelete] = useState(false);
  const [accountDelete, setAccountDelete] = useState();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const toggleDelete = (id) => {
    setAccountDelete(id);
    setModalDelete(!modalDelete);
  };

  const handleEditActive = (account) => {
    if (account.status || account.status.toString() === "false") {
      const newListAccount = [...data];
      const index = newListAccount.findIndex((item) => item.id === account.id);
      newListAccount[index].status = !newListAccount[index].status;
      dispatch(actions.editAccount(newListAccount));
    }
  };
  return (
    <div className="listaccount__container">
      <Table striped className="listaccount__table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>CreateAt</th>
            <th>CreateBy</th>
            <th>UpdateAt</th>
            <th>UpdateBy</th>
            <th>Role</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((account, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.createAt}</td>
                  <td>{account.createBy}</td>
                  <td>{account.updateAt}</td>
                  <td>{account.updateBy}</td>
                  <td>{account.role}</td>
                  {/* <td>{account.status}</td> */}
                  <td>{account?.status?.toString() ?? ""}</td>
                  <td className="listaccount__table--actions">
                    {(user?.role == "superAdmin" || user.id == account.id) && (
                      <i
                        className="fa fa-edit"
                        onClick={() => handleEditActive(account)}
                      />
                    )}

                    {user?.role == "superAdmin" && (
                      <i
                        className="fa fa-trash-o"
                        onClick={() => toggleDelete(account)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ModalAdmin
        modal={modalDelete}
        toggle={toggleDelete}
        deletemode="account"
        data={accountDelete}
        fetch={fetch}
      />
    </div>
  );
}

export default ListAccount;
