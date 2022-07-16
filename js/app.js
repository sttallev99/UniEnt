import { login, register, user } from './controllers/user.js';
import home  from './controllers/home.js'
import { catalog, create, details, edit } from './controllers/events.js'

window.addEventListener('load', () => {
    const app = Sammy('body', function() {
        this.use('Handlebars', 'hbs');

        this.userData = {
            
        }
        
        this.get('/', home);
        this.get('index.html', home),
        this.get('#/home', home);

        this.get('#/login', login);
        this.get('#/register', register);
        this.get('#/user', user);
        this.get('#/catalog', catalog);
        this.get('#/create', create);
        this.get('#/edit', edit);
        this.get('#/details/:id', details)
    });
    app.run();
});