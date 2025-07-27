import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('auth_users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('current_user')) || null;
    }

    // register a new user
    register(user) {
        // check if email or username already exists
        const emailExists = this.users.some(u => u.email === user.email);
        const usernameExists = this.users.some(u => u.username === user.username);

        if (emailExists) throw new Error('Email already exists');
        if (usernameExists) throw new Error('Username already exists');
        if (user.password !== user.confirmPassword) throw new Error('Passwords do not match');

        const newUser = {
            id: Date.now().toString(),
            username: user.username,
            email: user.email,
            password: user.password,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this._saveUsers();
        return newUser;
    }

    // login user
    login(identifier, password) {
        const user = this.users.find(u =>
            (u.email === identifier || u.username === identifier) &&
            u.password === password
        );

        if (!user) throw new Error('Invalid credentials');

        this.currentUser = user;
        localStorage.setItem('current_user', JSON.stringify(user));
        return user;
    }

    // logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('current_user');
    }

    // check if user is logged in
    isLoggedIn() {
        return !!this.currentUser;
    }

    // get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // save users to localStorage
    _saveUsers() {
        localStorage.setItem('auth_users', JSON.stringify(this.users));
    }
}