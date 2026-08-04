import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "../pages/Home";
import Category from "../pages/Category";
// import Country from "../pages/Country";
// import Year from "../pages/Year";
import SearchedData from "../pages/SearchedData";
import NewsDetails from "../pages/NewsDetails";
import Login from "../pages/admin/Login";
// import NotFound from "../pages/NotFound";

import Dashboard from "../pages/admin/Dashboard";
// import News from "../pages/admin/News";
// import AddNews from "../pages/admin/AddNews";
// import Categories from "../pages/admin/Categories";
// import Countries from "../pages/admin/Countries";

import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../Layout/MainLayout";


const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />

                    <Route path="/category/:slug" element={<Category />} />

                    <Route path="/search" element={<SearchedData />} />

                    <Route path="/news/:slug" element={<NewsDetails />} />
                    {/* 
                    <Route path="/country/:slug" element={<Country />} />

                    <Route path="/year/:year" element={<Year />} />
                 */}
                </Route>

                <Route path="/login" element={<Login />} />

                <Route
                    element={<MainLayout />}
                >
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* <Route
                    path="/admin/news"
                    element={
                        <ProtectedRoute>
                            <News />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/news/add"
                    element={
                        <ProtectedRoute>
                            <AddNews />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/categories"
                    element={
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/countries"
                    element={
                        <ProtectedRoute>
                            <Countries />
                        </ProtectedRoute>
                    }
                /> */}

                {/* <Route path="*" element={<NotFound />} /> */}

            </Routes>

        </BrowserRouter>
    );
};

export default AppRoute;