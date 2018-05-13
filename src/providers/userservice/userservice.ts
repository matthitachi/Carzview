import {Injectable} from '@angular/core';
import {DbProvider} from "../db/db";
import {Storage} from "@ionic/storage";

/*
  Generated class for the UserserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserserviceProvider {

  constructor(public db: DbProvider, public storage: Storage) {
    console.log('Hello UserserviceProvpiider Provider');
  }

  checkAdmin() {
    let query = "Select * from users where id = 1";
    return this.db.execQuery(query).then((response) => {
      console.log(response);
      if (response.rows.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  getUser(role) {
    let option = [role];
    let query = "Select username, fname, lname, email  from users where id = 1 and role = ?";
    return this.db.execQuery(query, option).then((response) => {
      console.log(response);
    });
  }

  authAdmin(data) {
    let option = ["Admin", data.username, data.password];
    let query = "Select username, fname, lname, email  from users where id = 1 and role = ? and  username = ? and password = ?";
    return this.db.execQuery(query, option).then((response) => {
      if (response.rows.length > 0) {

        let admin_user = {
          username: response.rows.item(0).username,
          firstname: response.rows.item(0).fname,
          lastname: response.rows.item(0).lname,
          email: response.rows.item(0).email,
        };
        console.log(admin_user);
        this.set_Admin_auth_Storage(admin_user);
        return "Login Successfull";
      } else {
        return "Incorrect username or password";
      }

    });
  }

  set_Admin_auth_Storage(userdata) {
    this.storage.set("Admin_auth", userdata);
  }

  get_Admin_auth_Storage(userkey) {
    return this.storage.get(userkey);
  }

  Admin_logout() {
    this.storage.remove('Admin_auth');
  }

  createAdmin(data) {

    return this.checkAdmin().then((response: boolean) => {
      console.log(response)
      if (!response) {
        let option = [data.username, data.fname, data.lname, data.email, data.password, 'Admin', 0, this.db.updated, this.db.created];
        let query = "Insert into users (username, fname, lname, email, password, role, trash, updated, created) " +
          "values (?,?,?,?,?,?,?,?,?)";
        return this.db.execQuery(query, option).then((response) => {
          // console.log(response);
          // this.getUser('Admin');
          return "user creates successfully";
        });
      } else {
        return "Admin account already Exists";
      }
    });
  }

}
