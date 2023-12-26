import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./modalSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { procedureName } from "../assets/Data/json/procedureName";
import { tax } from "../assets/Data/json/tax";
import {
  createProcedure,
  fetchProcedures,
  updateProcedure,
} from "../assets/Data/procedure/procedureSlice";
import { enqueueSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Define the validation schema
const validationSchema = Yup.object().shape({
  procedureName: Yup.string().required("Please select any procedure"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  tax: Yup.number()
    .required("Tax is required")
    .positive("Tax must be positive"),
  totalAmount: Yup.number().positive("Total amount must be positive"),
  note: Yup.string(),
});

export const AlertDialogSlide = ({
  selectedProcedure,
  setSelectedProcedure,
}) => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  // const selectedProcedure = useSelector((state) => state.modal.data);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleCancel = () => {
    formik.resetForm();
    dispatch(closeModal());
    setSelectedProcedure(null);
  };

  const taxCalculation = (price, selectedTax) => {
    const taxPercent = selectedTax || 0;
    const selectedPrice = price || 0;
    const numericPrice = parseFloat(selectedPrice);
    const taxAmount = (numericPrice * taxPercent) / 100;
    const totalAmount = numericPrice + taxAmount;
    const roundedTotalAmount = totalAmount?.toFixed(2);
    formik.setFieldValue("totalAmount", roundedTotalAmount || "0");
  };

  const formik = useFormik({
    initialValues: {
      procedureName: [],
      price: "",
      tax: 0,
      totalAmount: "",
      note: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedProcedure) {
        // Handle update logic
        dispatch(
          updateProcedure({ id: selectedProcedure.id, updatedData: values })
        ).then((resultAction) => {
          if (updateProcedure.fulfilled.match(resultAction)) {
            // Handle success
            console.log("Procedure updated successfully!");
            formik.resetForm();
            dispatch(closeModal());
            dispatch(fetchProcedures());
            enqueueSnackbar("Procedure updated successfully!", {
              variant: "warning",
            });
            setSelectedProcedure(null);
            console.log(selectedProcedure);
            formik.resetForm();
            setSelectedProcedure(null);
          } else if (updateProcedure.rejected.match(resultAction)) {
            // Handle error
            console.error(
              "Failed to update procedure:",
              resultAction.error.message
            );
          }
        });
      } else {
        // Handle create logic
        dispatch(createProcedure(values)).then((resultAction) => {
          if (createProcedure.fulfilled.match(resultAction)) {
            // Handle success
            console.log("Procedure created successfully!");
            formik.resetForm();
            dispatch(closeModal());
            dispatch(fetchProcedures());
            enqueueSnackbar("Procedure added successfully!", {
              variant: "success",
            });
          } else if (createProcedure.rejected.match(resultAction)) {
            // Handle error
            console.error(
              "Failed to create procedure:",
              resultAction.error.message
            );
          }
        });
      }
    },
  });

  useEffect(() => {
    if (selectedProcedure) {
      formik.setValues({
        procedureName: selectedProcedure.procedureName,
        price: selectedProcedure.price,
        tax: selectedProcedure.tax,
        totalAmount: selectedProcedure.totalAmount,
        note: selectedProcedure.note,
      });
    }
  }, [selectedProcedure, isOpen]);

  console.log("selectedProcedure", selectedProcedure);

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <CardHeader
            action={
              <IconButton
                aria-label=""
                onClick={handleClose}
                sx={{ color: "#fff" }}
              >
                <Close />
              </IconButton>
            }
            title={selectedProcedure ? "Edit Procedure" : "Add Procedure"}
          />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} mt={1} padding={0} pt={1}>
              <Grid item xs={12} md={2.2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={procedureName.data}
                  getOptionLabel={(option) => option.mastLookupValue}
                  size="small"
                  fullWidth
                  disableClearable
                  value={procedureName.data.find(
                    (option) =>
                      option.mastLookupValue === formik.values.procedureName
                  )}
                  onChange={(event, newValue) => {
                    formik.setFieldValue(
                      "procedureName",
                      newValue?.mastLookupValue || ""
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Procedure name*"
                      name="procedureName"
                      value={formik.values.procedureName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.procedureName &&
                        Boolean(formik.errors.procedureName)
                      }
                      helperText={
                        formik.touched.procedureName &&
                        formik.errors.procedureName
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={2.2}>
                <TextField
                  id=""
                  label="Price(INR)*"
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={(e) => {
                    formik.setFieldValue("price", e.target.value);
                    taxCalculation(e.target.value, formik.values.tax);
                  }}
                  size="small"
                  fullWidth
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
              <Grid item xs={12} md={2.2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={tax.data}
                  getOptionLabel={(option) =>
                    `${option?.taxName} (${option?.taxPercent}%)`
                  }
                  getOptionSelected={(option, value) =>
                    `${option?.taxName} (${option?.taxPercent}%)` ===
                    `${value?.taxName} (${value?.taxPercent}%)`
                  }
                  isOptionEqualToValue={(option, value) =>
                    `${option?.taxName} (${option?.taxPercent}%)` ===
                    `${value?.taxName} (${value?.taxPercent}%)`
                  }
                  size="small"
                  fullWidth
                  disableClearable
                  value={tax.data.find(
                    (option) => option.taxName === formik.values.tax
                  )}
                  onChange={(event, newValue) => {
                    formik.setFieldValue("tax", newValue?.taxPercent || 0);
                    taxCalculation(formik.values.price, newValue?.taxPercent);
                  }}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.taxName} - {option.taxPercent}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tax*"
                      name="tax"
                      fullWidth
                      value={formik.values.tax}
                      onChange={formik.handleChange}
                      error={formik.touched.tax && Boolean(formik.errors.tax)}
                      helperText={formik.touched.tax && formik.errors.tax}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={2.2}>
                <TextField
                  id=""
                  label="Total amount(INR)"
                  name="totalAmount"
                  value={formik.values.totalAmount}
                  // onChange={formik.handleChange}
                  size="small"
                  fullWidth
                  error={
                    formik.touched.totalAmount &&
                    Boolean(formik.errors.totalAmount)
                  }
                  helperText={
                    formik.touched.totalAmount && formik.errors.totalAmount
                  }
                />
              </Grid>
              <Grid item xs={12} md={2.2}>
                <TextField
                  id=""
                  label="Notes"
                  name="note"
                  value={formik.values.note}
                  onChange={formik.handleChange}
                  size="small"
                  fullWidth
                  error={formik.touched.note && Boolean(formik.errors.note)}
                  helperText={formik.touched.note && formik.errors.note}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            className="modal-action-cancel"
            type="button"
            variant="contained"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="modal-action-save"
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
          >
            {selectedProcedure ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
