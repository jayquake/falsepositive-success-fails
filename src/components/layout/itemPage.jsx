import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AccessibleTwoToneIcon from "@mui/icons-material/AccessibleTwoTone";
import Chip from "@mui/material/Chip";
import CustomizedBreadcrumbs from "../util/ruleBreadcrumb";
import { fetchItemData } from "../util/dataService";

function ItemPage() {
  const { currentRule } = useParams();
  const [itemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the item data when the component mounts
    fetchItemData(currentRule)
      .then((data) => {
        setItemData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [currentRule]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!itemData) {
    return <div>No item found</div>;
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <CustomizedBreadcrumbs />
            <Divider />
            <Typography sx={{ p: 2 }} m="auto" variant="overline" gutterBottom>
              {itemData.id} {itemData.name}
            </Typography>
            <IconButton
              component="button"
              aria-label="close"
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography sx={{ mb: 1.5, pt: 1.5 }} variant="overline">
                {itemData.shortDescription}
              </Typography>
            </Grid>
            <Typography sx={{ mb: 1.5, pt: 1.5 }} variant="">
              {itemData.issueDescription}
            </Typography>
            <Box mt={2}>
              <Chip
                variant="outlined"
                color="warning"
                icon={<TagFacesIcon />}
                label={itemData.criteria}
              />
            </Box>
            <Box mt={2} mb={2}>
              <Chip
                variant="outlined"
                color="primary"
                icon={<AccessibleTwoToneIcon />}
                label={itemData.WCAGLevel}
              />
            </Box>
            <Typography variant="overline">Issue Resolution:</Typography>
            <Box sx={{ width: "100%" }} mb={2}>
              <CodeSection>{itemData.issueResolution}</CodeSection>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ItemPage;
