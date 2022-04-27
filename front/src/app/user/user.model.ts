export class User {
  id!: number;
  name: string;
  surname: string;
  username: string;


  constructor(name: string, surname: string, username: string) {
    this.name = name;
    this.surname = surname;
    this.username = username;
  }

}
