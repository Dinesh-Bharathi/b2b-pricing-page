// ConfirmationModal.js
import React from "react";
import { Button, Typography, Modal, Box } from "@mui/material";

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 50,
          p: 4,
          borderRadius: "16px",
        }}
      >
        <Typography className="confirmation-title" variant="h6">
          Are you sure you want to delete?
        </Typography>
        <Box display={"flex"} justifyContent={"center"} mt={3}>
          <Button
            className="modal-action-no"
            variant="contained"
            color="primary"
            onClick={onClose}
          >
            No
          </Button>
          <Button
            className="modal-action-yes"
            variant="contained"
            color="error"
            onClick={onConfirm}
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
