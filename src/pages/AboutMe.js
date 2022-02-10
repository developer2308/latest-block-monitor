import { Card, CardHeader, CardContent, Typography, Grid } from "@mui/material";

const AboutMe = () => {
  return (
    <Card sx={{ my: 2 }}>
      <CardHeader title="About Me" />
      <CardContent>
        <Grid container>
          <Grid item sm={4}>
            <Typography variant="h5">Name</Typography>
          </Grid>
          <Grid item sm={8}>
            <Typography variant="h5">Sebastian Ma</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={4}>
            <Typography variant="h5">Email</Typography>
          </Grid>
          <Grid item sm={8}>
            <Typography variant="h5">sebastianos0121@gmail.com</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={4}>
            <Typography variant="h5">Github</Typography>
          </Grid>
          <Grid item sm={8}>
            <Typography variant="h5">sebastianos0121</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AboutMe;
