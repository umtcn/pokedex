import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchPokemonDetailInfo,
  getPokemonsDetailInfo,
} from "features/pokemons/pokemonDetailSlice";
import { useParams } from "react-router-dom";
import MDProgress from "components/MDProgress";
import NotFoundPage from "examples/NotFound";
import { addToCart } from "features/cart/cartSlice";
import { addToFavorites } from "features/favorites/favoritesSlice";
import { baseURL } from "global";

// @mui material components
import Grid from "@mui/material/Grid";

// Pokedex components
import MDBox from "components/MDBox";

// Pokedex example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";

function PokemonDetail() {
  const dispatch = useDispatch();
  const pokemon = useSelector(getPokemonsDetailInfo);
  const { id } = useParams();

  useEffect(() => {
    const pokemonsData = fetchPokemonDetailInfo(id);
    dispatch(pokemonsData);
  }, [dispatch, id]);

  const addToBasket = () => {
    dispatch(
      addToCart({
        id: pokemon.pokemon?.id,
        url: `${baseURL}/pokemon/${pokemon.pokemon?.id}`,
        name: pokemon.pokemon?.name,
        image: pokemon.pokemon?.sprites?.other?.dream_world?.front_default,
        types: pokemon.pokemon?.types,
      })
    );
  };

  const addPokemonsToFavorites = () => {
    dispatch(
      addToFavorites({
        id: pokemon.pokemon?.id,
        url: `${baseURL}/pokemon/${pokemon.pokemon?.id}`,
        name: pokemon.pokemon?.name,
        image: pokemon.pokemon?.sprites?.other?.dream_world?.front_default,
        types: pokemon.pokemon?.types,
      })
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {pokemon.pokemon?.response?.status == 404 ? (
          <NotFoundPage />
        ) : (
          <Grid container className="main-pokemon">
            <Grid item xs={12} md={6} lg={6} p={3}>
              <MDBox className="header-main-pokemon">
                <span className="number-pokemon">#{pokemon.pokemon?.id}</span>
                <MDBox className="container-img-pokemon">
                  <img
                    style={{ width: "100%", height: "300px" }}
                    src={pokemon.pokemon?.sprites?.other?.dream_world?.front_default}
                    alt={`Pokemon ${pokemon?.name}`}
                  />
                </MDBox>

                <MDBox className="container-info-pokemon">
                  <h1>{pokemon.pokemon?.name}</h1>
                  <MDBox className="card-types info-pokemon-type">
                    {pokemon.pokemon?.types?.map((type) => (
                      <span key={type.type.name} className={`${type.type.name}`}>
                        {type.type.name}
                      </span>
                    ))}
                  </MDBox>
                  <MDBox className="info-pokemon">
                    <MDBox className="group-info">
                      <p>Height</p>
                      <span>{pokemon.pokemon?.height}</span>
                    </MDBox>
                    <MDBox className="group-info">
                      <p>Weight</p>
                      <span>{pokemon.pokemon?.weight}KG</span>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox display={"flex"} justifyContent={"space-evenly"}>
                <MDBox
                  pt={2}
                  mt={0.5}
                  px={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <MDButton
                    variant="button"
                    fontWeight="medium"
                    color="info"
                    sx={{ border: "1px solid" }}
                    onClick={addToBasket}
                  >
                    Catch It
                  </MDButton>
                </MDBox>
                <MDBox
                  pt={2}
                  mt={0.5}
                  px={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <MDButton
                    variant="button"
                    fontWeight="medium"
                    color="info"
                    sx={{ border: "1px solid" }}
                    onClick={addPokemonsToFavorites}
                  >
                    Add To Favorites
                  </MDButton>
                </MDBox>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6} p={3}>
              <MDBox className="container-stats" display={"flex"} sx={{ flexDirection: "column" }}>
                <h1 style={{ marginTop: "15px" }}>Statistics</h1>
                <MDBox className="stats">
                  <MDBox display={"flex"}>
                    <MDTypography mx={1} width="80px" mt={3}>
                      Hp
                    </MDTypography>
                    <MDBox width="80%" textAlign="left" mx={1}>
                      <MDProgress
                        value={pokemon.pokemon?.stats && pokemon.pokemon?.stats[0]["base_stat"]}
                        color="success"
                        variant="gradient"
                        label={true}
                        sx={{ border: "10px solid #3b4144", padding: "3px" }}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox display={"flex"}>
                    <MDTypography mx={1} width="80px" mt={3}>
                      Attack
                    </MDTypography>
                    <MDBox width="80%" textAlign="left" mx={1}>
                      <MDProgress
                        value={pokemon.pokemon?.stats && pokemon.pokemon?.stats[1]["base_stat"]}
                        color="success"
                        variant="gradient"
                        label={true}
                        sx={{ border: "10px solid #3b4144", padding: "3px" }}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox display={"flex"}>
                    <MDTypography mx={1} width="80px" mt={3}>
                      Defense
                    </MDTypography>
                    <MDBox width="80%" textAlign="left" mx={1}>
                      <MDProgress
                        value={pokemon.pokemon?.stats && pokemon.pokemon?.stats[2]["base_stat"]}
                        color="success"
                        variant="gradient"
                        label={true}
                        sx={{ border: "10px solid #3b4144", padding: "3px" }}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox display={"flex"}>
                    <MDTypography mx={1} width="80px" mt={3}>
                      Special Attack
                    </MDTypography>
                    <MDBox width="80%" textAlign="left" mx={1}>
                      <MDProgress
                        value={pokemon.pokemon?.stats && pokemon.pokemon?.stats[3]["base_stat"]}
                        color="success"
                        variant="gradient"
                        label={true}
                        sx={{ border: "10px solid #3b4144", padding: "3px" }}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox display={"flex"}>
                    <MDTypography mx={1} width="80px" mt={3}>
                      Special Defense
                    </MDTypography>
                    <MDBox width="80%" textAlign="left" mx={1}>
                      <MDProgress
                        value={pokemon.pokemon?.stats && pokemon.pokemon?.stats[4]["base_stat"]}
                        color="success"
                        variant="gradient"
                        label={true}
                        sx={{ border: "10px solid #3b4144", padding: "3px" }}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox display={"flex"}>
                    <MDTypography mx={1} width="80px" mt={3}>
                      Speed
                    </MDTypography>
                    <MDBox width="80%" textAlign="left" mx={1}>
                      <MDProgress
                        value={pokemon.pokemon?.stats && pokemon.pokemon?.stats[5]["base_stat"]}
                        color="success"
                        variant="gradient"
                        label={true}
                        sx={{ border: "10px solid #3b4144", padding: "3px" }}
                      />
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PokemonDetail;
