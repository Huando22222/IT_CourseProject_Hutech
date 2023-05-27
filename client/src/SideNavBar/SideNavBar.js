
import { Link } from "react-router-dom";
import "./SideNavBar.css";
import LoginModal from "../components/action/LoginModal";
  import React, { useEffect, useState } from "react";
const SideNavBar = () => {
	//
	const [isExpanded, setExpendState] = useState(false);
	const menuItems = [
		{
			text: "Dashboard",
			icon: "icons/grid.svg",
			href: "/"
		},
		{
			text: "News",
			icon: "icons/user.svg",
			href: "/news"
		},
		// {
		// 	text: "Messages",
		// 	icon: "icons/message.svg",
		// },
		// {
		// 	text: "Analytics",
		// 	icon: "icons/pie-chart.svg",
		// },
		// {
		// 	text: "File Manager",
		// 	icon: "icons/folder.svg",
		// },
		// {
		// 	text: "Orders",
		// 	icon: "icons/shopping-cart.svg",
		// },
		// {
		// 	text: "Saved Items",
		// 	icon: "icons/heart.svg",
		// },
		// {
		// 	text: "Settings",
		// 	icon: "icons/settings.svg",
		// },
	];

	return (
        <div>
            <div
                className={
                    isExpanded
                        ? "side-nav-container-custom"
                        : "side-nav-container-custom side-nav-container-NX-custom"
                }
            >
                <div className="nav-upper-custom">
                    <div className="nav-heading-custom">
                        {isExpanded && (
                            <div className="nav-brand-custom">
                                <img src="icons/Logo.svg" alt="" srcset="" />
                                <h2>IHutecher</h2>
                            </div>
                        )}
                        <button
                            className={
                                isExpanded ? "hamburger-custom hamburger-in-custom" : "hamburger-custom hamburger-out-custom"
                            }
                            onClick={() => setExpendState(!isExpanded)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    {!isExpanded && (
                        <div className="nav-brand-custom">
                            <img src="icons/Logo.svg" alt="" srcset="" />
                            <h2>IHutecher</h2>
                        </div>
                    )}
                </div>
                <div className="nav-menu-custom">
                    {menuItems.map((item, index) => (
                        <Link
                            to={item.href}
                            className={isExpanded ? "menu-item-custom" : "menu-item-NX-custom"}
                            key={index}
                        >
                            <img src={item.icon} alt="" srcset="" />
                            {isExpanded && <span>{item.text}</span>}
                        </Link>
                    ))}
                </div>
                <div className="nav-footer-custom">
                    <LoginModal/>
                </div>
            </div>
        </div>
    );
};

export default SideNavBar;
