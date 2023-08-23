import { User } from "../interfaces/interface";
import { UserList } from "../data/data";

export class Service {
    constructor() { }
    users(): Promise<User[]> {
        return Promise.resolve(UserList);
    }

    user(email: string): Promise<User | undefined> {
        return Promise.resolve(UserList.find(user => user.email === email));
    }

    create(user: User): Promise<User | undefined> {
        UserList.push(user);
        return Promise.resolve(user);
    }

    update(user: User): Promise<User | undefined> {
        const index = UserList.findIndex(i => i.email === user.email);
        if (index < 0) return Promise.reject("User not found.");
        if (user.firstName) {
            UserList[index].firstName = user.firstName;
        }

        if (user.lastName) {
            UserList[index].lastName = user.lastName;
        }
        
        return Promise.resolve(user);
    }

    delete(email: string): Promise<String | undefined> {
        const index = UserList.findIndex(i => i.email === email);
        if (index < 0) return Promise.reject("User not found.");
        UserList.splice(index, 1);
        return Promise.resolve(email);
    }
}