import React, { useState } from "react";
import "./style.scss";
import { Button } from "antd";
import {
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
// import Search from "antd/es/input/Search";

import { ROUTES } from "../../constants/Routes";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllShoe,
  setNewPage,
  setSearchKey,
} from "../../redux/features/Shoes/shoeSlice";
import { actLogout } from "../../redux/features/users/userSlice";

const Hearder = () => {
  const dispatch = useDispatch();

  const searchKey = useSelector((state) => state.shoe.searchKey);
  const pagination = useSelector((state) => state.shoe.pagination);
  const { isAuth, userInfo } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const handleSearchCard = (event) => {
    event.preventDefault();
    dispatch(
      actFetchAllShoe({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
      })
    );
    dispatch(setNewPage(1));
  };
  const handleChangeInputCard = (e) => {
    const value = e.target.value;
    dispatch(setSearchKey(value));
  };

  const [menuActive, setMenuActive] = useState("menu");

  const menuToggler = () => {
    menuActive === "menu"
      ? setMenuActive("menu menu_active")
      : setMenuActive("menu");
  };
  const location = useLocation();
  const handleLogout = () => {
    dispatch(actLogout());
  };

  return (
    <>
      <div className="header">
        <div className="header-title">
          <div className="header-title-block1">
            <div className="menu_toggler">
              <UnorderedListOutlined
                onClick={menuToggler}
                style={{ fontSize: "30px", color: "white" }}
                className="menu_toggler"
              />
            </div>

            <div className="header-title__logo">
              <Link to={ROUTES.HOME_PAGE}>
                <img
                  className="header-title__logo__img"
                  src="https://myshoes.vn/image/cache/catalog/logo/logo_ms-565x195.png"
                  srcSet="https://myshoes.vn/image/cache/catalog/logo/logo_ms-565x195.png 1x, https://myshoes.vn/image/cache/catalog/logo/logo_ms-565x195.png 2x"
                  alt="Myshoes.vn - Giày Chính Hãng"
                  title="Myshoes.vn - Giày Chính Hãng"
                />
              </Link>
            </div>
          </div>
          <form className="header-title__search" onSubmit={handleSearchCard}>
            <div className="header-title__search">
              <input
                className="input_search"
                placeholder="tìm kiếm sản phẩm"
                value={searchKey}
                onChange={handleChangeInputCard}
              ></input>
              <button
                className="btn_search"
                type="button"
                onClick={handleSearchCard}
              >
                Search
              </button>
            </div>
          </form>
          <div className="header-title-block3">
            <div className="header-title__formlogin">
              <div className="nameuser" style={{ color: "white" }}>
                <span>xin chào</span>
                <span>{userInfo.name}</span>
              </div>
              <div className="formlogin-item">
                <Link to={ROUTES.INFORUSER_PAGE}>
                  <Avatar size={40} icon={<UserOutlined />} />
                </Link>

                <div>
                  {isAuth ? (
                    <span style={{ color: "white" }}>{userInfo.name}</span>
                  ) : (
                    ""
                  )}
                </div>

                {isAuth ? (
                  <div>
                    <button
                      className="header-title__btn-logout"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <Link to={ROUTES.LOGIN_PAGE}>
                    <Button style={{ background: "none", border: "none" }}>
                      <div>
                        <span style={{ color: "white" }}>Tài Khoản</span>
                        <br />
                        <span style={{ color: "white" }}>
                          Đăng nhập/Đăng ký
                        </span>
                      </div>
                    </Button>
                  </Link>
                )}
              </div>
              <div>
                <Link to={ROUTES.CARTS_PAGE}>
                  <div className="shoppingCart">
                    <div className="couter">{carts.length}</div>
                    <ShoppingCartOutlined
                      style={{ fontSize: "50px", color: "white" }}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ul className={menuActive}>
            <li
              className={`menu__item ${
                ROUTES.HOME_PAGE.includes(location.pathname) ? "active" : ""
              }`}
            >
              <Link to={ROUTES.HOME_PAGE} className="menu_item">
                Trang chủ
              </Link>
            </li>
            <li
              className={`menu__item ${
                ROUTES.PRODUCTS_PAGE.includes(location.pathname) ? "active" : ""
              }`}
            >
              <Link to={"/products?brand=nike"} className="menu_item">
                Giày Nike
              </Link>
            </li>
            <li
              className={`menu__item ${
                ROUTES.PRODUCTS_PAGE.includes(location.pathname) ? "active" : ""
              }`}
            >
              <Link to={"/products?brand=adidas"} className="menu_item">
                Giày Adidas
              </Link>
            </li>
            <li
              className={`menu__item ${
                ROUTES.PRODUCTS_PAGE.includes(location.pathname) ? "active" : ""
              }`}
            >
              <Link to={"/products?brand=puma"} className="menu_item">
                Giày Puma
              </Link>
            </li>
            <li
              className={`menu__item ${
                ROUTES.PRODUCTS_PAGE.includes(location.pathname) ? "active" : ""
              }`}
            >
              <Link to={"/products?brand=balance"} className="menu_item">
                Giày Balance
              </Link>
            </li>
            <li
              className={`menu__item ${
                ROUTES.PRODUCTS_PAGE.includes(location.pathname) ? "active" : ""
              }`}
            >
              <Link to={"/products?brand=lacoste"} className="menu_item">
                Giày Lacoste
              </Link>
            </li>
            <li className="menu__item2 menu_item">
              <Link
                to={ROUTES.INFORUSER_PAGE}
                className="menu_item2 menu_item "
              >
                Thông tin cá nhân
              </Link>
            </li>
            {isAuth ? (
              <li className="menu__item2 menu_item ">
                <div onClick={handleLogout}>Đăng Xuất</div>
              </li>
            ) : (
              <li className="menu__item2 menu_item ">
                <Link to={ROUTES.LOGIN_PAGE} className="menu_item2 menu_item ">
                  Đăng nhập/Đăng xuất
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Hearder;
