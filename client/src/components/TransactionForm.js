import * as React from "react";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const initialForm = {
  amount: 0,
  description: "",
  date: new Date(),
  category_id: "",
};
export default function TransactionForm({ fetchTransaction, editTransaction }) {
  const { categories } = useSelector((state) => state.auth.user) || {};
  const token = Cookies.get("token");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    console.log("====================================");
    console.log(e.target.value);
    console.log("====================================");

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = editTransaction.amount === undefined ? create() : update();

    console.log("working");
  };
  const reload = (res) => {
    if (res.ok) {
      setForm(initialForm);
      fetchTransaction();
    }
  };

  const create = async () => {
    // it is for createing a transaction data

    const res = await fetch(`https://chelav-backend2.onrender.com/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json", //for passing json
        Authorization: `Bearer ${token}`,
      },
    });
    reload(res);
  };

  const update = async () => {
    // it is for createing a transaction data

    const res = await fetch(
      `https://chelav-backend2.onrender.com/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json", //for passing json
          Authorization: `Bearer ${token}`,
        },
      }
    );
    reload(res);
  };

  const getCategoryNameById = () => {
    return (
      categories?.find((category) => category.id === form.category_id) ?? ""
    );
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Hey, any new transaction :)</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            size="small"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Amount"
            variant="outlined"
          />
          <TextField
            size="small"
            name="description"
            value={form.description}
            onChange={handleChange}
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of the transaction"
              inputFormat="MM/DD/YYYY"
              onChange={handleDate}
              value={form.date}
              renderInput={(params) => (
                <TextField size="small" sx={{ marginRight: 5 }} {...params} />
              )}
            />
          </LocalizationProvider>
          <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, category_id: newValue._id });
            }}
            id="controllable-states-demo"
            options={categories}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          {editTransaction.amount !== undefined ? (
            <Button type="submit" variant="contained">
              update
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
