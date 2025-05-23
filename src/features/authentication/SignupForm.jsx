import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUpUser, isSignUpLoading } = useSignUp();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit(data) {
    signUpUser(data, {
      onSettled: () => {
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errors={errors}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" errors={errors}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errors={errors}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            minLength: {
              value: 8,
              message: "Use 8 charachter password STUPID ASSHOLE!",
            },
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" errors={errors}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "this field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to be match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        {isSignUpLoading ? (
          <SpinnerMini />
        ) : (
          <Button disabled={isSignUpLoading}>Create new user</Button>
        )}
      </FormRow>
    </Form>
  );
}

export default SignupForm;
