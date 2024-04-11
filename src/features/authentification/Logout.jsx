import { HiArrowRightOnRectangle } from "react-icons/hi2";

import SpinnerMini from "../../ui/SpinnerMini";
import ButtonIcon from "../../ui/ButtonIcon";

import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isPending } = useLogout();
  return (
    <ButtonIcon disabled={isPending} onClick={() => logout()}>
      {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
