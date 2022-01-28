import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SectionHeader,
  ButtonHeader,
  HeaderComponent,
  NavHeader } from '../styles/header';

function Header() {
  const localStorageUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <HeaderComponent>
      <NavHeader>
        <SectionHeader>
          <ButtonHeader
            type="button"
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </ButtonHeader>
          <ButtonHeader
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
          >
            MEUS PEDIDOS
          </ButtonHeader>
        </SectionHeader>
        <SectionHeader>
          <h1
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { localStorageUser.name || 'name' }
          </h1>
          <ButtonHeader
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ handleExit }
          >
            Sair
          </ButtonHeader>
        </SectionHeader>
      </NavHeader>
    </HeaderComponent>
  );
}

export default Header;
