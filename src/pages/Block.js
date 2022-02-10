import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Web3 from "web3";
import Config from "../config";

const web3 = new Web3(Config.chainProviderURL);

const Block = () => {

  const [block, setBlock] = useState();

  const getLatestBlock = async () => {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    const latestBlock = await web3.eth.getBlock(latestBlockNumber);
    setBlock(latestBlock);
    console.log('latestNumber=', latestBlockNumber, latestBlock);
  };

  useEffect(() => {
    getLatestBlock();
  }, []);

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
              <Typography variant="h6">{block?.number}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={4}>
              <Typography variant="h6">Number of transactions</Typography>
            </Grid>
            <Grid item sm={8}>
              <Typography variant="h6">{block?.transactions.length}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={4}>
              <Typography variant="h6">Miner</Typography>
            </Grid>
            <Grid item sm={8}>
              <Typography variant="h6">{block?.miner}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={4}>
              <Typography variant="h6">Total difficulty</Typography>
            </Grid>
            <Grid item sm={8}>
              <Typography variant="h6">{block?.difficulty}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Block;
