import AuthenticateUser from "./AuthenticateUser";
import Logo from "../../../components/Logo";

export default function Login() {
  return (
    <>
      <div>
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            register a new account
          </a>
        </p>
      </div>
      <AuthenticateUser />
    </>
  );
}
