import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Spinner from "../ui/Spinner";
import { useUser } from "../features/authentification/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthentificated } = useUser();

  useEffect(
    function () {
      if (!isAuthentificated && !isLoading) navigate("/login");
    },
    [isLoading, isAuthentificated, navigate]
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthentificated) return children;
}

export default ProtectedRoute;
