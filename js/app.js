import { login, register, user, logout, loginPost, registerPost } from './controllers/user.js';
import home  from './controllers/home.js'
import { catalog, create, details, edit, createPost, editPost, deleteEvent, join } from './controllers/events.js'

window.addEventListener('load', () => {
    const app = Sammy('body', function() {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: localStorage.getItem('username') || '',
            isMine: false,
            haveOwnEvent: false
        }
        
        this.get('/', home);
        this.get('index.html', home),
        this.get('#/home', home);

        this.get('#/login', login);
        this.get('#/register', register);
        this.get('#/user', user);
        this.get('#/catalog', catalog);
        this.get('#/create', create);
        this.get('#/edit/:id', edit);
        this.get('#/details/:id', details);
        this.get('#/logout', logout);
        this.get('#/delete/:id', deleteEvent);
        this.get('#/join/:id', join)

        this.post('#/login', (ctx) => { loginPost.call(ctx); });
        this.post('#/register', (ctx) => {registerPost.call(ctx); });
        this.post('#/create', (ctx) => { createPost.call(ctx); });
        this.post('#/edit/:id', (ctx) => { editPost.call(ctx); });
    });
    app.run();
});