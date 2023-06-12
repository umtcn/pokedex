import Swal from "sweetalert2";

export function ErrorPopup({ message }) {
  return Swal.fire({
    icon: "error",
    title: "Oops... Something went wrong!",
    html: message,
  });
}
