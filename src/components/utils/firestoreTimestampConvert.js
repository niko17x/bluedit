import React from "react";

const firestoreTimestampConvert = (element) => {
  const date = element.toDate();
  const hour = date.getHours();
  return hour;
};

export default firestoreTimestampConvert;
