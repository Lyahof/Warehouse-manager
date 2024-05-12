import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-new.webp" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
