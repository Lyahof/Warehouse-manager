import UpdatePasswordForm from "../features/authentification/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentification/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Обновление данных аккаунта</Heading>

      <Row>
        <Heading as="h3">Обновить данные пользователя</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Обновить пароль</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
