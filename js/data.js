function getURL(endpoint) {
    return `https://gainfulnest.backendless.app/api/${endpoint}`;
}

const endpoints = {
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    REGISTER: 'users/register',
    GET_EVENTS: 'data/events',
    GET_EVENT: 'data/events/'
}

export async function login(username, password) {
    const result = await (await fetch(getURL(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('userId', result.objectId);
    localStorage.setItem('username', result.username);

    return result;
}

export async function register(username, password) {
    return (await fetch(getURL(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json()
}

export async function logout() {
    const token = localStorage.getItem('userToken');

    const result = await fetch(getURL(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    return result;
}

export async function getEvents() {
    const token = localStorage.getItem('userToken');

    return (await fetch(getURL(endpoints.GET_EVENTS), {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getEventsByUser() {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    return (await fetch(getURL(endpoints.GET_EVENTS + `?where=ownerId%20%3D%20%27${userId}%27`), {
        headers: {
            'user-token': token
        }
    })).json();

}

export async function getEvent(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(getURL(endpoints.GET_EVENTS + id), {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function createEvent(event) {
    const token = localStorage.getItem('userToken');

    return (await fetch(getURL(endpoints.GET_EVENTS), {
        method: 'POST',
        headers: {
            'user-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })).json();
}

export async function updateEvent(id, updatedEvent) {
    const token = localStorage.getItem('userToken');

    return (await fetch(getURL(endpoints.GET_EVENT + id), {
        method: 'PUT',
        headers: {
            'user-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEvent)
    })).json();
}


