import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/auth/signin-1',
    component: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: true,
    path: '/auth/signup-1',
    component: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: '/app/dashboard/default',
        component: lazy(() => import('./views/dashboard/DashDefault'))
      },
      {
        exact: true,
        path: '/users/user',
        component: lazy(() => import('./views/users/User'))
      },
      {
        exact: true,
        path: '/users/user_add',
        component: lazy(() => import('./views/users/UserAdd'))
      },
      {
        exact: true,
        path: '/users/user_view/:id',
        component: lazy(() => import('./views/users/UserView'))
      },
      {
        exact: true,
        path: '/users/user_edit/:id',
        component: lazy(() => import('./views/users/UserEdit'))
      },
      // catagory
      {
        exact: true,
        path: '/catagories/catagory',
        component: lazy(() => import('./views/catagories/catagory/Catagory'))
      },
      {
        exact: true,
        path: '/catagories/catagory_add',
        component: lazy(() => import('./views/catagories/catagory/CatagoryAdd'))
      },
      {
        exact: true,
        path: '/catagories/catagory_view/:id',
        component: lazy(() => import('./views/catagories/catagory/CatagoryView.js'))
      },
      {
        exact: true,
        path: '/catagories/catagory_edit/:id',
        component: lazy(() => import('./views/catagories/catagory/CatagoryEdit.js'))
      },
      //subcatagory
      {
        exact: true,
        path: '/catagories/sub_category',
        component: lazy(() => import('./views/catagories/subCategory/SubCategory'))
      },
      {
        exact: true,
        path: '/catagories/sub_category_add',
        component: lazy(() => import('./views/catagories/subCategory/SubCategoryAdd'))
      },
      {
        exact: true,
        path: '/catagories/sub_category_view/:id',
        component: lazy(() => import('./views/catagories/subCategory/SubCategoryView'))
      },
      {
        exact: true,
        path: '/catagories/sub_category_edit/:id',
        component: lazy(() => import('./views/catagories/subCategory/SubCategoryEdit'))
      },
        //subsubcatagory
        {
          exact: true,
          path: '/catagories/sub_sub_category',
          component: lazy(() => import('./views/catagories/subSubCategory/SubSubCategory'))
        },
        {
          exact: true,
          path: '/catagories/sub_sub_category_add',
          component: lazy(() => import('./views/catagories/subSubCategory/SubSubCategoryAdd'))
        },
        {
          exact: true,
          path: '/catagories/sub_sub_category_view/:id',
          component: lazy(() => import('./views/catagories/subSubCategory/SubSubCategoryView'))
        },
        {
          exact: true,
          path: '/catagories/sub_sub_category_edit/:id',
          component: lazy(() => import('./views/catagories/subSubCategory/SubSubCategoryEdit'))
        },
      {
        exact: true,
        path: '/basic/button',
        component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: true,
        path: '/basic/badges',
        component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: true,
        path: '/basic/breadcrumb',
        component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: true,
        path: '/basic/pagination',
        component: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
      },
      {
        exact: true,
        path: '/basic/collapse',
        component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: true,
        path: '/basic/tabs-pills',
        component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: true,
        path: '/basic/typography',
        component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: true,
        path: '/forms/form-basic',
        component: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: true,
        path: '/tables/bootstrap',
        component: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: true,
        path: '/charts/nvd3',
        component: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: true,
        path: '/maps/google-map',
        component: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: true,
        path: '/sample-page',
        component: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: true,
        component: () => <Redirect to={BASE_URL} />
      }
    ]
  }
];

export default routes;
