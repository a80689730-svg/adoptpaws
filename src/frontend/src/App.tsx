import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdoptionFormPage } from "./pages/AdoptionFormPage";
import { AdoptionProcessPage } from "./pages/AdoptionProcessPage";
import { BlogArticlePage } from "./pages/BlogArticlePage";
import { BlogPage } from "./pages/BlogPage";
import { ContactPage } from "./pages/ContactPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { HomePage } from "./pages/HomePage";
import { PetDetailPage } from "./pages/PetDetailPage";
import { PetsPage } from "./pages/PetsPage";
import { SuccessStoriesPage } from "./pages/SuccessStoriesPage";

// Root: renders <Layout> wrapper for public pages
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// Public routes (use Layout)
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const petsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pets",
  component: PetsPage,
});
const petDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pets/$id",
  component: PetDetailPage,
});
const adoptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/adopt",
  component: AdoptionFormPage,
});
const processRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/process",
  component: AdoptionProcessPage,
});
const storiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stories",
  component: SuccessStoriesPage,
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});
const blogArticleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: BlogArticlePage,
});
const getInvolvedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/get-involved",
  component: GetInvolvedPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

// Admin layout route — standalone, no Layout wrapper
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-layout",
  component: Outlet,
});
const adminLoginRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin",
  component: AdminLoginPage,
});
const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  petsRoute,
  petDetailRoute,
  adoptRoute,
  processRoute,
  storiesRoute,
  blogRoute,
  blogArticleRoute,
  getInvolvedRoute,
  aboutRoute,
  contactRoute,
  adminLayoutRoute.addChildren([adminLoginRoute, adminDashboardRoute]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
