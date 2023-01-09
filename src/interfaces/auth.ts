export interface LoginModal {
  email: string;
  password: string;
}

export interface AuthModel {
  api_token: string;
}

export interface UserModel {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  avatar?: string;
  password?: string;
}
