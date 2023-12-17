import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { DevTool } from "@hookform/devtools";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

const SignUp = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countryValue, setCountryValue] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
    ...api
  } = useForm();
  const handleRegister = (data) => {
    console.log(data);
  };

  const baseURL = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setAllCountries(response.data.slice(0, 10));
    });
  }, []);

  const displayedOptions = useMemo(() => {
    return [...allCountries];
  }, [allCountries]);

  return (
    <>
      <Box>
        <Stack spacing={3} sx={{ alignItems: "center" }}>
          <Typography variant="h3" component="h3" sx={{ textAlign: "center" }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit(handleRegister)} noValidate>
            <FormControl>
              <Stack spacing={3}>
                <TextField
                  label="Name"
                  variant="outlined"
                  autoComplete="off"
                  {...register("name", {
                    required: "Please fill out this field",
                  })}
                  error={errors?.name}
                  helperText={errors?.name && errors?.name?.message}
                />
                <TextField
                  label="Surname"
                  variant="outlined"
                  {...register("surname", {
                    required: "Please fill out this field",
                  })}
                  error={errors?.surname}
                  helperText={errors?.surname && errors?.surname?.message}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  {...register("email", {
                    required: "Please fill out this field",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                  type="email"
                  error={errors?.email}
                  helperText={errors?.email && errors?.email?.message}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={allCountries}
                  getOptionLabel={(options) => {
                    if (allCountries.length > 0) {
                      console.log(allCountries[0].name.common);
                      return options.name.common;
                    } else {
                      console.log(options);
                      return options};
                  }}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      placeholder="Select a country"
                    />
                  )}
                  {...register("country", {
                    required: "Please fill out this field",
                  })}
                  value={countryValue}
                  onChange={(e, value) => setCountryValue(value.name.common)}
                />

                <TextField
                  label="Phone Number"
                  variant="outlined"
                  {...register("phoneNumber", {
                    required: "Please fill out this field",
                    pattern: {
                      value: /^(((35567|35568|35569)\d{7})){1}$/,
                      message: "Entered value does not match email format",
                    },
                  })}
                  type="number"
                  error={errors?.phoneNumber}
                  helperText={
                    errors?.phoneNumber && errors?.phoneNumber?.message
                  }
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  {...register("password", {
                    required: "Please fill out this field",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "Minimum eight characters, at least one letter and one number",
                    },
                  })}
                  error={errors?.password}
                  helperText={errors?.password && errors?.password?.message}
                />

                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please fill out this field",

                    validate: (value) =>
                      value == getValues("password") ||
                      "Confirm Password is not the same as Password",
                  })}
                  error={errors?.confirmPassword}
                  helperText={
                    errors?.confirmPassword && errors?.confirmPassword?.message
                  }
                />
                <Button variant="contained" sx={{ width: "50%" }} type="submit">
                  Register
                </Button>
              </Stack>
            </FormControl>
          </form>
          <DevTool control={control}></DevTool>
          <Typography variant="h5" component="h6" sx={{ textAlign: "center" }}>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              I have already an account
            </Link>
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default SignUp;
