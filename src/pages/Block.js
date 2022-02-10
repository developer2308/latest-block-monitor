import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

const Block = () => {
  return (
    <Box>
      <Card>
        <CardHeader>Latest Block Details</CardHeader>
        <CardContent>
          <Grid container>
            <Grid item sm={4}>
              <Typography variant="h6">Block Number</Typography>
            </Grid>
            <Grid item sm={8}>
              <Typography variant="h6">1234</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={4}>
              <Typography variant="h6">Number of transactions</Typography>
            </Grid>
            <Grid item sm={8}>
              <Typography variant="h6">1234</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={4}>
              <Typography variant="h6">Miner</Typography>
            </Grid>
            <Grid item sm={8}>
              <Typography variant="h6">1234</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={4}>
              <Typography variant="h6">Block Number</Typography>
            </Grid>
            <Grid item sm={8}>
              <Typography variant="h6">Total difficulty</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Block;
