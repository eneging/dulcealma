import { type RouteConfig, index, route,} from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"),
    route("store","./routes/store/storePage.tsx"),
    route("contacto","./routes/contact.tsx"),
    route("about","./routes/about/aboutpage.tsx"),
 route("card","./src/componets/Cart.tsx"),
 route("checkout","./src/componets/CheckoutPages.tsx"),
route("/thanks","./src/pages/ThankYouPage.tsx"),
route("ubicacion","./src/pages/Ubicacion.tsx"),

route("food","./src/pages/food.tsx"),
route("bar","./src/pages/Bar.tsx"),
route("reservaciones","./src/pages/Reservaciones.tsx"),
route("homeprueba","./src/pages/principalpages/HomePrincipal.tsx"),
route('menu', "./routes/menu/Menu.tsx"),
route('eventos', "./routes/eventos/Eventos.tsx"),
route("inbox","./routes/LibrodeReclamaciones/Inbox.tsx"),


route("dashboard", "./routes/dashboard/layout.tsx", [
  index("./routes/dashboard/index.tsx"),
  route("productos", "./routes/dashboard/productos.tsx"),
  route("categorias", "./routes/dashboard/categorias.tsx"),
  route("reservas", "./routes/dashboard/reservas.tsx"),
  route("adminUsers", "./routes/dashboard/AdminUsers.tsx"),
   route("inbox", "./routes/dashboard/inbox.tsx"),
]),

route("login", "./routes/dashboard/login.tsx"),

route("infoEmpresa", "./routes/InfroEmpresa.tsx")

] satisfies RouteConfig;

