import React from 'react';
import Header from "../Header/Header";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import { Outlet } from "react-router-dom";
import './DashBoard.css'; 
import BookNavBar from '../BookNavBar/BookNavBar';

function DashBoard() {
  return (
    <>
      <div className="Header-container">
        <BookNavBar />
      </div>
      <div className="content-container">
        <Outlet />
      </div>
      <div className="footer-container">
        <footer>
          <p className="footer-text">
            Copyright <CopyrightOutlinedIcon style={{ fontSize: "12px" }} /> 2020, Bookstore Private Limited. All Rights Reserved
          </p>
        </footer>
      </div>
    </>
  );
}

export default DashBoard;
