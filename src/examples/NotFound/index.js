import React from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";

const NotFoundPage = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
        <MDBox display={"flex"} justifyContent={"center"} my={10} fontSize={36}>
          Pokemon is not found!
        </MDBox>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
