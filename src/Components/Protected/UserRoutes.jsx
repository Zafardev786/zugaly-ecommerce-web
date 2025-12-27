import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function UserRoutes(props) {
      let usertoken = localStorage.getItem("user")
      let sellertoken = localStorage.getItem("seller-token")
      const token = sellertoken || usertoken;

    const { Component } = props;
    const nav = useNavigate();



    useEffect(() => {

        if (!token) {
            nav("/login");
        }

    }, []);

    return (
        <div>
            <Component />
        </div>
    )
}

export default UserRoutes