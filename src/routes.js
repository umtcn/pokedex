import Dashboard from "layouts/dashboard";
import MyPokemonList from "layouts/myPokemonList";
import MyFavoritePokemonsList from "layouts/myFavoritePokemons";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Pokemon List",
    key: "dashboard",
    icon: <Icon fontSize="small">catching_pokemon</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "My Pokemon List",
    key: "MyPokemonList",
    icon: <Icon fontSize="small">inventory</Icon>,
    route: "/my-pokemon-list",
    component: <MyPokemonList />,
  },
  {
    type: "collapse",
    name: "Favorites",
    key: "Favorites",
    icon: <Icon fontSize="small">favorite</Icon>,
    route: "/favorite-pokemon-list",
    component: <MyFavoritePokemonsList />,
  },
];

export default routes;
