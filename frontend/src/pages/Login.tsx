import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/Auth.ts";
import TextBox from "../components/TextBox.tsx";
import Button from "../components/Button.tsx";
import useRequest from "../hooks/useRequest.ts";
import Alert from "../components/Alert.tsx";
import { Form, Formik } from "formik";
import Spinner from "../components/Spinner.tsx";
import { LoginSchema } from "../Validation/Validations.ts";
import useUnsavedFormChanges from "../hooks/useUnsavedFormChanges.ts";
import { useNavigate } from "react-router-dom";

type LoginData = {
  email: string;
  password: string;
};

export default function LoginRouterLayout() {
  //const [loginData, setLoginData] = useState<LoginData>({} as LoginData);
  const [alert, setAlert] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthanticated
  );

  const initialValues = {
    email: "",
    password: "",
  };

  const { data, fetchData } = useRequest();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  });

  useEffect(() => {
    let userTimeout: any;
    dispatch(authActions.logoutAuth());
    if (data != undefined && data.length > 0) {
      userTimeout = setTimeout(() => {
        if (data[0].message === "Success") {
          setAlert(true);
          setFailed(false);
          dispatch(authActions.loginAuth({ data: data[0].data }));
        } else {
          debugger;
          setAlert(true);
          setFailed(true);
          dispatch(authActions.logoutAuth());
        }
      }, 1000);
    }

    return () => {
      clearTimeout(userTimeout);
    };
  }, [data, dispatch]);

  const userRequest = async ({ email, password }: LoginData) => {
    const requestData = {
      email,
      password,
    };
    await fetchData("http://localhost:5001/user/login", "POST", requestData);
  };

  return (
    <>
      <Alert
        message={failed ? "Login Failed" : "Login Success"}
        backColor={failed ? "red" : "green"}
        show={alert}
      />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              userRequest(values);
              await new Promise((resolve) => setTimeout(resolve, 2000));
              setSubmitting(false);

              setAlert(false);
              setFailed(false);
            }}
          >
            {({ isSubmitting, errors, dirty }) => {
              useUnsavedFormChanges(dirty && !isSubmitting);
              return (
                <Form className="space-y-6">
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                  <TextBox
                    name="email"
                    type="email"
                    label="Email Address"
                    error={errors.email}
                  />
                  <div>
                    <TextBox
                      name="password"
                      type="password"
                      label="Password"
                      error={errors.password}
                    />
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Button
                    type="submit"
                    value={
                      isSubmitting ? <Spinner text="Signing in" /> : "Sign in"
                    }
                    variant="indigo"
                  />
                </Form>
              );
            }}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
