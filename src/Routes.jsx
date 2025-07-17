import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import MainTaskDashboard from "pages/main-task-dashboard";
import TaskCreationAndEditing from "pages/task-creation-and-editing";
import TaskCategoriesAndOrganization from "pages/task-categories-and-organization";
import TaskAnalyticsAndInsights from "pages/task-analytics-and-insights";
import TaskSearchAndFiltering from "pages/task-search-and-filtering";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MainTaskDashboard />} />
        <Route path="/main-task-dashboard" element={<MainTaskDashboard />} />
        <Route path="/task-creation-and-editing" element={<TaskCreationAndEditing />} />
        <Route path="/task-categories-and-organization" element={<TaskCategoriesAndOrganization />} />
        <Route path="/task-analytics-and-insights" element={<TaskAnalyticsAndInsights />} />
        <Route path="/task-search-and-filtering" element={<TaskSearchAndFiltering />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;