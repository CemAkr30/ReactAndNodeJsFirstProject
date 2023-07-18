import { useEffect, useState } from "react";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import useRequest from "../hooks/useRequest";
import { Formik, Form } from "formik";
import useUnsavedFormChanges from "../hooks/useUnsavedFormChanges";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { RegisterSchema } from "../Validation/Validations";
import { useDispatch } from "react-redux";

type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function RegisterRouterLayout() {
  const [alert, setAlert] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [info, setInfo] = useState<String>("");
  const { data, loading, error, fetchData } = useRequest();

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  useEffect(() => {
    let userTimeout: any;

    if (data != undefined && data.data.length > 0) {
      userTimeout = setTimeout(() => {
        if (data.status != "500") {
          setAlert(true);
          setFailed(false);
        } else {
          setInfo(data.message);
          setAlert(true);
          setFailed(true);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(userTimeout);
    };
  }, [data, loading, error]);

  const userRequest = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterData) => {
    const requestData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    await fetchData("http://localhost:5001/user/register", "POST", requestData);
  };

  return (
    <>
      <Alert
        message={failed ? "Register Failed" : "Register Success"}
        backColor={failed ? "red" : "green"}
        show={alert}
        info={info}
      />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting }) => {
              userRequest(values);
              await new Promise((resolve) => setTimeout(resolve, 4000));
              setSubmitting(false);

              setAlert(false);
              setFailed(false);
              setInfo("");
            }}
          >
            {({ isSubmitting, errors, dirty }) => {
              useUnsavedFormChanges(dirty && !isSubmitting);
              return (
                <Form className="space-y-6">
                  <TextBox
                    name="firstName"
                    type="firstName"
                    label="First Name"
                    error={errors.firstName}
                  />
                  <TextBox
                    name="lastName"
                    type="lastName"
                    label="Last Name"
                    error={errors.lastName}
                  />
                  <TextBox
                    name="email"
                    type="email"
                    label="Email Address"
                    error={errors.email}
                  />
                  <TextBox
                    name="password"
                    type="password"
                    label="Password"
                    error={errors.password}
                  />
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
                      isSubmitting ? <Spinner text="Signing Up" /> : "Sign Up"
                    }
                    variant="indigo"
                  />
                </Form>
              );
            }}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/"
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
