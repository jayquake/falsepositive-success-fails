import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Ambigious Links: Failures";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <a href="https://example.com/ambiguous">Learn More</a>
        <a href="https://example.com/action">Take Action</a>
        <a href="https://example.com/news">Read More</a>
        <a href="https://example.com/resources">Explore</a>
        <a href="https://example.com/services">Click Here</a>
        <a href="https://example.com/event">Join Us</a>
      </>
    }
    itemDescription={itemDescription}
  />
);
