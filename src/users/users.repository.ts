export class UserRepository {
  private users: any[] = [];

  salvar(user: any): any {
    this.users.push(user);
    return user;
  }
}
