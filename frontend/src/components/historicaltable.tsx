import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useState, useEffect } from 'react';
import axios from "axios";
import { WebSocketContext } from "../context/websocketcontext";

/**
 * Grid columns configuration
 */
const columns: GridColDef[] = [
  { field: 'datetime', headerName: 'Date & Time', width: 250 },
  { field: 'currency_from', headerName: 'Currency From', width: 200 },
  { field: 'amount_from', headerName: 'Amount1', width: 200 },
  { field: 'currency_to', headerName: 'Currency To', width: 200 },
  { field: 'amount_to', headerName: 'Amount2', width: 200 },
  { field: 'type', headerName: 'Type', width: 200 },
];

/**
 * Component for displaying the list of currency exchange records
 */
export const HistoricalTable = () => {
  const socket = useContext(WebSocketContext);

  // config hooks
  const [records, setRecords] = useState([]);

  const endpoint = process.env.REACT_APP_HISTORICAL || '';
  const getData = async () => {
    await axios.get(endpoint).then((response) => {
      const data = response.data;

      setRecords(data);
    });
  }

  useEffect(() => {
    getData()

    socket.on('onUpdateData', () => {
      console.log('onUpdateData event received: time to refresh data grid!!!');
      getData();
    });

    // clean-up registered sockets
    return () => {
      console.log('Unregistering events from socket (HistoricalTable)');

      socket.off('connect');
      socket.off('onUpdateData');
    };
  }, []);

  return (
    <div style={{ height:400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={records}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
      />
    </div>
  );
};

