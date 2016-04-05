'use strict';

let utils = require('../utils');
let TAG = utils.TAG;

module.exports.Contact = class Contact {

    constructor(data, isHtml) {
        Object.assign(this,data);
        this.isHtml = isHtml;
    }

    setIsHtml() {
        this.isHtml = true;
        return this;
    }

    get name() {
        if (!this.isHtml) {
            return this.isLegalEntity ? TAG.escapelatex(this.companyName) || '' : (this.isDeceased ? 'Dödsboet efter ' : '') + TAG.escapelatex(this.firstName + ' ' + this.lastName);
        } else {
            return this.isLegalEntity ? this.companyName || '' : (this.isDeceased ? 'Dödsboet efter ' : '') + (this.firstName + ' ' + this.lastName);
        }
    }


    get address() {
        if (!this.isHtml) {
            let address =  nobreak(escapelatex(this.streetAddress)) + ', ' + (this.postalCode ? nobreak(this.postalCode) + '~' : '') + nobreak(escapelatex(this.city));
            return TAG.nonEmpty`\\raggedrigh ${address}`;
        } else {
            return `${noBreakHtml(this.streetAddress)}, ${noBreakHtml(this.postalCode) || ''} ${noBreakHtml(this.city) || ''}`;
        }
    }

    get phone() {
        if (!this.isHtml) {
            return this.phoneNumber && this.homePhoneNumber ? '' : 'Telefon:~' + (person.phoneNumber || '') + ( this.phoneNumber && this.homePhoneNumber ? ', ' : '' ) + (this.homePhoneNumber || '');
        } else {
            return this.phoneNumber && this.homePhoneNumber ? '' : 'Telefon:' + (this.phoneNumber || '') + ( this.phoneNumber && this.homePhoneNumber ? ', ' : '' ) + (this.homePhoneNumber || '');
        }
    }

    get email() {
        if (!this.isHtml) {
            return TAG.nonEmpty`E-post:~${escapelatex(this.email)}`;
        } else {
            return TAG.nonEmpty`E-post:${this.email}`;
        }

    }

    get id() {
        if (!this.isHtml) {
            return ' & ' + escapelatex(this.identifier);
        } else {
            return  TAG.nonEmpty` & ${this.identifier}`;
        }
    }

    get share() {
        if (!this.isHtml) {
            return ' & ' + (this ? escapelatex(this.share) + '-del' : '');
        } else {
            return TAG.nonEmpty` & ${this.share}-del`;
        }
    }
}

let getTemplateString = function(data, isHtml) {
    if(_.isUndefined(data.contacts) && !_.isUndefined(data.contact)) { var contacts = [data.contact];};
    if(_.isUndefined(data.shares)) { var shares = [];};
    let to = isHtml ? this.latex : this.html;
    return contacts.map((xc, index) => {
        let x = _.findWhere(shares, {'contactId' : xc.id});
        return to.body(data) + (contacts.length-1 !== index && to.separator ? to.separator : '');
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
    },
];




module.exports.templates = [
    {
        name: "contactInfoFull",
        latex: {
            separator:`\\hline \\n`,
            body(data) {
                let user =  new Contact(data);
                return String.raw`\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}
                ${user.name}
                ${user.address}
                ${user.phone}
                ${user.id}
                ${user.share}
                ${user.email} \\end{tabular}\n`;
            }
        },
        html: {
            separator:`<br>`,
            body(data) {
                let user =  new Contact(data).isHtml();
                return String.raw`<span class="variable-neu">${user.name}, ${user.address},${user.phone}, ${user.email}, ${user.id}, ${user.share}</span>`;
            }
        },
        getTemplateString
    },
    {
        name:  "groupedContactInfo",
        latex: {
            separator:`\\hline \\n`,
            body(data) {
                let user =  new Contact(data);
                return String.raw`\\\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}\\n
                ${user.name}
                ${user.address}
                ${user.phone}
                ${user.email}
                \\end{tabular}\n`;
            }
        },
        html: {
            separator:`<br>`,
            body(data) {
                let user =  new Contact(data).setIsHtml();
                return String.raw`<span class="variable-neu">${user.name}, ${user.address},${user.phone}, ${user.email}, ${user.id}</span>`;
            }
        },
        getTemplateString
    },
    {
        name:  "contactInfo",
        latex:{
            body(data) {
                let user =  new Contact(data);
                return String.raw`\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}
                ${user.name}
                ${user.address}
                ${user.phone}
                ${user.email}
                ${user.id}
                \\end{tabular}\n`;
            }
        },
        html: {
            body(data) {
                let user =  new Contact(data).setIsHtml();
                return String.raw`<span class="variable-neu">${user.name}, ${user.address},${user.phone}, ${user.email}, ${user.id}</span>`;
            }
        },
        getTemplateString
    },

    {
        name:  "contactInfoMedium",
        latex:{
            body(data) {
                let user =  new Contact(data);
                return String.raw`\\\\begin{tabular}[t]{@{}p{12cm}@{}}\\n
                ${user.name}
                ${user.address}
                ${user.phone}
                ${user.email}
                \\end{tabular}\n`;
            }
        },
        html: {
            body(data) {
                let user =  new Contact(data).setIsHtml();
                return String.raw`<span class="variable-neu">${user.name}, ${user.address},${user.phone}, ${user.email}, ${user.id}</span>`;
            }
        },
        getTemplateString
    },


    {
        name:  "contactInfoMedium2",
        latex:{
            separator:`\\n`,
            body(data) {
                let user =  new Contact(data);
                return String.raw`\\\\begin{tabular}[t]{@{}p{6.8cm}@{}}\\n'
                ${user.name}
                ${user.address}
                ${user.phone}
                ${user.email}
                \\end{tabular}%\n`;
            }
        },
        html: {
            separator:`<br>`,
            body(data) {
                let user =  new Contact(data).setIsHtml();
                return String.raw`<span class="variable-neu">${user.name}, ${user.address},${user.phone}, ${user.email}, ${user.id}</span>`;
            }
        },
        getTemplateString(data, isHtml) {
            if(_.isUndefined(data.contacts) && !_.isUndefined(data.contact)) { var contacts = [data.contact];};
            if(_.isUndefined(data.shares)) { var shares = [];};
            let to = isHtml ? this.latex : this.html;
            return contacts.map((xc, index) => {
                let x = _.findWhere(shares, {'contactId' : xc.id});
                return to.body(data) + (index && (index % 2) !== 0 ? to.separator : '');
            });
        }
    },
    {
        name:  "contactInfoShares",
        latex:{
            body(data) {
                let user =  new Contact(data);
                return String.raw`\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}\n
                ${user.name}
                ${user.id}
                ${user.share}
                \\end{tabular}\n`;
            }
        },
        html: {
            body(data) {
                let user =  new Contact(data).setIsHtml();
                return String.raw`<span class="contact-info-shares">${user.name}, ${user.address},${user.phone}, ${user.id}, ${user.share}</span>`;
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
            body(data) {
                let user =  new Contact(data);
                return String.raw`\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}\n
                ${user.name}
                ${user.id}
                ${user.share}
                \\end{tabular}\n`;
            }
        },
        html: {
            body(data) {
                let user =  new Contact(data).setIsHtml();
                return String.raw`<span class="variable-neu">${user.name}, ${user.address},${user.phone}, ${user.id}, ${user.share}</span>`;
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
    },
];