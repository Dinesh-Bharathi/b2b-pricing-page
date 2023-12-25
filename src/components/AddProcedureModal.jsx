import React from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Define the validation schema
const validationSchema = Yup.object().shape({
  procedureName: Yup.string().required("Please select any procedure"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  tax: Yup.number().positive("Tax must be positive"),
  totalAmount: Yup.number().positive("Total amount must be positive"),
  note: Yup.string(),
});

export default function AlertDialogSlide() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleCancel = () => {
    formik.resetForm();
    dispatch(closeModal());
  };

  const taxCalculation = (price, selectedTax) => {
    const taxPercent = selectedTax || 0;
    const numericPrice = parseFloat(price);
    const taxAmount = (numericPrice * taxPercent) / 100;
    const totalAmount = numericPrice + taxAmount;
    formik.setFieldValue("totalAmount", totalAmount || 0);
  };

  const formik = useFormik({
    initialValues: {
      procedureName: "",
      price: "",
      tax: 0,
      totalAmount: "",
      note: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here (e.g., dispatch to Redux store)
      console.log("Form submitted:", values);
    },
  });

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
            title="Add Procedure"
          />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} mt={1} padding={0} pt={1}>
              <Grid item md={2.2}>
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

              <Grid item md={2.2}>
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
              <Grid item md={2.2}>
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
                      value={formik.values.tax}
                      onChange={formik.handleChange}
                      error={formik.touched.tax && Boolean(formik.errors.tax)}
                      helperText={formik.touched.tax && formik.errors.tax}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2.2}>
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
              <Grid item md={2.2}>
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
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
