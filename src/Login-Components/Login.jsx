import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { DevTool } from "@hookform/devtools";

const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [accounts, setAccounts] = useState([]);
  const handleLogin = (data) => {
    const items = JSON.parse(localStorage.getItem("account"));
    console.log(items);

    setAccounts([...items,data]);
  };

useEffect(()=>{
  localStorage.setItem("account", JSON.stringify(accounts));

},[accounts])

  return (
    <Box>
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Typography variant="h3" component="h3" sx={{ textAlign: "center" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <FormControl>
            <Stack spacing={3}>
              <TextField
                label="Username"
                variant="outlined"
                autoComplete="off"
                {...register("username", {
                  required: "Please fill out this field",
                })}
                error={errors?.username}
                helperText={errors?.username && errors?.username?.message}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                {...register("password", {
                  required: "Please fill out this field",
                })}
                error={errors?.password}
                helperText={errors?.password && errors?.password?.message}
              />
              <Button variant="contained" sx={{ width: "50%" }} type="submit">
                Login
              </Button>
            </Stack>
          </FormControl>
        </form>
        <DevTool control={control}></DevTool>
        <Typography variant="h5" component="h6" sx={{ textAlign: "center" }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/signup"
          >
            Signup
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Login;
