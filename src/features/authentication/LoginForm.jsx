import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useForm } from "react-hook-form";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const { register, handleSubmit, reset } = useForm();
  const { userLogin, isLoginLoading } = useLogin();

  function onSubmit(data) {
    userLogin(
      { email: data.email, password: data.password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address">
        <Input
          {...register("email", {
            required: "this field is required",
          })}
          type="email"
          id="email"
          defaultValue={"sjdzarepur@gmail.com"}
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isLoginLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          defaultValue={"sajjad123"}
          {...register("password", {
            required: "this field is required",
          })}
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoginLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button type="submit" size="large" disabled={isLoginLoading}>
          {isLoginLoading ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
