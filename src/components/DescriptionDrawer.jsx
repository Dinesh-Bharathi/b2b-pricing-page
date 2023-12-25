import { Circle, Close } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";

const DescriptionDrawer = ({ handleClose }) => {
  return (
    <Box position={"relative"}>
      <Box
        className="header"
        sx={{
          padding: "12px 8px 10px",
          backgroundColor: "#FEFBE9",
          overflow: "hidden",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6">Pricing</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Typography fontSize={"14px"}>
          To use Pricing Feature, Click “Pricing” from settings Menu.
        </Typography>
      </Box>
      <Box>
        <Divider />
        <Box padding={"12px"}>
          <Box
            padding={"16px 0"}
            display={"flex"}
            alignItems={"baseline"}
            gap={"16px"}
          >
            <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
            <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
              It shows procedure details and you are allowed to view, add, edit
              and delete the procedure and its pricing details
            </Typography>
          </Box>
        </Box>
        <Box padding={"12px"}>
          <Box>
            <Typography variant="h4">1.Add Procedure details</Typography>
            <Box
              padding={"16px 0"}
              display={"flex"}
              alignItems={"baseline"}
              gap={"16px"}
            >
              <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
              <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                You are allowed to view all pricing procedure details.
              </Typography>
            </Box>
            <Box
              padding={"16px 0"}
              display={"flex"}
              alignItems={"baseline"}
              gap={"16px"}
            >
              <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
              <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                You can add new procedure by clicking{" "}
                <span style={{ color: "#0062DD", fontWeight: "600" }}>
                  Add Procedure
                </span>
                .
              </Typography>
            </Box>
            <Box textAlign={"center"}>
              <img
                src="https://ik.imagekit.io/LyfngoDev/B2B_Flash/Settings/addprocedure.svg"
                alt="addprocedure.svg"
              />
            </Box>
            <Box
              padding={"16px 0"}
              display={"flex"}
              alignItems={"baseline"}
              gap={"16px"}
            >
              <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
              <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                You can add Procedure name, cost, Tax type, Total amount and
                Notes. You are allowed to add more procedure name on that popup
                screen also by clicking{" "}
                <span style={{ color: "#0062DD", fontWeight: "600" }}>
                  Add Procedure
                </span>
                .
              </Typography>
            </Box>
            <Box textAlign={"center"}>
              <img
                src="https://ik.imagekit.io/LyfngoDev/B2B_Flash/Settings/Add_procedure_without_border.svg"
                alt="Add_procedure_without_border.svg"
              />
            </Box>
            <Box
              padding={"16px 0"}
              display={"flex"}
              alignItems={"baseline"}
              gap={"16px"}
            >
              <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
              <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                Click{" "}
                <span style={{ color: "#0062DD", fontWeight: "600" }}>
                  Save{" "}
                </span>
                button to save the Procedure pricing.
              </Typography>
            </Box>
            <Box textAlign={"center"}>
              <img
                src="https://ik.imagekit.io/LyfngoDev/B2B_Flash/Settings/Save_btn.svg"
                alt="Save_btn.svg"
              />
            </Box>
            <Box
              padding={"16px 0"}
              display={"flex"}
              alignItems={"baseline"}
              gap={"16px"}
            >
              <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
              <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                Click{" "}
                <span style={{ color: "#0062DD", fontWeight: "600" }}>
                  Cancel
                </span>{" "}
                button to cancel the Procedure pricing.
              </Typography>
            </Box>
          </Box>
          <Box textAlign={"center"}>
            <img
              src="https://ik.imagekit.io/LyfngoDev/B2B_Flash/Settings/Cancel_btn.svg"
              alt="Cancel_btn.svg"
            />
          </Box>
          <Box padding={"12px"}>
            <Box>
              <Typography variant="h4">2.View Procedure</Typography>
              <Box
                padding={"16px 0"}
                display={"flex"}
                alignItems={"baseline"}
                gap={"16px"}
              >
                <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
                <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                  You can view the procedure details by clicking{" "}
                  <span style={{ color: "#0062DD", fontWeight: "600" }}>
                    View Icon
                  </span>{" "}
                  button and a popup screen with the pricing details were shown.
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <img
                  src="https://ik.imagekit.io/LyfngoDev/B2B_Flash/Settings/View_btn.svg"
                  alt="View_btn.svg"
                />
              </Box>
            </Box>
          </Box>
          <Box padding={"12px"}>
            <Box>
              <Typography variant="h4">3. Edit Procedure</Typography>
              <Box
                padding={"16px 0"}
                display={"flex"}
                alignItems={"baseline"}
                gap={"16px"}
              >
                <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
                <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                  You are allowed to edit the Procedure details by clicking{" "}
                  <span style={{ color: "#0062DD", fontWeight: "600" }}>
                    Edit Icon
                  </span>{" "}
                  button.
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <img
                  src="https://ik.imagekit.io/LyfngoDev/B2B_Flash/Settings/Edit_btn.svg"
                  alt="Edit_btn.svg"
                />
              </Box>
              <Box
                padding={"16px 0"}
                display={"flex"}
                alignItems={"baseline"}
                gap={"16px"}
              >
                <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
                <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                  You should enter the procedure Name, Cost as mandatory field
                  to add procedure and enter other details
                </Typography>
              </Box>
              <Box
                padding={"16px 0"}
                display={"flex"}
                alignItems={"baseline"}
                gap={"16px"}
              >
                <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
                <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                  Click{" "}
                  <span style={{ color: "#0062DD", fontWeight: "600" }}>
                    Save
                  </span>{" "}
                  button to save the Procedure pricing.
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <img
                  src="https://ik.imagekit.io/LyfngoDev/B2B_Flash/Settings/Save_btn.svg"
                  alt="Save_btn.svg"
                />
              </Box>
            </Box>
          </Box>
          <Box padding={"12px"}>
            <Box>
              <Typography variant="h4">4.Delete Procedure</Typography>
              <Box
                padding={"16px 0"}
                display={"flex"}
                alignItems={"baseline"}
                gap={"16px"}
              >
                <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
                <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                  If you have to delete any procedure, click{" "}
                  <span style={{ color: "#0062DD", fontWeight: "600" }}>
                    Delete Icon
                  </span>{" "}
                  button and a popup screen will appear.
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <img
                  src="https://ik.imagekit.io/LyfngoDev/B2B_Flash/Settings/Delete_btn.svg"
                  alt="Delete_btn.svg"
                />
              </Box>
              <Box
                padding={"16px 0"}
                display={"flex"}
                alignItems={"baseline"}
                gap={"16px"}
              >
                <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
                <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                  Click{" "}
                  <span style={{ color: "#0062DD", fontWeight: "600" }}>
                    Yes
                  </span>{" "}
                  button to delete the details.
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <img
                  src="https://ik.imagekit.io/LyfngoDev/B2B_Flash/Settings/Yes_btn.svg"
                  alt="Yes_btn.svg"
                />
              </Box>
              <Box
                padding={"16px 0"}
                display={"flex"}
                alignItems={"baseline"}
                gap={"16px"}
              >
                <Circle sx={{ color: "#5D616C", fontSize: "14px" }} />
                <Typography sx={{ color: "#5D616C", fontSize: "14px" }}>
                  Click{" "}
                  <span style={{ color: "#0062DD", fontWeight: "600" }}>
                    No
                  </span>{" "}
                  button to cancel the delete.
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <img
                  src="https://ik.imagekit.io/LyfngoDev/B2B_Flash/Settings/No_btn.svg"
                  alt="No_btn.svg"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DescriptionDrawer;
