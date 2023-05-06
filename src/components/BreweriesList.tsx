import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import BreweryCard from "./BreweryCard";
import Brewery from "../interfaces/Brewery";
import withLoading from "./withLoading";
import { Grid, Container, Pagination } from "@mui/material";

interface Props {
  breweries: Brewery[];
  setBreweries: (breweries: Brewery[]) => void;
  originalBreweries: Brewery[];
  setOriginalBreweries: (breweries: Brewery[]) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

function BreweriesList(props: Props) {
  const [breweriesPerPage, setBreweriesPerPage] = useState(8);

  useEffect(() => {
    axios
      .get<Brewery[]>("https://api.openbrewerydb.org/breweries")
      .then((response: AxiosResponse) => {
        props.setBreweries(response.data);
        props.setOriginalBreweries(response.data);
      });
  }, []);

  const indexOfLastBrewery = props.currentPage * breweriesPerPage;
  const indexOfFirstBrewery = indexOfLastBrewery - breweriesPerPage;
  const currentBreweries = props.breweries.slice(
    indexOfFirstBrewery,
    indexOfLastBrewery
  );

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    props.setCurrentPage(value);
  }

  return (
    <Container>
      <Grid container spacing={2}>
        {currentBreweries.map((brewery) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={brewery.id}>
            <BreweryCard brewery={brewery} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(props.breweries.length / breweriesPerPage)}
        shape="rounded"
        onChange={handlePageChange}
      ></Pagination>
    </Container>
  );
}

export default BreweriesList;
