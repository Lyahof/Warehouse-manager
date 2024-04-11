import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { GiLargePaintBrush, GiRolledCloth } from "react-icons/gi";
import { TfiPrinter } from "react-icons/tfi";
import { CiBoxes } from "react-icons/ci";
import { useSearchContext } from "../contexts/SearhContext";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-200);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const { setSearchQuery } = useSearchContext();
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Домашняя</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/materials" onClick={() => setSearchQuery("")}>
            <GiRolledCloth />
            <span>Материалы</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/paints" onClick={() => setSearchQuery("")}>
            <GiLargePaintBrush />
            <span>Краски и лаки</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/indigo" onClick={() => setSearchQuery("")}>
            <TfiPrinter />
            <span>Индиго</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/others" onClick={() => setSearchQuery("")}>
            <CiBoxes />
            <span>Разное</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Пользователи</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
