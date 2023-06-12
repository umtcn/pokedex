import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchPokemonInfo,
  getPokemonsInfo,
  onClickLoadMore,
  getPokemonsOffset,
} from "features/pokemons/pokemonSlice";
import ReactPaginate from "react-paginate";
import { getCartCount } from "features/cart/cartSlice";

// @mui material components
import Grid from "@mui/material/Grid";

// Pokedex components
import MDBox from "components/MDBox";

// Pokedex example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function Dashboard() {
  const dispatch = useDispatch();
  const pokemons = useSelector(getPokemonsInfo);
  const offset = useSelector(getPokemonsOffset);
  const [allPokeCount, setAllPokeCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pokemonListOffset, setPokemonListOffset] = useState(0);
  const itemCount = useSelector((state) => state.cart.itemCount);
  const favoriteitemsCount = useSelector((state) => state.favorites.favoriteitemsCount);
  const { search } = useSelector((state) => state.search);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 20;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = pokemons?.pokemons?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(pokemons?.pokemons.length / itemsPerPage);

  const filteredSearchKeyProducts = currentItems.filter((prd) =>
    prd.name.toLowerCase().includes(search.toLowerCase())
  );

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pokemons?.pokemons.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const pokemonsData = fetchPokemonInfo(offset);
    dispatch(pokemonsData);
    setAllPokeCount(parseInt(localStorage.getItem("allPokemonCount") || 0));
  }, [dispatch, offset]);

  const handleLoadMoreClicked = async () => {
    dispatch(onClickLoadMore());
    const pokemonsData = await fetchPokemonInfo(pokemonListOffset + 50);
    setPokemonListOffset(pokemonListOffset + 50);
    dispatch(pokemonsData);
  };

  const renderPokeList = (pokemon) => {
    return (
      <DefaultProjectCard
        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        label={pokemon.id}
        title={pokemon.name}
        types={pokemon.types}
        action={{
          type: "internal",
          route: "#",
          color: "info",
          label: "Catch It",
        }}
        actionFav={{
          type: "internal",
          route: "#",
          color: "secondary",
          label: "Add To Favourites",
        }}
      />
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="inventory"
                title="My Pokemon List"
                count={itemCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="catching_pokemon"
                title="All Pokemon Count"
                count={allPokeCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="favorite"
                title="Favorites"
                count={favoriteitemsCount}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox
          pt={2}
          mt={2.5}
          px={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDTypography variant="h6" fontWeight="medium">
            Pokemon List
          </MDTypography>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={6}>
            {filteredSearchKeyProducts.map((pokemon, index) => (
              <Grid item xs={12} md={6} lg={3} key={pokemon.name} sx={{ cursor: "pointer" }}>
                {renderPokeList(pokemon, index)}
              </Grid>
            ))}
          </Grid>
          <ReactPaginate
            className="paginate"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            activeClassName="font-bold"
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </MDBox>
        <MDBox pt={2} mt={0.5} px={2} display="flex" justifyContent="center" alignItems="center">
          <MDButton
            variant="button"
            fontWeight="medium"
            color="info"
            sx={{ border: "1px solid" }}
            onClick={handleLoadMoreClicked}
          >
            Load More Pokemon
          </MDButton>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
