// react-router-dom components
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "features/cart/cartSlice";
import { addToFavorites, removeFromFavorites } from "features/favorites/favoritesSlice";
import { baseURL } from "global";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// Pokedex components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";

function DefaultProjectCard({ image, label, title, description, action, types, actionFav }) {
  const dispatch = useDispatch();

  const addToBasket = () => {
    dispatch(
      addToCart({
        id: label,
        url: `${baseURL}/pokemon/${label}`,
        name: title,
        image: image,
        types: types,
      })
    );
  };

  const removePokemonInBasket = () => {
    dispatch(removeFromCart(label));
  };

  const addPokemonsToFavorites = () => {
    dispatch(
      addToFavorites({
        id: label,
        url: `${baseURL}/pokemon/${label}`,
        name: title,
        image: image,
        types: types,
      })
    );
  };

  const removePokemonInFavorites = () => {
    dispatch(removeFromFavorites(label));
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <Link to={`/pokemon/${label}`}>
          <CardMedia
            src={image}
            component="img"
            title={title}
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Link>
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {label}
        </MDTypography>
        <MDBox mb={1} display="flex" justifyContent="center">
          {action.type === "internal" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="center" alignItems="center" className="card-types">
          {types.map((type) => (
            <span key={type.type.name} className={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" m={2} ml={2}>
          {action.type === "internal" ? (
            <MDButton onClick={addToBasket} variant="outlined" size="medium" color={action.color}>
              {action.label}
            </MDButton>
          ) : (
            <MDButton
              onClick={removePokemonInBasket}
              variant="outlined"
              size="medium"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
          {actionFav.type === "internal" ? (
            <MDButton
              onClick={addPokemonsToFavorites}
              variant="outlined"
              size="medium"
              color={actionFav.color}
            >
              <Icon fontSize="large" color="info">
                favorite
              </Icon>
            </MDButton>
          ) : (
            <MDButton
              onClick={removePokemonInFavorites}
              variant="outlined"
              size="medium"
              color={actionFav.color}
            >
              <Icon fontSize="large" color="primary">
                cancel
              </Icon>
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  actionFav: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default DefaultProjectCard;
