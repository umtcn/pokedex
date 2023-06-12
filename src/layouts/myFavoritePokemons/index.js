import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { clearFavorites } from "features/favorites/favoritesSlice";

// @mui material components
import Grid from "@mui/material/Grid";

// Pokedex components
import MDBox from "components/MDBox";

// Pokedex example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard components
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function MyFavoritePokemonsList() {
  const dispatch = useDispatch();
  const [itemOffset, setItemOffset] = useState(0);
  const favorites = useSelector((state) => state.favorites.favorites);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 20;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = favorites?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(favorites?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % favorites?.length;
    setItemOffset(newOffset);
  };

  const removeAllPokemons = () => {
    dispatch(clearFavorites());
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
          type: "external",
          route: "#",
          color: "secondary",
          label: "Remove In Favourites",
        }}
      />
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox
          pt={2}
          mt={2.5}
          px={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDTypography variant="h6" fontWeight="medium">
            My Favorites
          </MDTypography>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={6}>
            {currentItems.length > 0 ? (
              currentItems.map((pokemon, index) => (
                <Grid item xs={12} md={6} lg={3} key={pokemon.name} sx={{ cursor: "pointer" }}>
                  {renderPokeList(pokemon, index)}
                </Grid>
              ))
            ) : (
              // eslint-disable-next-line react/no-unescaped-entities
              <Grid item>You haven't added Pokemon to your favourites list yet</Grid>
            )}
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
        {currentItems.length > 0 ? (
          <MDBox pt={2} mt={0.5} px={2} display="flex" justifyContent="center" alignItems="center">
            <MDButton
              variant="button"
              fontWeight="medium"
              color={"primary"}
              sx={{ border: "1px solid" }}
              onClick={removeAllPokemons}
            >
              Remove all pokémon from the list!
            </MDButton>
          </MDBox>
        ) : null}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyFavoritePokemonsList;
