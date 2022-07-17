import { createEvent, getEvents, getEvent, updateEvent } from '../data.js';

export async function catalog() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        event: await this.load('./templates/events/event.hbs')
    }

    const events = await getEvents();
    this.app.userData.events = events;

    this.partial('./templates/events/catalog.hbs', this.app.userData)
}

export async function create() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
  }
  this.partial('./templates/events/create.hbs', this.app.userData)  
}

export async function createPost() {
    const event = {
        name: this.params.name,
        dateTime: this.params.dateTime,
        description: this.params.description,
        imageURL: this.params.imageURL,
        creatorUsername: localStorage.getItem('username')
    }
    try {
        const result = await createEvent(event);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error;
            Object.assign(error, result);
            throw error;
        }

        this.redirect('#/catalog');
    }catch(err) {
        console.error(err);
    }
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    const id = this.params.id;

    const event = await getEvent(id);
    const context = Object.assign(event, this.app.userData);

    this.partial('./templates/events/edit.hbs', context);
}

export async function editPost() {
    const updatedEvent = {
        name: this.params.name,
        dateTime: this.params.dateTime,
        description: this.params.description,
        imageURL: this.params.imageURL
    }
    const id = this.params.id;
    try {
        const result = await updateEvent(id, updatedEvent);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error;
            Object.assign(error, result);
            throw error;
        }
    }catch(err) {
        console.error(err);
    }

    this.redirect(`#/details/${id}`);
}

export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    
    const id = this.params.id;
    const event = await getEvent(id);
    const eventCreatorObjectId = event.ownerId;
    const loggedUserObjectId = localStorage.getItem('userId');

    if(eventCreatorObjectId === loggedUserObjectId) {
        this.app.userData.isMine = true;
    } else {
        this.app.userData.isMine = false;
    }

    const context = Object.assign(event, this.app.userData)
    this.partial('./templates/events/details.hbs', context);
}