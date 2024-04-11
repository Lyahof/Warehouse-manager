import SignupForm from "../features/authentification/SignupForm";
import Heading from "../ui/Heading";

function Users() {
  return (
    <>
      <Heading as="h1">Создать нового пользователя</Heading>
      <SignupForm />
    </>
  );
}

export default Users;
