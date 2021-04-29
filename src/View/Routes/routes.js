import { Dashboad } from "../Dashboard/Dashboard";
import { TripReportView } from "../ReportsView/TripReport";
import LoginView from "../User/LoginView";
import RegisterView from "../User/RegisterView";
import VehicleView from "../Vehicle/VehicleView";

export const routes = [
  {
    path: "/",
    Component: LoginView,
    exact: true,
  },
  {
    path: "/register",
    Component: RegisterView,
    exact: true,
  },
  {
    path: "/dashboard",
    Component: Dashboad,
    exact: true,
  },
  {
    path: "/report/trip/:tripId",
    Component: TripReportView,
    exact: true,
  },
];
