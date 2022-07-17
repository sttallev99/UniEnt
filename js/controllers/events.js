import { createEvent } from '../data.js';

export async function catalog() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/events/catalog.hbs', this.app.userData)
}

export async function create() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs')
  }
  this.partial('./templates/events/create.hbs', this.app.userData)  
}

export async function createPost() {
    // if(this.params.name.lenght === 0) {
    //     alert('Event name cannot be empty!');
    //     return;
    // } else if(this.params.description.lenght === 0) {
    //     alert('Event description cannot be empty!');
    //     return;
    // }
    const event = {
        name: this.params.name,
        dateTime: this.params.dateTime,
        description: this.params.description,
        imageURL: this.params.imageURL
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
    this.partial('./templates/events/edit.hbs');
}

export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/events/details.hbs', this.app.userData);
}