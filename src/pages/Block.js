import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Web3 from "web3";
import Config from "../config";

const web3 = new Web3(Config.chainProviderURL);
const columns = [
  {
    field: "from",
    headerName: "From",
    flex: 1,
  },
  {
    field: "to",
    headerName: "To",
    flex: 1,
  },
  {
    field: "gas",
    headerName: "Gas",
  },
  {
    field: "value",
    headerName: "Value",
    minWidth: 300,
    valueGetter: (params) => parseInt(params.row.value),
  },
];

const Block = () => {
  const [block, setBlock] = useState();
  const [transactions, setTransactions] = useState([]);

  const getLatestBlock = async () => {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    const latestBlock = await web3.eth.getBlock(latestBlockNumber);
    setBlock(latestBlock);

    const batchRequest = new web3.BatchRequest();
    const newTransactions = [];
    batchRequest.add(
      latestBlock.transactions.map((transactionHash) => {
        return web3.eth.getTransaction(
          transactionHash,
          (error, transaction) => {
            newTransactions.push(transaction);
            if (newTransactions.length === latestBlock.transactions.length) {
              const filtered = newTransactions.filter((txn) => txn.hash);
              setTransactions(filtered);
              console.log(filtered);
            }
          }
        );
      })
    );
    batchRequest.execute();

    console.log("latestNumber=", latestBlockNumber, latestBlock);
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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          pageSize={10}
          rowsPerPageOptions={[10]}
          columns={columns}
          pagination
          rows={transactions}
          getRowId={(row) => {
            if (!row.hash) {
              console.log("row=", row);
            }
            return row.hash;
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: "value", sort: "desc" }],
            },
          }}
        />
      </div>
    </Box>
  );
};

export default Block;
