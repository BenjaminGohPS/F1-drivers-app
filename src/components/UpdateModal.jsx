import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

const OverLay = (props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //   const nameRef = useRef("");

  //   const updateUser = async () => {
  //     const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
  //       method: "PATCH",
  //       headers: { "Content-type": "application/json" },
  //       body: JSON.stringify({
  //         user_id: props.id,
  //         name: nameRef.current.value,
  //       }),
  //     });
  //     if (!res.ok) {
  //       throw new Error("cannot update user");
  //     }
  //   };

  //   const mutation = useMutation({
  //     mutationFn: updateUser,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["users"]);
  //       props.setShowUpdateModal(false);
  //     },
  //   });

  return (
    <div className={`container ${styles.backdrop}`}>
      <div className={styles.modal}>
        <br />

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            Do you wish to add more drivers to your 'My Drivers' list?
          </div>

          <div className="col-md-3"></div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-3"></div>
          <button
            className="col-md-3"
            onClick={() => {
              props.setShowUpdateModal(false);
            }}
          >
            Yes
          </button>
          <button
            className="col-md-3"
            onClick={() => {
              navigate("/mydrivers");
            }}
          >
            No
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay id={props.id} setShowUpdateModal={props.setShowUpdateModal} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};
export default UpdateModal;

/**
onClick={navigate("/mydrivers")}
*/
