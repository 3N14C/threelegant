"use client";

import { FC } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  errors: FieldErrors;
  className?: string;
  placeholder?: string;
}

export const InputValidated: FC<IProps> = ({
  register,
  errors,
  className,
  placeholder,
  ...props
}) => {
  return (
    <div className="">
      <Input
        {...props}
        {...register}
        className={cn(
          "border-[--neutral-04] focus:border-primary transition duration-300",
          className
        )}
        placeholder={placeholder}
      />

      {errors[register.name] && (
        <p className="text-red-500">
          {errors[register.name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
