export type ListType = {
  id: string;
  theme: string;
  title: string;
  userEmail: string;
};

export type AddTaskType = {
  listId: string;
  title: string;
};

export type TaskSliceType = {
  tasks: TaskType[];
  loading: boolean;
  error: string | null;
};

export type TaskType = {
  id: string;
  title: string;
  isCompleted: boolean;
  listId: string;
};

export type ListSliceType = {
  lists: ListType[];
  loading: boolean;
  error: string | null;
};

export type ResetPasswordParams = {
  password: string;
  token: string;
};
export type SignInParams = {
  email: string;
  password: string;
  callbackUrl: string;
};
export type CustomInputProps = {
  label?: string;
  theme?: string;
  name: string;
  type: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type SignUpFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type User =
  | {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  | undefined
  | null;

export type AuthState = {
  email: string | null;
  user: User;
  loading: "idle" | "pending" | "succeeded" | "failed";
  signUpResponse: ApiResponse | null | undefined;
};

export type ApiResponse = {
  message: string;
  success: boolean;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

export type AddTask = {
  email: string;
  title: string;
};

export type AddListType = {
  email: string;
  title: string;
  theme: string;
};
export type UpdateListType = {
  listId: string;
  title: string;
  theme?: string;
};

export type ListCrudProps = {
  listTitle?: string;
  listIdToUpdate?: string;
  update?: boolean;
  theme?: string;
};
