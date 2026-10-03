import { logoutAction } from "@/inputs/authentication-actions";
import { Icon } from "@/ui/components/icon";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button className="logout-button" type="submit">
        <Icon name="logout" size={16} />
        ログアウト
      </button>
    </form>
  );
}
