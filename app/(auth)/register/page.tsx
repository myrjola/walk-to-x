import RegisterUser from "./RegisterUser";
import Logo from "../../../components/Logo";

export default function Register() {
  return (
    <>
      <div>
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Register a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="/sign-in"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            sign in to an existing account
          </a>
        </p>
      </div>
      <RegisterUser />
    </>
  );
}
