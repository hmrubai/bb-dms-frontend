import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

// import { BASE_URL } from './config/constant';

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
  // {

  //   exact: true,
  //   path: '/auth/signin-1',
  //   component: lazy(() => import('./views/auth/signin/SignIn1'))
  // },
  // {
  //   exact: true,
  //   path: '/auth/signup-1',
  //   component: lazy(() => import('./views/auth/signup/SignUp1'))
  // },
  {
    path: '*',
    layout: AdminLayout,

    routes: [
      {
        exact: true,
        path: '/',
        component: lazy(() => import('./views/dashboard/DashDefault'))
      },
      {
        exact: true,
        path: '/dashboard',
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

      //document

      {
        exact: true,
        path: '/documents/document',
        component: lazy(() => import('./views/documents/Document'))
      },
      {

        exact: true,
        path: '/documents/document_add',
        component: lazy(() => import('./views/documents/DocumentAdd'))

      },
      {
        exact: true,
        path: '/documents/document_edit/:id',
        component: lazy(() => import('./views/documents/DocumentEdit'))
      },
      {
        exact: true,
        path: '/documents/document_category_view/:id',
        component: lazy(() => import('./views/documents/DocumentCategoryView'))
      },
      {
        exact: true,
        path: '/documents/document_view/:id',
        component: lazy(() => import('./views/documents/DocumentView'))
      },
      {
        exact: true,
        path: '/documents/document_sub_category_view/:id',
        component: lazy(() => import('./views/documents/DocumentSubCategoryView'))
      },
      {
        exact: true,
        path: '/documents/document_sub_sub_category_view/:id',
        component: lazy(() => import('./views/documents/DocumentSubSubCategoryView'))
      },
      {
        exact: true,
        path: '/documents/adminunpublish_document_list',
        component: lazy(() => import('./views/UnPublishDocumnetList/AdminUnpublishDocumentList'))
      },
      {
        exact: true,
        path: '/documents/unpublish_document_view/:id',
        component: lazy(() => import('./views/UnPublishDocumnetList/AdminUnpublishDocumentView'))
      },
      {
        exact: true,
        path: '/documents/All_document_list/',
        component: lazy(() => import('./views/UnPublishDocumnetList/AllPublishDocumentList'))
      },
      // profile
      {
        exact: true,
        path: '/profile',
        component: lazy(() => import('./views/profile/Profile'))
      },
      // groups
      {
        exact: true,
        path: '/groups/group',
        component: lazy(() => import('./views/groups/Group'))
      },
      {
        exact: true,
        path: '/groups/group_create',
        component: lazy(() => import('./views/groups/GroupCreate'))
      },
      {
        exact: true,
        path: '/groups/group_update/:id',
        component: lazy(() => import('./views/groups/GroupUpdate'))
      },
      {
        exact: true,
        path: '/groups/group_document/:id',
        component: lazy(() => import('./views/groups/GroupDocument'))
      }
      ,
      {
        exact: true,
        path: '/groups/group_add_document/:id',
        component: lazy(() => import('./views/groups/GroupAddDocument'))
      }



      // {
      //   exact: true,
      //   path: '/basic/button',
      //   component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      // },
      // {
      //   exact: true,
      //   path: '/basic/badges',
      //   component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      // },
      // {
      //   exact: true,
      //   path: '/basic/breadcrumb',
      //   component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      // },
      // {
      //   exact: true,
      //   path: '/basic/pagination',
      //   component: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
      // },
      // {
      //   exact: true,
      //   path: '/basic/collapse',
      //   component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      // },
      // {
      //   exact: true,
      //   path: '/basic/tabs-pills',
      //   component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      // },
      // {
      //   exact: true,
      //   path: '/basic/typography',
      //   component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      // },
      // {
      //   exact: true,
      //   path: '/forms/form-basic',
      //   component: lazy(() => import('./views/forms/FormsElements'))
      // },
      // {
      //   exact: true,
      //   path: '/tables/bootstrap',
      //   component: lazy(() => import('./views/tables/BootstrapTable'))
      // },
      // {
      //   exact: true,
      //   path: '/charts/nvd3',
      //   component: lazy(() => import('./views/charts/nvd3-chart'))
      // },
      // {
      //   exact: true,
      //   path: '/maps/google-map',
      //   component: lazy(() => import('./views/maps/GoogleMaps'))
      // },
      // {
      //   exact: true,
      //   path: '/sample-page',
      //   component: lazy(() => import('./views/extra/SamplePage'))
      // },
      // {
      //   path: '*',
      //   exact: true,
      //   component: () => <Redirect to={BASE_URL} />
      // }
    ]
  }
];

export default routes;
