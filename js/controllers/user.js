import { logout as logoutApi, login as loginApi, register as registerApi } from '../data.js';

export async function login() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/user/login.hbs');
}

export async function loginPost() {
    try {
        const result = await loginApi(this.params.username, this.params.password);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error;
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.username = result.username
        this.redirect('#/catalog');
    } catch(err) {
        console.error(err);
    }
}

export async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/user/register.hbs');
}

export async function registerPost() {
    if(this.params.username.length < 3) {
        alert('Username should be at least 3 characters!');
        return;
    } else if(this.params.password.length < 6) {
        alert('Password should be at least 6 characters!');
        return;
    }else if(this.params.password !== this.params.rePassword) {
        alert('Repeat password should be equal to the password!');
        return;
    }
    try {
        const result = await registerApi(this.params.username, this.params.password);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error;
            Object.assign(error, result);
            throw error;
        }

        this.redirect('#/home');
    } catch(err) {
        console.error(err);
    }
}

export async function user() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/user/user.hbs', this.app.userData)
}
export async function logout() {
    try {
        const result = await logoutApi();
        if(result.hasOwnProperty('errorData')){
            const error = new Error;
            Object.assign(error, result);
            throw error;
        }
        
        this.app.userData.username = '';
        this.app.userData.isMine = false;
    
        this.redirect('#/home');
    } catch(err) {
        console.error(err);
    }
} 