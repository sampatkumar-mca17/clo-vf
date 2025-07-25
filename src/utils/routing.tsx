import { lazy, Suspense } from "react";
import{createBrowserRouter} from "react-router";
const App = lazy(()=>import("../App"));
const AppWithSuspense = <Suspense fallback={<div style={{backgroundColor:"#212020", color:"#fff", display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>Loading...</div>}>
                        <App/>
                        </Suspense>
const router = createBrowserRouter([
   {
      path:"",
      index:true,
      element:AppWithSuspense
   },
   {
    path:"*",
    element:AppWithSuspense
   }
]);

export default router;
