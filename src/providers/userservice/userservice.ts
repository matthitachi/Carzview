import {Injectable} from '@angular/core';
import {DbProvider} from "../db/db";
import {Storage} from "@ionic/storage";
import {UtilityProvider} from "../utility/utility";
import {Driver} from "../../Model/driver";

/*
  Generated class for the UserserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserserviceProvider {

  constructor(public db: DbProvider, public storage: Storage, public utility: UtilityProvider) {
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
        return {status: true, message: "Login Successfull"};
      } else {
        return {status: false, message: "Incorrect username or password"};
      }

    });
  }

  set_Admin_auth_Storage(userdata) {
    this.storage.set("Admin_auth", userdata).then((r) => {
      console.log("Storage set" + JSON.stringify(userdata));
    });
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
        let option = [data.username, data.fname, data.lname, data.email, data.password, 'Admin', 0];
        let query = "Insert into users (username, fname, lname, email, password, role, trash, updated, created) " +
          "values (?,?,?,?,?,?,?,datetime('now', 'localtime'),datetime('now', 'localtime'))";
        return this.db.execQuery(query, option).then((response) => {
          // console.log(response);
          // this.getUser('Admin');
          this.utility.onFirstinstall();
          return "user created successfully";
        });
      } else {
        return "Admin account already Exists";
      }
    });
  }

  createDriver(data) {

    let option = [data.username, data.fname, data.lname, data.email, data.phone, data.image, parseInt(data.options), data.desc, 'Driver', 0];
    let query = "Insert into users (username, fname, lname, email, phone, image, carid, desc, role, trash, updated, created) " +
      "values (?,?,?,?,?,?,?,?,?,?,datetime('now', 'localtime'),datetime('now', 'localtime'))";
    return this.db.execQuery(query, option).then((response) => {
      console.log(response);

      // this.getUser('Admin');
      if (response.rowsAffected > 0) {
        return {status: true, message: "Driver created successfully"};
      } else {
        return {status: false, message: "Not completed"};
      }

    }).catch((e) => {
      console.log(e);
      return {status: false, message: "An error occured"};
    });


  }

  updateDriver(data) {

    let option = [data.username, data.fname, data.lname, data.email, data.phone, data.image, parseInt(data.options), data.desc, data.id];
    let query = "Update users set username = ?, fname =?, lname =? , email = ?, phone=?, image = ?, carid =?, desc = ?, updated = datetime('now', 'localtime') where id = ? ";
    return this.db.execQuery(query, option).then((response) => {
      console.log(response);

      // this.getUser('Admin');
      if (response.rowsAffected > 0) {
        return {status: true, message: "Driver updated successfully"};
      } else {
        return {status: false, message: "Not completed"};
      }

    }).catch((e) => {
      console.log(e);
      return {status: false, message: "An error occured"};
    });


  }

  deleteDriver(id) {
    let options = [id];
    let query = "Update users Set trash = 1 where id = ?";
    return this.db.execQuery(query, options).then((response) => {
      console.log(response);
      if (response.rowsAffected > 0) {
        return {status: true, message: "Success"};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured"};
      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }

  GetAllDrivers() {
    // let option = [""];
    let query = "Select id, username, fname, lname, email, desc, image, carid, phone  from users where role = 'Driver' and trash = 0";
    return this.db.execQuery(query).then((response) => {
      console.log(response);
      if (response.rows.length > 0) {
        let data = this.userList(response.rows, true);
        console.log(data);
        return {status: true, message: "Success", data: data};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured", data: ""};
      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }

  getDriverByCarId(id) {
    let option = [id];
    let query = "Select id, username, fname, lname, email, desc, image, carid  from users where role = 'Driver' and trash = 0 and carid = ?";
    return this.db.execQuery(query, option).then((response) => {
      console.log(response);
      if (response.rows.length > 0) {
        let data = this.userList(response.rows, true);
        console.log(data);
        return {status: true, message: "Success", data: data};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured", data: ""};
      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }

  userList(dataList, array = false) {

    // let car:Car;
    if (dataList.length == 1) {
      let user = new Driver();
      user.id = dataList.item(0).id;
      user.username = dataList.item(0).username;
      user.firstname = dataList.item(0).fname;
      user.lastname = dataList.item(0).lname;
      user.phone = dataList.item(0).phone;
      user.email = dataList.item(0).email;
      user.image = dataList.item(0).image;
      user.carid = dataList.item(0).carid;
      user.desc = dataList.item(0).desc;
      if (array) {
        return [user];
      } else {
        return user;
      }


    } else if (dataList.length > 1) {
      let users: Driver[] = [];
      for (let i = 0; i < dataList.length; i++) {
        let user = new Driver();
        user.id = dataList.item(i).id;
        user.username = dataList.item(i).username;
        user.firstname = dataList.item(i).fname;
        user.lastname = dataList.item(i).lname;
        user.phone = dataList.item(i).phone;
        user.email = dataList.item(i).email;
        user.image = dataList.item(i).image;
        user.carid = dataList.item(i).carid;
        user.desc = dataList.item(i).desc;
        users.push(user);
      }
      return users;
    } else {
      return null;
    }


  }

  countDriver() {
    let query = "SELECT Count(*) as count FROM users";
    return this.db.execQuery(query).then((response) => {
      console.log(response);
      if (response.rows.length > 0) {
        return {status: true, message: "Success", data: (response.rows.item(0).count - 1)};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured", data: ""};
      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }

}
