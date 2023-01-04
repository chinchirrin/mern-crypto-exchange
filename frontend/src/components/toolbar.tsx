import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { WebSocketContext } from '../context/websocketcontext';

const cryptoCurrencies = [
  {
    value: 'BTC',
    label: 'Bitcoin',
  },
  {
    value: 'ETH',
    label: 'Ethereum',
  },
];

const currencies = [
  {
    value: 'USD',
    label: '$ USD'
  },
  {
    value: 'EUR',
    label: '€ EUR',
  },
  {
    value: 'GBP',
    label: '£ GBP',
  },
];

// @TODO: remove all console.log lines

type ExchangeInputs = {
    currency_from: string,
    amount_from: string,
    currency_to: string,
    amount_to: string,
    type: string,
};

export const Toolbar = () => {
  const socket = useContext(WebSocketContext);

  const [state, setState] = useState<ExchangeInputs>({
    currency_from: '',
    amount_from: '1',
    currency_to: '',
    amount_to: '',
    type: 'Exchanged',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setState((current) => {
      return {...current, [name]: value};
    });

    // console.log('handle change event was triggered!');
    // console.log(state);
  };

  const handleNumericInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log('Submitting data:');
    // console.log(state);

    addCurrencyExchange(state);
  };

  const addCurrencyExchange = (data: object) => {
    // console.log('Saving exchange ...');
    // console.log(data);

    const endpoint = process.env.REACT_APP_CREATE_EXCHANGE || '';

    axios
      .post(endpoint, data)
      .then((res) => {
        if (res.data) {
          console.log(res.data);

          socket.emit('newRecord');

          setState({
            currency_from: '',
            amount_from: '1',
            currency_to: '',
            amount_to: '',
            type: 'Exchanged',
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to socket from Toolbar ...');
    });

    socket.on('onNewRecord', (data: object) => {
      console.log('onNewRecord event received: time to refresh data grid!!!');
      console.log(data);
    });

    return () => {
      console.log('Unregistering events from socket (Toolbar)');

      socket.off('connect');
      socket.off('onNewRecord');
    };
  }, []);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m:1, width: '25ch' },
      }}
      autoComplete="off"
      className="currency-exchange-form"
    >
      <h2>Exchange</h2>
      <div>
        <TextField
          required
          select
          id="currency_from"
          name="currency_from"
          label="Currency from"
          // defaultValue=""
          value={state.currency_from}
          onChange={handleChange}
        >
          {cryptoCurrencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="amount_from"
          name="amount_from"
          label="Amount"
          // defaultValue="1"
          value={state.amount_from}
          onChange={handleChange}
          onKeyPress={handleNumericInput}
        />
        <span>=</span>
        <TextField
          required
          select
          id="currency_to"
          name="currency_to"
          label="Currency to"
          // defaultValue=""
          value={state.currency_to}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="amount_to"
          name="amount_to"
          label="Amount"
          value={state.amount_to}
          onChange={handleChange}
          onKeyPress={handleNumericInput}
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{
            marginTop: '15px',
          }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
}
