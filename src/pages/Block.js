import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
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
  const [timer, setTimer] = useState();
  const [lastTime, setLastTime] = useState();
  const blockNumber = useRef();

  const getLatestBlock = async () => {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    console.log("latestNumber=", latestBlockNumber, blockNumber.current);
    setLastTime(new Date());
    if (latestBlockNumber !== blockNumber.current) {
      blockNumber.current = latestBlockNumber;
      const latestBlock = await web3.eth.getBlock(latestBlockNumber);
      setBlock(latestBlock);

      const batchRequest = new web3.BatchRequest();
      const newTransactions = [];

      latestBlock.transactions.forEach((transactionHash) => {
        batchRequest.add(
          web3.eth.getTransaction.request(
            transactionHash,
            (error, transaction) => {
              newTransactions.push(transaction);
              if (newTransactions.length === latestBlock.transactions.length) {
                const filtered = newTransactions.filter((txn) => txn.hash);
                setTransactions(filtered);
              }
            }
          )
        );
      });
      batchRequest.execute();
    }
  };

  const toggle = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    } else {
      const timer = setInterval(getLatestBlock, Config.refreshInterval);
      setTimer(timer);
    }
  };

  useEffect(() => {
    console.log("useEffect interval");
    const newTimer = setInterval(getLatestBlock, Config.refreshInterval);
    setTimer(newTimer);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          toggle();
        }}
        sx={{ mr: 2 }}
      >
        {timer ? "Pause" : "Resume"}
      </Button>
      <span>Last updated time: {lastTime?.toLocaleTimeString()}</span>
      <Card sx={{ my: 2 }}>
        <CardHeader title="Latest Block Details" />
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
