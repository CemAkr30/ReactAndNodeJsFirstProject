import Container from "../components/Container";
import TextBox from "../components/TextBox";
import { Formik, Form } from "formik";
import useUnsavedFormChanges from "../hooks/useUnsavedFormChanges";
import TextArea from "../components/TextArea";
import { UserProfileSchema } from "../Validation/Validations";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

type UserProfile = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
};

export default function YourProfileRouterLayout() {
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFailed, setAlertFailed] = useState(false);
  const [initialValues, setInitalValues] = useState<UserProfile>(
    {} as UserProfile
  );

  const { data, loading, error, fetchData } = useRequest();

  const handlerClearProfile = () => {
    setInitalValues({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      country: "",
      city: "",
    } as UserProfile);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      if (data != undefined && data.status == "200") {
        setAlertSuccess(true);
        setAlertFailed(false);
      } else {
        setAlertFailed(true);
        setAlertSuccess(false);
      }
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [data, error]);

  const updateProfile = async (values: UserProfile) => {
    const { email, password, country, firstName, lastName, city } = values;
    const app: any = localStorage.getItem("authantication");
    const user = JSON.parse(app);
    const data = {
      email,
      password,
      country,
      firstName,
      lastName,
      city,
    };

    await fetchData(
      "http://localhost:5001/user/update/" + user.user.id,
      "POST",
      data
    );
    handlerClearProfile();
  };

  return (
    <>
      <Formik
        key={JSON.stringify(initialValues)} // key propunu initialValues'e bağlı olarak ayarlayın
        initialValues={initialValues}
        validationSchema={UserProfileSchema}
        onSubmit={async (values, { setSubmitting }) => {
          updateProfile(values);
          await new Promise((resolve) => setTimeout(resolve, 2000));

          setSubmitting(false);

          setAlertSuccess(false);
          setAlertFailed(false);
        }}
      >
        {({ isSubmitting, errors, dirty }) => {
          useUnsavedFormChanges(dirty && !isSubmitting);
          return (
            <div className="bg-gray-800">
              <Container>
                <Form className="p-8">
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                  <div className="space-y-12">
                    <div className="border-b border-white/10 pb-5">
                      <h2 className="text-base font-semibold leading-7 text-white">
                        Profile
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-400">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          About
                        </label>
                        <div className="mt-2">
                          <TextArea />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-400">
                          Write a few sentences about yourself.
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-white/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-white">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-400">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <TextBox
                            name="firstName"
                            type="firstName"
                            label="First Name"
                            className="sm:w-80 text-white"
                            labelClass="text-white"
                            error={errors.firstName}
                          />
                          <TextBox
                            name="email"
                            type="email"
                            label="Email  "
                            className="sm:w-80 text-white"
                            labelClass="text-white"
                            error={errors.email}
                          />
                          <TextBox
                            name="password"
                            type="password"
                            label="Password "
                            className="sm:w-80 text-white"
                            labelClass="text-white"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <TextBox
                            name="lastName"
                            type="lastName"
                            label="Last Name"
                            className="sm:w-80 text-white"
                            labelClass="text-white"
                          />
                          <TextBox
                            name="country"
                            type="country"
                            label="Country"
                            className="sm:w-80 text-white"
                            labelClass="text-white"
                          />
                          <TextBox
                            name="city"
                            type="city"
                            label="City"
                            className="sm:w-80 text-white"
                            labelClass="text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {alertSuccess && (
                    <Alert
                      message={"Success"}
                      backColor={"green"}
                      show={alertSuccess}
                    />
                  )}
                  {alertFailed && (
                    <Alert
                      message={"Failed"}
                      backColor={"red"}
                      show={alertFailed}
                    />
                  )}

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                      type="submit"
                      variant="indigo"
                      value={isSubmitting ? <Spinner text="Saving" /> : "Save"}
                    />
                  </div>
                </Form>
              </Container>
            </div>
          );
        }}
      </Formik>
    </>
  );
}
