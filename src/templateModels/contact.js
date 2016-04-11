'use strict';

let utils = require('../utils');
let constants = require('../constants');
let Base = require('./baseTemplateModel');
let _ = require('lodash');
let TAG = utils.TAG;

module.exports = class Contact extends Base {
    constructor(data, share, isHtml) {
        super();
        Object.assign(this,data);
        this._share = share;
    }

    get name() {
        switch(this.type) {
            case constants.LATEX:
                return this.isLegalEntity ? TAG.escapelatex(this.companyName) || '' : (this.isDeceased ? 'Dödsboet efter ' : '') + TAG.escapelatex(this.firstName + ' ' + this.lastName);
            case constants.HTML:
                return this.isLegalEntity ? this.companyName || '' : (this.isDeceased ? 'Dödsboet efter ' : '') + (this.firstName + ' ' + this.lastName);
        }
    }

    get address() {
        switch(this.type) {
            case constants.LATEX:
                let address =  nobreak(escapelatex(this.streetAddress)) + ', ' + (this.postalCode ? nobreak(this.postalCode) + '~' : '') + nobreak(escapelatex(this.city));
                return TAG.nonEmpty`\\raggedrigh ${address}`;
            case constants.HTML:
                return `${noBreakHtml(this.streetAddress)}, ${noBreakHtml(this.postalCode) || ''} ${noBreakHtml(this.city) || ''}`;
        }
    }

    get phone() {
        switch(this.type) {
            case constants.LATEX:
                return this.phoneNumber && this.homePhoneNumber ? '' : 'Telefon:~' + (person.phoneNumber || '') + ( this.phoneNumber && this.homePhoneNumber ? ', ' : '' ) + (this.homePhoneNumber || '');
            case constants.HTML:
                return this.phoneNumber && this.homePhoneNumber ? '' : 'Telefon:' + (this.phoneNumber || '') + ( this.phoneNumber && this.homePhoneNumber ? ', ' : '' ) + (this.homePhoneNumber || '');
        }
    }

    get email() {
        switch(this.type) {
            case constants.LATEX:
                return TAG.nonEmpty`E-post:~${escapelatex(this.email)}`;
            case constants.HTML:
                return TAG.nonEmpty`E-post:${this.email}`;
        }

    }

    get id() {
        switch(this.type) {
            case constants.LATEX:
                return ' & ' + escapelatex(this.identifier);
            case constants.HTML:
                return  TAG.nonEmpty` & ${this.identifier}`;
        }
    }

    get share() {
        switch(this.type) {
            case constants.LATEX:
                return TAG.nonEmpty` & ${this.isHtml ? this._share : escapelatex(this._share) }-del`;
            case constants.HTML:
                return TAG.nonEmpty` & ${this._share}-del`;
        }
    }

    get templates() {
        return templates || [];
    }
}


let getTemplateString = function(data, isHtml) {
    if (!data.contacts && data.contact) {
        var contacts = [data.contact];
    }
    let to = isHtml ? this.latex : this.html;
    return contacts.map((contact, index) => {
        let share = _.findWhere(data.shares,{contactId : xc.id});
        return to.body(new Contact(contact,share)) + (contacts.length-1 !== index && to.separator ? to.separator : '');
    });
};


const templateAliases = [
    {
        name:  "contactsInfoFull",
        alias:  "contactInfoFull"
    },
    {
        name:  "contactsInfo",
        alias:  "contactInfo"
    },
    {
        name:  "contactsInfoMedium",
        alias:  'contactInfoMedium'
    },
    {
        name:  "contactsInfoMedium2",
        alias:  'contactInfoMedium2'
    },
    {
        name:  "contactsInfoShares",
        alias:  "contactInfoShares"
    },
    {
        name:  "contactsInfoParts",
        alias:  "contactInfoShares"
    },
    {
        name:  "contactInfoParts",
        alias:  "contactInfoShares"
    },
    {
        name:  "contactsInfoShort",
        alias:  "contactInfoShort"
    },
    {
        name:  "contactsName",
        alias:  "contactName"
    }
];

let templates = [
    {
        name: "contactInfoFull",
        latex: {
            separator:`\\\\hline \\n`,
            body(contact) {
                
                return String.raw`\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}
                ${contact.name}
                ${contact.address}
                ${contact.phone}
                ${contact.id}
                ${contact.share}
                ${contact.email} \\end{tabular}
                `;
            }
        },
        html: {
            separator:`<br>`,
            body(contact) {
                contact.setIsHtml();
                return String.raw`<span class="variable-neu">${contact.name}, ${contact.address},${contact.phone}, ${contact.email}, ${contact.id}, ${contact.share}</span>`;
            }
        },
        getTemplateString
    },
    {
        name:  "groupedContactInfo",
        latex: {
            separator:`\\hline \\n`,
            body(contact) {
                return String.raw`\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}
                ${contact.name}
                ${contact.address}
                ${contact.phone}
                ${contact.email}
                \\end{tabular}
                `;
            }
        },
        html: {
            separator:`<br>`,
            body(contact) {
                contact.setIsHtml();
                return String.raw`<span class="variable-neu">${contact.name}, ${contact.address},${contact.phone}, ${contact.email}, ${contact.id}</span>`;
            }
        },
        getTemplateString
    },
    {
        name:  "contactInfo",
        latex:{
            body(contact) {
                return String.raw`\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}
                ${contact.name}
                ${contact.address}
                ${contact.phone}
                ${contact.email}
                ${contact.id}
                \\end{tabular}
                `;
            }
        },
        html: {
            body(contact) {
                contact.setIsHtml();
                return String.raw`<span class="variable-neu">${contact.name}, ${contact.address},${contact.phone}, ${contact.email}, ${contact.id}</span>`;
            }
        },
        getTemplateString
    },

    {
        name:  "contactInfoMedium",
        latex:{
            body(contact) {
                return String.raw`\\begin{tabular}[t]{@{}p{12cm}@{}}
                ${contact.name}
                ${contact.address}
                ${contact.phone}
                ${contact.email}
                \\end{tabular}
                `;
            }
        },
        html: {
            body(contact) {
                contact.setIsHtml();
                return String.raw`<span class="variable-neu">${contact.name}, ${contact.address},${contact.phone}, ${contact.email}, ${contact.id}</span>`;
            }
        },
        getTemplateString
    },
    {
        name:  "contactInfoMedium2",
        latex:{
            separator:`\\n`,
            body(contact) {
                return String.raw`\\begin{tabular}[t]{@{}p{6.8cm}@{}}'
                ${contact.name}
                ${contact.address}
                ${contact.phone}
                ${contact.email}
                \\end{tabular}%
                `;
            }
        },
        html: {
            separator:`<br>`,
            body(contact) {
                contact.setIsHtml();
                return String.raw`<span class="variable-neu">${contact.name}, ${contact.address},${contact.phone}, ${contact.email}, ${contact.id}</span>`;
            }
        },
        getTemplateString(data, isHtml) {
            if(!data.contacts && data.contact) {
                var contacts = [data.contact];
            }

            let to = isHtml ? this.latex : this.html;
            return contacts.map((xc, index) => {
                let share = _.findWhere(data.shares,{contactId : xc.id});
                return to.body(new Contact(contact,share))  + (index && (index % 2) !== 0 ? to.separator : '');
            });
        }
    },
    {
        name:  "contactInfoShares",
        latex:{
            body(contact) {
                return String.raw`\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}\n
                ${contact.name}
                ${contact.id}
                ${contact.share}
                \\end{tabular}\n`;
            }
        },
        html: {
            body(contact) {
                contact.setIsHtml();
                return String.raw`<span class="contact-info-shares">${contact.name}, ${contact.address},${contact.phone}, ${contact.id}, ${contact.share}</span>`;
            }
        },
        getTemplateString
    },


    {
        name:  "contactInfoShort", //name, ssn
        template:  `<% \
if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};\
_.each(contacts, function(xc){\
print('\\\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}\\n');\
print(xc ? (xc.isLegalEntity?escapelatex(xc.companyName):(xc.isDeceased ? 'Dödsboet efter ' : '') + escapelatex(xc.firstName + ' ' + xc.lastName))\
+ ' & ' + escapelatex(xc.identifier) + ' \\\\\\\\ ':'');\
print('\\\\end{tabular}\\n');\
});\
%>`,

        latex:{
            body(contact) {
                return String.raw`\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}\n
                ${contact.name}
                ${contact.id}
                ${contact.share}
                \\end{tabular}\n`;
            }
        },
        html: {
            body(contact) {
                contact.setIsHtml();
                return String.raw`<span class="variable-neu">${contact.name}, ${contact.address},${contact.phone}, ${contact.id}, ${contact.share}</span>`;
            }
        },
        getTemplateString


    },

    {
        name:  "contactName", //name
        template:  `<%\
if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};\
 _.each(contacts, function(x) {if(x){print((x.isLegalEntity?escapelatex(x.companyName): (x.isDeceased ? 'Dödsboet efter ' : '') + escapelatex(x.firstName + ' ' + x.lastName)) + '\\n');} else {print('Saknas');};});\
%>`
    }
];


templates.push.apply(templateAliases);