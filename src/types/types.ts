export type ErrorType ={
    message:string,
    success:boolean
}

export type CustomInputProps ={
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

export type SignUpForm={
    name:string 
    email:string 
    password:string 
    confirmPassword:string
}
export type SignUpState ={
    signUpform:SignUpForm
    loading:"idle" | "pending" | "succeeded" | "failed"
    error:string | null
}

export type apiResponse={
    message:string
    success: boolean
}

export type SignUpRequest ={
    name: string;
    email: string;
    password: string;
  }

export type AddTask ={
    email:string,
    title:string
}