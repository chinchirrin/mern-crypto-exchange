import { useContext, useState } from 'react';
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

type ExchangeInputs = {
    currency_from: string,
    amount_from: string,
    currency_to: string,
    amount_to: string,
    type: string,
};

/**
 * Renders the input form for adding a new crypto currency exchange
 */
export const Toolbar = () => {
  const socket = useContext(WebSocketContext);

  const [state, setState] = useState<ExchangeInputs>({
    currency_from: '',
    amount_from: '1',
    currency_to: '',
    amount_to: '',
    type: 'Exchanged',
  });

  /**
   * Updates the payload to be sent to the POST request for creating a new
   * currency exhcange record
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setState((current) => {
      return {...current, [name]: value};
    });
  };

  /**
   * Validate numeric values for amount inputs
   */
  const handleNumericInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addCurrencyExchange(state);
  };

  /**
   * Make a POST request for creating a new currency exchange record
   */
  const addCurrencyExchange = (data: object): void => {
    const endpoint = process.env.REACT_APP_CREATE_EXCHANGE || '';

    axios
      .post(endpoint, data)
      .then((res) => {
        if (res.data) {

          console.log('Currency exchange was saved...');
          console.log(res.data);

          socket.emit('newRecord', res.data);

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
