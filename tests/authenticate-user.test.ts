import { describe, expect, it } from "vitest";
import { FixedAuthenticationGateway } from "@/fakes/fixed-authentication-gateway";
import { AuthenticateUser } from "@/usecases/authenticate-user";

const createAuthentication = () =>
  new AuthenticateUser(new FixedAuthenticationGateway());

describe("AuthenticateUser", () => {
  it("正しい認証情報でログインできる", () => {
    const session = createAuthentication().signIn(
      "  MISAKI.SATO@KNOT.EXAMPLE.JP ",
      "knot-demo",
    );

    expect(session?.user).toMatchObject({
      id: "user-1",
      name: "佐藤 美咲",
      role: "セールスマネージャー",
    });
    expect(session?.token).toBeTruthy();
  });

  it("誤ったパスワードではログインできない", () => {
    const session = createAuthentication().signIn(
      "misaki.sato@knot.example.jp",
      "wrong-password",
    );

    expect(session).toBeUndefined();
  });

  it("有効なセッショントークンからユーザーを取得できる", () => {
    const authentication = createAuthentication();
    const session = authentication.signIn(
      "misaki.sato@knot.example.jp",
      "knot-demo",
    );

    expect(authentication.getCurrentUser(session?.token)?.id).toBe("user-1");
    expect(authentication.getCurrentUser("invalid-token")).toBeUndefined();
  });
});
