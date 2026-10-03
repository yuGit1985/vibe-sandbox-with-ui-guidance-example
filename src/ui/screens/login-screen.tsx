import { Icon } from "@/ui/components/icon";
import { LoginForm } from "@/ui/features/authentication/login-form";

export function LoginScreen({
  demoEmail,
  demoPassword,
}: {
  demoEmail: string;
  demoPassword: string;
}) {
  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-brand">
          <span className="brand__mark">
            <Icon name="sparkle" size={22} />
          </span>
          <span>
            <strong>Knot</strong>
            <small>CRM</small>
          </span>
        </div>
        <div className="login-heading">
          <span className="login-heading__icon">
            <Icon name="lock" size={22} />
          </span>
          <h1 id="login-title">おかえりなさい</h1>
          <p>顧客管理ワークスペースにログインしてください</p>
        </div>
        <LoginForm demoEmail={demoEmail} demoPassword={demoPassword} />
        <div className="demo-account">
          <strong>デモアカウント</strong>
          <span>入力済みの認証情報でお試しいただけます</span>
        </div>
      </section>
      <p className="login-footer">
        Knot CRM · Customer relationships, connected.
      </p>
    </main>
  );
}
