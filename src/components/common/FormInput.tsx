import {
  useFormContext,
  useFormState,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";

import Input from "@/components/common/Input";

interface FormInputProps<T> {
  placeholder: string;
  name: Path<T>;
  type: string;
  id: string;
}

// FormProvider로 감싸지 않으면 오류 발생
const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
  const { placeholder, name, type, id } = props;
  const methods = useFormContext();
  const { errors } = useFormState({ name });

  function getErrorMessage(errors: FieldErrors) {
    const errMsg = errors[name]?.message;
    const result = errMsg && typeof errMsg === "string" ? errMsg : "";
    return result;
  }

  return (
    <Input
      {...methods.register(name)}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      errorMessage={getErrorMessage(errors)}
    />
  );
};

export default FormInput;
