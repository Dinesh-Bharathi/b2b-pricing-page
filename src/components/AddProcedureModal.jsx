import { AddCircle, Close, HighlightOff } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./modalSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import procedureNameJson from "../assets/Data/json/procedureName";
import { tax } from "../assets/Data/json/tax";
import {
  createProcedure,
  updateProcedure,
} from "../assets/Data/procedure/procedureSlice";
import { enqueueSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = Yup.object().shape({
  procedureName: Yup.string().required("Please select any procedure"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  tax: Yup.number().positive("Tax must be positive"),
  totalAmount: Yup.number().positive("Total amount must be positive"),
  additionalProcedureFields: Yup.array().of(
    Yup.object().shape({
      procedureName: Yup.string().required("Please select any procedure"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      tax: Yup.number().positive("Tax must be positive"),
      totalAmount: Yup.number().positive("Total amount must be positive"),
    })
  ),
});

const AddProcedureModal = ({ initialValues, setInitialValues }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const [additionalProcedures, setAdditionalProcedures] = useState(
    initialValues?.additionalProcedureFields?.length || 0
  );
  const handleClose = () => {
    dispatch(closeModal());
    setInitialValues(null);
    setAdditionalProcedures(0);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      procedureName: initialValues?.procedureName || null,
      price: initialValues?.price || "",
      tax: initialValues?.tax || null,
      totalAmount: initialValues?.totalAmount || "",
      note: initialValues?.note || "",
      additionalProcedureFields:
        initialValues?.additionalProcedureFields ||
        Array.from({ length: additionalProcedures }, () => ({
          procedureName: null,
          price: 0,
          tax: null,
          totalAmount: "",
          note: "",
        })),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Create an array to store all procedures (main procedure + additional procedures)
      const allProcedures = [];

      // Add the main procedure to the array
      allProcedures.push({
        procedureName: values.procedureName,
        price: values.price,
        tax: values.tax,
        totalAmount: values.totalAmount,
        note: values.note,
      });

      // Add additional procedures to the array
      values.additionalProcedureFields.forEach((field) => {
        allProcedures.push({
          procedureName: field.procedureName,
          price: field.price,
          tax: field.tax,
          totalAmount: field.totalAmount,
          note: field.note,
        });
      });

      if (initialValues) {
        // Handle update logic
        dispatch(
          updateProcedure({ id: initialValues?.id, updatedData: values })
        ).then((resultAction) => {
          dispatch(closeModal());
          handleClose();
          setInitialValues(null);
          formik.resetForm();
          if (updateProcedure.fulfilled.match(resultAction)) {
            // Handle success
            console.log("Procedure updated successfully!");
            formik.resetForm();
            enqueueSnackbar("Procedure updated successfully!", {
              variant: "success",
            });
          } else if (updateProcedure.rejected.match(resultAction)) {
            // Handle error
            console.error(
              "Failed to update procedure:",
              resultAction.error.message
            );
            enqueueSnackbar(
              "Failed to update procedure:" + resultAction.error.message,
              {
                variant: "error",
              }
            );
          }
        });
      } else {
        // Dispatch an action for each procedure
        console.log("procedures", allProcedures);
        allProcedures.forEach((procedure) => {
          dispatch(createProcedure(procedure)).then((resultAction) => {
            if (createProcedure.fulfilled.match(resultAction)) {
              // Handle success
              console.log("Procedure created successfully!");
              dispatch(closeModal());
              handleClose();
              formik.resetForm();
            } else if (createProcedure.rejected.match(resultAction)) {
              // Handle error
              console.error(
                "Failed to create procedure:",
                resultAction.error.message
              );
              enqueueSnackbar(
                "Failed to create procedure:" + resultAction.error.message,
                {
                  variant: "error",
                }
              );
            }
          });
        });
        enqueueSnackbar("Procedure added successfully!", {
          variant: "success",
        });
      }
    },
  });

  useEffect(() => {
    // If initialValues prop is provided, update formik values when modal opens
    if (isOpen && initialValues) {
      formik.setValues({
        procedureName: initialValues.procedureName || "", // Set it to an empty string if it's undefined
        price: initialValues.price || "",
        tax: initialValues.tax || 0,
        totalAmount: initialValues.totalAmount || "",
        note: initialValues.note || "",
        additionalProcedureFields:
          initialValues.additionalProcedureFields ||
          Array.from({ length: additionalProcedures }, () => ({
            procedureName: "",
            price: "",
            tax: 0,
            totalAmount: "",
            note: "",
          })),
      });
      setAdditionalProcedures(
        initialValues.additionalProcedureFields?.length || 0
      );
    }
  }, [isOpen, initialValues, additionalProcedures]);

  const handleAddProcedure = () => {
    setAdditionalProcedures((prev) => prev + 1);

    formik.setFieldValue("additionalProcedureFields", [
      ...formik.values.additionalProcedureFields,
      {
        procedureName: "",
        price: 0,
        tax: 0,
        totalAmount: "",
        note: "",
      },
    ]);
  };

  const handleRemoveProcedure = (index) => {
    // console.log("object", index);
    // setAdditionalProcedures((prev) => prev - 1);
    const updatedFields = [...formik.values.additionalProcedureFields];
    updatedFields.splice(index, 1);
    // console.log("updatedFields", updatedFields);
    formik.setFieldValue("additionalProcedureFields", updatedFields);
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

  const taxCalculationAdditional = (price, selectedTax, index) => {
    const taxPercent = selectedTax || 0;
    const selectedPrice = price || 0;
    const numericPrice = parseFloat(selectedPrice);
    const taxAmount = (numericPrice * taxPercent) / 100;
    const totalAmount = numericPrice + taxAmount;
    const roundedTotalAmount = totalAmount?.toFixed(2);
    // console.log("totalAmount", totalAmount);
    formik.setFieldValue(
      `additionalProcedureFields[${index}].totalAmount`,
      roundedTotalAmount || "0"
    );
  };

  // console.log("formik", formik.errors, formik.values);

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
            title={initialValues ? "Edit Procedure" : "Add Procedure"}
            action={
              <IconButton
                aria-label=""
                onClick={handleClose}
                sx={{ color: "#fff" }}
              >
                <Close />
              </IconButton>
            }
          />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1} padding={0} pt={1}>
            <Grid item xs={2.2}>
              <Autocomplete
                disableClearable
                size="small"
                fullWidth
                options={procedureNameJson.data || []}
                getOptionLabel={(option) => option.mastLookupValue || null}
                onChange={(event, value) => {
                  formik.setFieldValue(
                    "procedureName",
                    value?.mastLookupValue || null
                  );
                }}
                onInputChange={(event, newInputValue) => {
                  formik.setFieldValue("procedureName", newInputValue || null);
                }}
                value={procedureNameJson.data.find(
                  (option) =>
                    option.mastLookupValue === formik.values.procedureName
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Procedure Name"
                    fullWidth
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
            <Grid item xs={2.2}>
              {/* <TextField
                id="price"
                label="Price"
                type="number"
                size="small"
                value={formik.values.price}
                fullWidth
                onChange={(e) => {
                  // formik.setFieldValue("price", e.target.value);
                  console.log("values", formik.values);
                  // taxCalculation(e.target.value, formik.values.tax);
                }}
                {...formik.getFieldProps("price")}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              /> */}
              <TextField
                id=""
                label="Price"
                type="number"
                size="small"
                value={formik.values.price}
                onChange={(e) => {
                  formik.setFieldValue("price", e.target.value);
                  taxCalculation(e.target.value, formik.values.tax);
                  // console.log("values", formik.values);
                }}
              />
            </Grid>
            <Grid item xs={2.2}>
              <Autocomplete
                id="combo-box-demo"
                options={tax.data}
                getOptionLabel={(option) =>
                  `${option?.taxName} (${option?.taxPercent}%)`
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
                  formik.setFieldValue("tax", newValue?.taxPercent || null);
                  taxCalculation(formik.values.price, newValue?.taxPercent);
                }}
                renderOption={(props, option) => (
                  <Box component="" {...props}>
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
              />
            </Grid>
          </Grid>
          <Grid container>
            {/* {console.log(
              "additionalProcedureFields",
              formik?.values?.additionalProcedureFields
            )} */}
            {formik?.values?.additionalProcedureFields?.map((field, index) => (
              <React.Fragment key={index}>
                {/* {console.log("index", index, field)} */}
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={2.2}>
                    <Autocomplete
                      disableClearable
                      size="small"
                      fullWidth
                      options={procedureNameJson.data || []}
                      getOptionLabel={(option) => option.mastLookupValue || ""}
                      onChange={(event, value) => {
                        formik.setFieldValue(
                          `additionalProcedureFields[${index}].procedureName`,
                          value?.mastLookupValue || ""
                        );
                      }}
                      onInputChange={(event, newInputValue) => {
                        formik.setFieldValue(
                          `additionalProcedureFields[${index}].procedureName`,
                          newInputValue || ""
                        );
                      }}
                      value={procedureNameJson.data.find(
                        (option) =>
                          option.mastLookupValue === field.procedureName
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Procedure Name"
                          fullWidth
                          error={
                            formik.touched.additionalProcedureFields &&
                            formik.touched.additionalProcedureFields[index] &&
                            formik.touched.additionalProcedureFields[index]
                              .procedureName &&
                            Boolean(
                              formik.errors.additionalProcedureFields &&
                                formik.errors.additionalProcedureFields[
                                  index
                                ] &&
                                formik.errors.additionalProcedureFields[index]
                                  .procedureName
                            )
                          }
                          helperText={
                            formik.touched.additionalProcedureFields &&
                            formik.touched.additionalProcedureFields[index] &&
                            formik.touched.additionalProcedureFields[index]
                              .procedureName &&
                            formik.errors.additionalProcedureFields &&
                            formik.errors.additionalProcedureFields[index] &&
                            formik.errors.additionalProcedureFields[index]
                              .procedureName
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2.2}>
                    <TextField
                      label="Price"
                      size="small"
                      type="number"
                      fullWidth
                      // {...formik.getFieldProps(
                      //   `additionalProcedureFields[${index}].price`
                      // )}
                      onChange={(event) => {
                        formik.setFieldValue(
                          `additionalProcedureFields[${index}].price`,
                          event.target.value
                        );
                        // console.log(
                        //   "formik.values.additionalProcedureFields[priceCVhange]",
                        //   formik.values.additionalProcedureFields[index].tax
                        // );
                        taxCalculationAdditional(
                          event.target.value,
                          formik.values.additionalProcedureFields[index].tax,
                          index
                        );
                        // console.log("additional value", formik.values);
                      }}
                      error={
                        formik.touched.additionalProcedureFields &&
                        formik.touched.additionalProcedureFields[index] &&
                        formik.touched.additionalProcedureFields[index].price &&
                        Boolean(
                          formik.errors.additionalProcedureFields &&
                            formik.errors.additionalProcedureFields[index] &&
                            formik.errors.additionalProcedureFields[index].price
                        )
                      }
                      helperText={
                        formik.touched.additionalProcedureFields &&
                        formik.touched.additionalProcedureFields[index] &&
                        formik.touched.additionalProcedureFields[index].price &&
                        formik.errors.additionalProcedureFields &&
                        formik.errors.additionalProcedureFields[index] &&
                        formik.errors.additionalProcedureFields[index].price
                      }
                    />
                  </Grid>
                  <Grid item xs={2.2}>
                    <Autocomplete
                      id={`additionalProcedureFields[${index}].tax`}
                      options={tax.data}
                      getOptionLabel={(option) =>
                        `${option?.taxName} (${option?.taxPercent}%)`
                      }
                      isOptionEqualToValue={(option, value) =>
                        `${option?.taxName} (${option?.taxPercent}%)` ===
                        `${value?.taxName} (${value?.taxPercent}%)`
                      }
                      size="small"
                      fullWidth
                      disableClearable
                      value={tax.data.find(
                        (option) =>
                          option.taxName ===
                          formik.values.additionalProcedureFields[index].tax
                      )}
                      onChange={(event, newValue) => {
                        formik.setFieldValue(
                          `additionalProcedureFields[${index}].tax`,
                          newValue?.taxPercent || 0
                        );
                        // console.log(
                        //   ",852882",
                        //   formik.values.additionalProcedureFields[index]
                        // );
                        taxCalculationAdditional(
                          formik.values.additionalProcedureFields[index].price,
                          newValue.taxPercent || 0,
                          index
                        );
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
                          name={`additionalProcedureFields[${index}].tax`}
                          fullWidth
                          value={
                            formik.values.additionalProcedureFields[index].tax
                          }
                          onChange={formik.handleChange}
                          error={
                            formik.touched.additionalProcedureFields &&
                            formik.touched.additionalProcedureFields[index] &&
                            formik.touched.additionalProcedureFields[index]
                              .tax &&
                            Boolean(
                              formik.errors.additionalProcedureFields &&
                                formik.errors.additionalProcedureFields[
                                  index
                                ] &&
                                formik.errors.additionalProcedureFields[index]
                                  .tax
                            )
                          }
                          helperText={
                            formik.touched.additionalProcedureFields &&
                            formik.touched.additionalProcedureFields[index] &&
                            formik.touched.additionalProcedureFields[index]
                              .tax &&
                            formik.errors.additionalProcedureFields &&
                            formik.errors.additionalProcedureFields[index] &&
                            formik.errors.additionalProcedureFields[index].tax
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2.2}>
                    <TextField
                      label={
                        formik.values.additionalProcedureFields[index]
                          .totalAmount === ""
                          ? "Total Amount"
                          : ""
                      }
                      name={`additionalProcedureFields[${index}].totalAmount`}
                      value={
                        formik.values.additionalProcedureFields[index]
                          .totalAmount
                      }
                      size="small"
                      fullWidth
                      error={
                        formik.touched.additionalProcedureFields &&
                        formik.touched.additionalProcedureFields[index] &&
                        formik.touched.additionalProcedureFields[index]
                          .totalAmount &&
                        Boolean(
                          formik.errors.additionalProcedureFields &&
                            formik.errors.additionalProcedureFields[index] &&
                            formik.errors.additionalProcedureFields[index]
                              .totalAmount
                        )
                      }
                      helperText={
                        formik.touched.additionalProcedureFields &&
                        formik.touched.additionalProcedureFields[index] &&
                        formik.touched.additionalProcedureFields[index]
                          .totalAmount &&
                        formik.errors.additionalProcedureFields &&
                        formik.errors.additionalProcedureFields[index] &&
                        formik.errors.additionalProcedureFields[index]
                          .totalAmount
                      }
                    />
                  </Grid>
                  <Grid item xs={2.2}>
                    <TextField
                      label="Notes"
                      name={`additionalProcedureFields[${index}].note`}
                      value={
                        formik.values.additionalProcedureFields[index].note ||
                        ""
                      }
                      onChange={formik.handleChange}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => handleRemoveProcedure(index)}>
                      <HighlightOff sx={{ color: "red" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <Grid container mt={2}>
            <Grid item xs={12}>
              {!initialValues ? (
                <Button
                  className="add-procedure"
                  variant="contained"
                  disableElevation
                  onClick={handleAddProcedure}
                >
                  <AddCircle sx={{ color: "#42a5f5", mr: 1 }} />
                  Add procedure
                </Button>
              ) : (
                <Box>
                  <Box>
                    <Button disabled></Button>
                  </Box>
                  <Box>
                    <Button disabled></Button>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className="modal-action-cancel"
            type="button"
            variant="contained"
            onClick={handleClose}
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
      </Dialog>
    </React.Fragment>
  );
};

export default AddProcedureModal;
