import {Injectable} from '@angular/core';
import {Qcm, Question} from "./qcm";
import {Form} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    private qcms: Array<Qcm>;

    constructor() {
        this.qcms = [];
    }

    async getQcms() {
        this.qcms = await fetch('http://localhost:3000/qcms/json')
            .then(response => response.json())
            .then(data => {
                return data
            });

    }

    async getQcm(id: number) {
        console.log(`http://localhost:3000/qcms/${id}`);
        return await fetch(`http://localhost:3000/qcms/${id}`)
            .then(response => response.json())
            .then(data => {
                return data
            });
    }

    showQcms() {
        return this.qcms;
    }

    async envoyerDonnees(data: any, id: number) {
        const response = await fetch(`http://localhost:3000/qcms/${id}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    }

}

