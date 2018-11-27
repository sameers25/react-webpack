import React, { Component } from "react";
import ReactDOM from "react-dom";

import AppLayout from "./js/components/container/appLayout";

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<AppLayout />, wrapper) : false;