import React from "react";
import { Route } from "react-router-dom";
import ambiguouslinksFailures from "./Failures/ambiguouslinksFailures";
import ambiguouslinks from "./Success/ambiguouslinksSuccess";
import AmbiguouslinksSuccess from "./Success/ambiguouslinksSuccess";
import AmbiguouslinksFailures from "./Failures/ambiguouslinksFailures";
export default (
  <>
    <Route
      path="/clickables/ambiguous-links_success"
      element={<AmbiguouslinksSuccess />}
    />
    <Route
      path="/clickables/ambiguous-links_failure"
      element={<AmbiguouslinksFailures />}
    />
  </>
);
