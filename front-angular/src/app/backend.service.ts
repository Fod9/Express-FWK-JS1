import {Injectable} from '@angular/core';
import {Qcm, Question} from "./qcm";
import {Form} from "@angular/forms";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    private qcms: Array<Qcm>;

    constructor(private router: Router) {
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
        return await fetch(`http://localhost:3000/qcms/${id}/json`)
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

    async createQcm(data: any) {
        const response = await fetch(`http://localhost:3000/qcms/new`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.status === 200) {
            return this.router.navigate(['/qcms']);
        } else {
            throw new Error('Erreur lors de la création du QCM');
        }

    }
}

