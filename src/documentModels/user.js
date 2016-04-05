



export default class User {

    constructor(data, isHtml) {
        Object.assign(this,data);
        this.isHtml = isHtml;
    }

    get name() {
        if (this.isHtml) {
            return this.isLegalEntity ? this.companyName || '' : (this.isDeceased ? 'Dödsboet efter ' : '') + (this.firstName + ' ' + this.lastName);
        } else {
            return this.isLegalEntity ? TAG.escapelatex(this.companyName) || '' : (this.isDeceased ? 'Dödsboet efter ' : '') + TAG.escapelatex(this.firstName + ' ' + this.lastName);
        }
    }


    get address() {
        if (this.isHtml) {
            return nobreak(escapelatex(this.streetAddress)) + ', ' + (this.postalCode ? nobreak(this.postalCode) + '~' : '') + nobreak(escapelatex(this.city));
        } else {
            return `${noBreakHtml(this.streetAddress)}, ${noBreakHtml(this.postalCode) || ''} ${noBreakHtml(this.city) || ''}`;
        }
    }

    get phone() {
        if (this.isHtml) {
            return this.phoneNumber && this.homePhoneNumber ? '' : 'Telefon:~' + (person.phoneNumber || '') + ( this.phoneNumber && this.homePhoneNumber ? ', ' : '' ) + (this.homePhoneNumber || '');
        } else {
            return this.phoneNumber && this.homePhoneNumber ? '' : 'Telefon:' + (this.phoneNumber || '') + ( this.phoneNumber && this.homePhoneNumber ? ', ' : '' ) + (this.homePhoneNumber || '');
        }
    }

    get email() {
        if (this.isHtml) {
            return TAG.nonEmpty`E-post:~${escapelatex(this.email)}`;
        } else {
            return TAG.nonEmpty`E-post:${this.email}`;
        }

    }

    get id() {
        if (this.isHtml) {
            return ' & ' + escapelatex(this.identifier);
        } else {
            return  TAG.nonEmpty` & ${this.identifier}`;
        }
    }

    get share() {
        if (this.isHtml) {
            return ' & ' + (this ? escapelatex(this.share) + '-del' : '');
        } else {
            return TAG.nonEmpty` & ${this.share}-del`;
        }
    }
}


/*

 let person = this.isLegalEntity ? TAG.escapelatex(this.companyName) || '' : (this.isDeceased ? 'Dödsboet efter ' : '') + TAG.escapelatex(this.firstName + ' ' + this.lastName);
 let address = nobreak(escapelatex(this.streetAddress)) + ', ' + (this.postalCode ? nobreak(this.postalCode) + '~' : '') + nobreak(escapelatex(this.city));
 let phone = this.phoneNumber && this.homePhoneNumber ? '' : 'Telefon:~' + (person.phoneNumber || '') + ( this.phoneNumber && this.homePhoneNumber ? ', ' : '' ) + (this.homePhoneNumber || '');
 let email = TAG.nonEmpty`E-post:~${escapelatex(this.email)}`;
 let id = ' & ' + escapelatex(this.identifier);
 let share = ' & ' + (this ? escapelatex(this.share) + '-del' : '');


 let person = this.isLegalEntity ? this.companyName || '' : (this.isDeceased ? 'Dödsboet efter ' : '') + (this.firstName + ' ' + this.lastName);
 let address = `${noBreakHtml(this.streetAddress)}, ${noBreakHtml(this.postalCode) || ''} ${noBreakHtml(this.city) || ''}`;
 let phone = this.phoneNumber && this.homePhoneNumber ? '' : 'Telefon:' + (this.phoneNumber || '') + ( this.phoneNumber && this.homePhoneNumber ? ', ' : '' ) + (this.homePhoneNumber || '');
 let email = TAG.nonEmpty`E-post:${this.email}`;
 let id = TAG.nonEmpty` & ${this.identifier}`;
 let share = TAG.nonEmpty` & ${this.share}-del`;

 return String.raw`<span class="variable-neu">${person}, ${address},${phone}, ${email}, ${id}, ${share}</span>`;


*/
