export class SignupInfo {
  username: string;
  role: string[];
  password: string;
  name: string;
  surname: string;

  constructor(username: string, role: string[], password: string, name: string, surname: string) {
    this.username = username;
    this.role = ['patient'];
    this.password = password;
    this.name = name;
    this.surname = surname;
  }
}
