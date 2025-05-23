import { useNavigate } from "react-router";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load Authenticated user
  const { isUserLoading, isAuthenticated } = useUser();

  // 2. If there is no Authenticated user , redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isUserLoading) navigate("/login");
  }, [isAuthenticated, isUserLoading, navigate]);

  // 3. While loading show a spinner
  if (isUserLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user , render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
