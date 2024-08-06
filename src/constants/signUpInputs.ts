import { SignUpFormType } from "@/types/types";

export const INPUTS :{label:string,name:keyof SignUpFormType,type:string}[] = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];
  