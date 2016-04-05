function escapeFormatting(s) {
    return (_.isEmpty(s) ? "" : s
            .replace(/<b>/g, "\\textbf{")
            .replace(/<i>/g, "\\textit{")
            .replace(/<u>/g, "\\underline{")
            .replace(/<\/[biu]>/g, "}")
            .replace(/\n/g,"\\newline ")
    )
}


function escapelatex(s) {
    return (_.isEmpty(s) ? "" : s
            .replace(/\\/g, "\\textbackslash@@emptygroup@")
            .replace(/{/g, "\\{")
            .replace(/}/g, "\\}")
            .replace(/&/g, "\\&")
            .replace(/%/g, "\\%")
            .replace(/_/g, "\\_")
            .replace(/"/g, "''")
            .replace(/\footerbreak/g, "\\linebreak ")
            .replace(/~/g, "\\textasciitilde@emptygroup@")
            .replace(/\n\n/g, "\n\\ \\linebreak ")
            //ok, not beautiful, but it adds strength.
            .replace(/@@emptygroup@@/g, "{}")
            .replace(/@@begingroup@@/g, "{")
            .replace(/@@endgroup@@/g, "}")
            .replace(/@@([^@]+)@@/g, "\\$1")
    )
}


function nobreak(s) {
    return s ? '' : s.replace(/ /g, "~");
}

function nobreakHtml(s) {
    return s ? '' : s.replace(/ /g, "&nbsp;");
}


function argEach(arguments, callback) {
    for (let i = 0; i < arguments.length; i++ ) {
        callback(arguments[i], i);
    }
}



let TAG = {
    raw(strings, values) {
        return strings.raw[0];
    },
    nonEmpty(strings, value) {
        if (!value) {
            return ``;
        }
    },
    escapeLatex(strings, values) {
        return template.reduce((accumulator, part, i) => {
            return accumulator + escapelatex(expressions[i - 1]) + part
        });
    },
    empty(string, values) {
        return values ? values + string : '';
    },
};









let htmlTemplates = [
/*    {
        name:  "text",
        "value": "html value"
    },
    {
        name:  "textUpperCase",
        "value": "html value"
    },
    {
        name:  "textLowerCase",
        "value": "html value"
    },
    {
        name:  "year",
        "value": "html value"
    },
    {
        name:  "number",
        "value": "html value"
    },
    {
        name:  "money",
        "value": "html value"
    },
    {
        name:  "date",
        "value": "html value"
    },
    {
        name:  "amount",
        "value": "html value"
    },
    {
        name:  "amountVAT",
        "value": "html value"
    },
    {
        name:  "amountWithoutVAT",
        "value": "html value"
    },
    {
        name:  "amountRightJustified",
        "value": "html value"
    },
    {
        name:  "amountRightJustifiedSEK",
        "value": "html value"
    },
    {
        name:  "amountInBox",
        "value": "html value"
    },
    {
        name:  "amountSpelledOut",
        "value": "html value"
    },
    {
        name:  "contactDateAndSign",
        "value": "html value"
    },
    {
        name:  "spouseConsentSign",
        "value": "html value"
    },
    {
        name:  "consentSign",
        "alias": "spouseConsentSign",
        "value": "html value"
    },
    {
        name:  "contactNameAndSSN",
        "value": "html value"
    },
    {
        name:  "contactInfoFull",
        "value": "html value"
    },
    {
        name:  "contactsInfoFull",
        "alias": "contactInfoFull",
        "value": "html value"
    },
    {
        name:  "groupedContactInfo",
        "value": "html value"
    },
    {
        name:  "contactInfo",
        "value": "html value"
    },
    {
        name:  "contactsInfo",
        "alias": "contactInfo",
        "value": "html value"
    },
    {
        name:  "contactInfoMedium",
        "value": "html value"
    },
    {   name:  "contactsInfoMedium",
        "value": "html value",
        "alias": 'contactInfoMedium'
    },
    {
        name:  "contactInfoMedium2",
        "value": "html value"
    },
    {   name:  "contactsInfoMedium2",
        "value": "html value",
        "alias": 'contactInfoMedium2'
    },
    {
        name:  "contactInfoShares",
        "value": "html value"
    },
    {
        name:  "contactsInfoShares",
        "alias": "contactInfoShares",
        "value": "html value"
    },
    {
        name:  "contactsInfoParts",
        "alias": "contactInfoShares",
        "value": "html value"
    },
    {
        name:  "contactInfoParts",
        "alias": "contactInfoShares",
        "value": "html value"
    },
    {
        name:  "contactInfoShort",
        "value": "html value"
    },
    {
        name:  "contactsInfoShort",
        "alias": "contactInfoShort",
        "value": "html value"
    },
    {
        name:  "contactName",
        "value": "html value"
    },
    {
        name:  "contactsName",
        "alias": "contactName",
        "value": "html value"
    },
    {
        name:  "estateDescription",
        "value": "html value"
    },
    {
        name:  "apartmentDescription",
        "alias": "estateDescription",
        "value": "html value"
    },
    {
        name:  "communicationToken",
        "value": "html value"
    },
    {
        name:  "clacba",
        "value": "html value"
    },
    {
        name:  "easementTypeIsCOMMUNITYFACILITIES",
        "value": "html value"
    },
    {
        name:  "easementTypeIsCOMMUNITYFACILITIESFarming",
        "value": "html value"
    },
    {
        name:  "easementTypeIsNotCOMMUNITYFACILITIES",
        "value": "html value"
    },
    {
        name:  "easementTypeIsNotCOMMUNITYFACILITIESFarming",
        "value": "html value"
    },
    {
        name:  "commission",
        "value": "html value"
    },
    {
        name:  "commissionType",
        "value": "html value"
    },
    {
        name:  "commissionWithoutVAT",
        "value": "html value"
    },
    {
        name:  "faultOrDefectOnEstate",
        "value": "html value"
    },
    {
        name:  "newpage",
        "value": "html value"
    },
    {
        name:  "linebreak",
        "value": "html value"
    },
    {
        name:  "underline",
        "value": "html value"
    },
    {
        name:  "underlineShort",
        "value": "html value"
    },
    {
        name:  "paragraphnumber",
        "value": "html value"
    },
    {
        name:  "mortgageList",
        "value": "html value"
    }*/

{
    name: "contactNameAndSSN",
    template:  "\\underlineWithTextLong[10cm]{Namn och personnummer}\\n"
},
    {
        name: "contactInfoFull", //name, address, phone, email | ssn | share,
        latex: {
            separator:`\\hline \\n`,
            body(data) {
                let person = data.isLegalEntity ? TAG.escapelatex(data.companyName) || '' : (data.isDeceased ? 'Dödsboet efter ' : '') + TAG.escapelatex(data.firstName + ' ' + data.lastName);
                let address = nobreak(escapelatex(data.streetAddress)) + ', ' + (data.postalCode ? nobreak(data.postalCode) + '~' : '') + nobreak(escapelatex(data.city));
                let phone = data.phoneNumber && data.homePhoneNumber ? '' : 'Telefon:~' + (person.phoneNumber || '') + ( data.phoneNumber && data.homePhoneNumber ? ', ' : '' ) + (data.homePhoneNumber || '');
                let email = TAG.nonEmpty`E-post:~${escapelatex(data.email)}`;
                let id = ' & ' + escapelatex(data.identifier);
                let share = ' & ' + (data ? escapelatex(data.share) + '-del' : '');

                return String.raw`\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}
                ${person}
                ${TAG.nonEmpty`\\raggedrigh ${address}`}
                ${phone}
                ${id}
                ${share}
                ${email} \\end{tabular}\n`;
            }
        },
        html: {
            separator:`<br>`,
            body(data) {
                let person = data.isLegalEntity ? data.companyName || '' : (data.isDeceased ? 'Dödsboet efter ' : '') + (data.firstName + ' ' + data.lastName);
                let address = `${noBreakHtml(data.streetAddress)}, ${noBreakHtml(data.postalCode) || ''} ${noBreakHtml(data.city) || ''}`;
                let phone = data.phoneNumber && data.homePhoneNumber ? '' : 'Telefon:' + (data.phoneNumber || '') + ( data.phoneNumber && data.homePhoneNumber ? ', ' : '' ) + (data.homePhoneNumber || '');
                let email = TAG.nonEmpty`E-post:${data.email}`;
                let id = TAG.nonEmpty` & ${data.identifier}`;
                let share = TAG.nonEmpty` & ${data.share}-del`;

                return String.raw`<span class="variable-neu">${person}, ${address},${phone}, ${email}, ${id}, ${share}</span>`;
            }
        },
        getTemplateString(data, isHtml) {
            if(_.isUndefined(data.contacts) && !_.isUndefined(data.contact)) { var contacts = [data.contact];};
            if(_.isUndefined(data.shares)) { var shares = [];};
            let to = isHtml ? this.latex : this.html;
            return _.map(contacts, (xc, index) => {
                let x = _.findWhere(shares, {'contactId' : xc.id});
                return to.body(data) + (contacts.length-1 !== index ? to.separator : '');
            });
        },

        latexTemplate(data) {
            getTemplateString(data);
        },
        htmlTemplate(data) {
            getTemplateString(data, true);
        }
    },
{
    name:  "contactsInfoFull",
    alias:  "contactInfoFull"
},

{
    name:  "groupedContactInfo", //name, address, phone, email | ssn
    template:  `<% \
if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};\
_.each(contacts, function(y) {\
_.each(y, function(xc, i) {\
print('\\\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}\\n'\
print(xc ? (xc.isLegalEntity?escapelatex(xc.companyName):(xc.isDeceased ? 'Dödsboet efter ' : '') + escapelatex(xc.firstName + ' ' + xc.lastName))\
+ (_.isNull(xc.streetAddress) ? '' : '\\n\\\\raggedright ' + nobreak(escapelatex(xc.streetAddress)) + ', ' + (xc.postalCode ? nobreak(xc.postalCode) + '~' : '') + nobreak(escapelatex(xc.city)))\
+ (_.isNull(xc.phoneNumber) ? '' : '\\nTelefon:~' + xc.phoneNumber)\
+ (_.isNull(xc.email) ? '' : '\\nE-post:~' + escapelatex(xc.email))\
+ ' & ' + escapelatex(xc.identifier));\
 if(i == (y.length-1)){\
print('\\\\\\\\ \\\\\\\\ \\\\hline \\n');\
} else {\
print('\\n');\
}\
 print('\\\\end{tabular} ')});});\
%>`,

    latex: {

        body(data) {
        }
    },
    html: {

        body(data) {

        }
    },
    getTemplateString(data, isHtml) {
    },

},

{
    name:  "contactInfo", //name, address, phone, email | ssn
    template:  `<% \
if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};\
_.each(contacts, function(xc) {\
print('\\\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}\\n'\
print(xc ? (xc.isLegalEntity?escapelatex(xc.companyName):(xc.isDeceased ? 'Dödsboet efter ' : '') + escapelatex(xc.firstName + ' ' + xc.lastName))\
+ (_.isNull(xc.streetAddress) ? '' : '\\n\\\\raggedright ' + nobreak(escapelatex(xc.streetAddress)) + ', ' + (xc.postalCode ? nobreak(xc.postalCode) + '~' : '') + nobreak(escapelatex(xc.city)))\
+ (_.isNull(xc.phoneNumber) && _.isNull(xc.homePhoneNumber) ? '' : '\\nTelefon:~' +  (xc.phoneNumber || '') +  ( xc.phoneNumber && xc.homePhoneNumber ? ', ': '' )  + (xc.homePhoneNumber || ''))\
+ (_.isNull(xc.email) ? '' : '\\nE-post:~' + escapelatex(xc.email))\
+ ' & ' + escapelatex(xc.identifier) + '\\\\end{tabular} ')});\
%>`,

    latex: {
        body(data) {
            let person = data.isLegalEntity ? escapelatex(data.companyName):(data.isDeceased ? 'Dödsboet efter ' : '') + escapelatex(data.firstName + ' ' + data.lastName);
            let address = TAG.nonEmpty`\\n\\\\raggedright ${nobreak(escapelatex(data.streetAddress))}, ` + TAG.nonEmpty`${nobreak(data.postalCode)}~` + nobreak(escapelatex(data.city));
            let phone = data.phoneNumber && data.homePhoneNumber ? '' : 'Telefon:~' + (person.phoneNumber || '') + ( data.phoneNumber && data.homePhoneNumber ? ', ' : '' ) + (data.homePhoneNumber || '');
            let email = TAG.nonEmpty`E-post:~${escapelatex(data.email)}`;
            let id = ' & ' + escapelatex(data.identifier);

            return String.raw`\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}
                ${person}
                ${address}
                ${phone}
                ${email}
                ${id}
                \\end{tabular}\n`;
        }
    },
    html: {
        body(data) {
            let person = data.isLegalEntity ? data.companyName || '' : (data.isDeceased ? 'Dödsboet efter ' : '') + (data.firstName + ' ' + data.lastName);
            let address = `${noBreakHtml(data.streetAddress)}, ${noBreakHtml(data.postalCode) || ''} ${noBreakHtml(data.city) || ''}`;
            let phone = data.phoneNumber && data.homePhoneNumber ? '' : 'Telefon:' + (data.phoneNumber || '') + ( data.phoneNumber && data.homePhoneNumber ? ', ' : '' ) + (data.homePhoneNumber || '');
            let email = TAG.nonEmpty`E-post:${data.email}`;
            let id = TAG.nonEmpty` & ${data.identifier}`;

            return String.raw`<span class="variable-neu">${person}, ${address},${phone}, ${email}, ${id}</span>`;
        }
    },
    getTemplateString(contacts, isHtml) {
        let to = isHtml ? this.latex : this.html;
        if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};
        _.each(contacts, function(contact) {
            to.body(contact);
        });
    },
},
{
    name:  "contactsInfo",
    alias:  "contactInfo"
},


{
    name:  "contactInfoMedium", //name, address, phone, email
    template:  `<% \
if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};\
_.each(contacts, function(xc){\
print('\\\\begin{tabular}[t]{@{}p{12cm}@{}}\\n');\
print(xc ? (xc.isLegalEntity?escapelatex(xc.companyName):(xc.isDeceased ? 'Dödsboet efter ' : '') + escapelatex(xc.firstName + ' ' + xc.lastName))\
+ (_.isNull(xc.streetAddress) ? '' : '\\n\\\\raggedright ' + nobreak(escapelatex(xc.streetAddress)) + ', ' + (xc.postalCode ? nobreak(xc.postalCode) + '~' : '') + nobreak(escapelatex(xc.city)))\
+ (_.isNull(xc.phoneNumber) && _.isNull(xc.homePhoneNumber) ? '' : '\\nTelefon:~' +  (xc.phoneNumber || '') +  ( xc.phoneNumber && xc.homePhoneNumber ? ', ': '' )  + (xc.homePhoneNumber || ''))\
+ (_.isNull(xc.email) ? '' : '\\nE-post:~' + escapelatex(xc.email)):'');\
print('\\\\end{tabular}\\n');\
});\
%>`
},
{
    name:  "contactsInfoMedium",
    alias:  'contactInfoMedium'
},


{
    name:  "contactInfoMedium2", //name, address, phone, email : two side by side
    template:  `<% \
if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};\
_.each(contacts, function(xc, index){\
print('\\\\begin{tabular}[t]{@{}p{6.8cm}@{}}\\n');\
print(xc ? (xc.isLegalEntity?escapelatex(xc.companyName):(xc.isDeceased ? 'Dödsboet efter ' : '') + escapelatex(xc.firstName + ' ' + xc.lastName))\
+ (_.isNull(xc.streetAddress) ? '' : '\\n\\\\raggedright ' + nobreak(escapelatex(xc.streetAddress)) + ', ' + (xc.postalCode ? nobreak(xc.postalCode) + '~' : '') + nobreak(escapelatex(xc.city)))\
+ (_.isNull(xc.phoneNumber) && _.isNull(xc.homePhoneNumber) ? '' : '\\nTelefon:~' +  (xc.phoneNumber || '') +  ( xc.phoneNumber && xc.homePhoneNumber ? ', ': '' )  + (xc.homePhoneNumber || ''))\
+ (_.isNull(xc.email) ? '' : '\\nE-post:~' + escapelatex(xc.email)):'');\
print('\\\\end{tabular}%\\n');\
index && (index % 2) !== 0 && print('\\n');\
});\
%>`
},
{
    name:  "contactsInfoMedium2",
    alias:  'contactInfoMedium2'
},


{
    name:  "contactInfoShares", //name, ssn, share
    template:  `<% \
if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};\
if(_.isUndefined(shares)) { var shares = [];};\
_.each(contacts, function(xc){\
print('\\\\begin{tabular}[t]{@{}p{7cm} p{3cm} p{2cm}@{}}\\n');\
var x = _.findWhere(shares, {'contactId' : xc.id});\
print(xc ? (xc.isLegalEntity?escapelatex(xc.companyName):((xc.isDeceased ? 'Dödsboet efter ' : '') + escapelatex(xc.firstName + ' ' + xc.lastName)))\
+ ' & ' + escapelatex(xc.identifier)\
+ ' & ' + (x?escapelatex(x.share) + '-del\\\\\\\\ ':'') : '');\
print('\\\\end{tabular}\\n');\
});\
%>`
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
    name:  "contactInfoShort", //name, ssn
    template:  `<% \
if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};\
_.each(contacts, function(xc){\
print('\\\\begin{tabular}[t]{@{}p{9cm} p{3cm}@{}}\\n');\
print(xc ? (xc.isLegalEntity?escapelatex(xc.companyName):(xc.isDeceased ? 'Dödsboet efter ' : '') + escapelatex(xc.firstName + ' ' + xc.lastName))\
+ ' & ' + escapelatex(xc.identifier) + ' \\\\\\\\ ':'');\
print('\\\\end{tabular}\\n');\
});\
%>`
},
{
    name:  "contactsInfoShort",
    alias:  "contactInfoShort"
},

{
    name:  "contactName", //name
    template:  `<%\
if(_.isUndefined(contacts) && !_.isUndefined(contact)) { var contacts = [contact];};\
 _.each(contacts, function(x) {if(x){print((x.isLegalEntity?escapelatex(x.companyName): (x.isDeceased ? 'Dödsboet efter ' : '') + escapelatex(x.firstName + ' ' + x.lastName)) + '\\n');} else {print('Saknas');};});\
%>`
},
{
    name:  "contactsName",
    alias:  "contactName"
},

//------------------------------------------------------------
{
    name:  "apartmentDescription",
    alias:  "estateDescription"
},

{
    name:  "clacba",
    template:  `<% if (!_.isUndefined(account) && !_.isNull(account)) {print(account.bank + ' ' + (account.clearingNumber?(account.clearingNumber + ' - '):'') + account.accountNumber)} else {print('\\\\xdash')} %>`
},

//@@@ description ska med, kolla med Elina vad som ska in!
{
    name:  "easementTypeIsCOMMUNITYFACILITIES",
    template:  `<% var filteredE=_.where(easements, {'easementType': 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES'}).concat(_.where(easements, {'easementType': 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY'}));\
if (!_.isEmpty(filteredE)) {print(_.reduce(filteredE, function(acc, x) {var eId=x.logEntryId; var d=escapelatex(x.description); return acc + (_.isNull(eId) || eId == ''?d:eId + (_.isNull(d)?'':' ('+d+')')) + '\\n'}, '\\\\vbox{\\n}\\nfastigheten har del i följande samfälligheter eller gemensamhetsanläggningar:\\n').slice(0, -1));} %>`
},

{
    name:  "easementTypeIsCOMMUNITYFACILITIESFarming",
    template:  `<% var filteredE=_.where(easements, {'easementType': 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES'}).concat(_.where(easements, {'easementType': 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY'}));\
if (!_.isEmpty(filteredE)) {print(_.reduce(filteredE, function(acc, x) {var eId=x.logEntryId; var d=escapelatex(x.description); return acc + (_.isNull(eId) || eId == ''?d:eId + (_.isNull(d)?'':' ('+d+')')) + '\\n'}, '\\\\vbox{\\n}\\nområdet har del i följande samfälligheter eller gemensamhetsanläggningar:\\n').slice(0, -1));} %>`
},

//if (!_.isEmpty(filteredE)) {print(_.reduce(filteredE, function(acc, x) {return acc + x.externalId + ', '}, '').slice(0, -2));}
{
    name:  "easementTypeIsNotCOMMUNITYFACILITIES",
    template:  `<% var filteredE=_.reject(easements, function(x){return x.easementType == 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES' || x.easementType == 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY';});\
if (!_.isEmpty(filteredE)) {print(_.reduce(filteredE, function(acc, x) {var eId=x.logEntryId; var d=escapelatex(x.description); return acc + (_.isNull(eId) || eId == ''?d:eId + (_.isNull(d)?'':' ('+d+')')) + '\\n'}, 'fastigheten endast belastas eller har förmån av följande servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar:\\n').slice(0, -1));} else {print('fastigheten inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.')} %>`
},

{name:  "easementTypeIsNotCOMMUNITYFACILITIESFarming",
    template:  `<% var filteredE=_.reject(easements, function(x){return x.easementType == 'ENUMS_EASEMENTTYPE_COMMUNITYFACILITIES' || x.easementType == 'ENUMS_EASEMENTTYPE_JOINT_PROPERTY';});\
if (!_.isEmpty(filteredE)) {print(_.reduce(filteredE, function(acc, x) {var eId=x.logEntryId; var d=escapelatex(x.description); return acc + (_.isNull(eId) || eId == ''?d:eId + (_.isNull(d)?'':' ('+d+')')) + '\\n'}, 'området endast belastas eller har förmån av följande servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar:\\n').slice(0, -1));} else {print('området inte belastas av servitut, nyttjanderätter, ledningsrätter, utmätnings- eller kvarstadsanteckningar.')} %>`
},


{name:  "commissionWithoutVAT",
    template:  `<%\
var formatMoney = function(x) {return formatAmount(x) + '~' + currency};\
var formatPercentage = function(x) {return (Math.floor((x || 0) * 100) / 100) +'\\\\%';};\
var intervals = commission.commissionIntervals;\
if(commission.commissionType == 'ENUM_COMMISSION_TYPE_FIXED_PRICE') {\
  print('Arvode kommer att utgå med ' + formatMoney(commission.commissionSum) + '\\n\\n');\
  print('Arvodet är ' + (commission.isSoldWithoutVAT ? 'momsbefriat.' : 'exklusive moms.') + '\\n\\n');\
  print('Arvodet kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.\\n');\
} else {\
if(commission.commissionType == 'ENUM_COMMISSION_TYPE_MIXED') {\
  print('Arvode kommer att utgå med ' + formatMoney(commission.commissionBaseFee) + '. Därutöver kommer provision utgå ');\
} else {\
  print('Provision ska utgå ');\
};\
var noLowerBound = function(x) {return (_.isUndefined(x) || _.isNull(x.lowerBound) || x.lowerBound == 0);};\
if(intervals && intervals.length == 0) {\
  print('med \\\\xdash[103mm]{}');\
} else if(intervals && intervals.length <= 1 && noLowerBound(intervals[0])) {\
  print('med ' + formatPercentage(intervals[0].percentage * 100 /(divisor * 100) ) + ' av köpeskillingen.\\n');\
} else if(intervals) {\
print('enligt stege\\n');\
var x = intervals[0];\
j = 0;\
if(noLowerBound(x) || x.lowerBound == 0) {\
  print('\\\\makebox[15mm][r]{' + formatPercentage(100 * x.percentage/(divisor * 100) ) + '} för köpeskilling i intervallet upp till ' + formatMoney(x.upperBound) + '\\n');\
  j=1;\
};\
_.each(intervals.slice(j,-1), function(x){print('\\\\makebox[15mm][r]{' + formatPercentage(100 * x.percentage/(divisor * 100)) + '} för köpeskilling i intervallet ' + formatMoney(x.lowerBound) + '--' + formatMoney(x.upperBound) + '\\n');});\
x = intervals[intervals.length-1]; print('\\\\makebox[15mm][r]{' + formatPercentage(100 * x.percentage/(divisor * 100)) + '} för köpeskilling i intervallet ' + formatMoney(x.lowerBound) + ' och däröver.\\n');\
} else {print('med \\\\xdash[103mm]{}');};\
commission.commissionType !== 'ENUM_COMMISSION_TYPE_MIXED' && commission.minimumCommissionFee && print('Provision ');\
if(commission.minimumCommissionFee) {print(' lägst med ' + formatMoney(commission.minimumCommissionFee));};\
if(commission.maximumCommissionFee) {print((commission.minimumCommissionFee?' och': '') + ' högst med ' + formatMoney(commission.maximumCommissionFee));};\
(commission.maximumCommissionFee || commission.minimumCommissionFee) && print('.\\n\\n');\
print((commission.commissionType == 'ENUM_COMMISSION_TYPE_MIXED'?'Arvodet och provisionen':'Provisionen') + ' enligt ovan är ' + (commission.isSoldWithoutVAT ? 'momsbefriat' : 'exklusive moms.') + '\\n\\n');\
print((commission.commissionType == 'ENUM_COMMISSION_TYPE_MIXED'?'Arvodet och provisionen':'Provisionen') + ' kan överlåtas på juridisk person under vilken fastighetsmäklaren arbetar.\\n\\n');\
}\
%>`
},


// {name:  "newpage",
//  template:  "}}\n\\colchunk[2]{}\n\\end{parcolumns}\n\\newpage\\begin{parcolumns}[sloppy,nofirstindent,colwidths={1=4cm}]{2}\n\\colchunk[1]{\\bfseries{"},

{name:  "newpage",
    template:  "\\newpage "},

{name:  "linebreak",
    template:  "\\ \\linebreak "},

{name:  "underline",
    template:  "\\hrulefill "},

{name:  "underlineShort",
    template:  "\\xdash[55mm] "},

{name:  "paragraphnumber",
    template:  "{\\itempar} "},

{name:  "totalArea",
    template:  `<% _.isNumber(plotArea) && print('Land:~' + plotArea + 'kvm\\\\hspace{7mm}');
_.isNumber(waterArea) && print('Vatten:~' + waterArea + 'kvm\\\\hspace{7mm}');
_.isNumber(totalArea) && print('Totalt:~' + totalArea + 'kvm\\\\hspace{7mm}'); %>`},

{name:  "mortgageList",
    template:  `<% " +
 if(mortgages.length) {" +
 print('\\\\begin{tabular}{ l c r k }');" +
_.each(mortgages, function(mortgage, index){ " +
print(index + 1 + ' & ');" +
print((mortgage.logEntryId || '\\\\rule[0.5ex]{3em}{0.55pt}') + ' & ');" +
print((mortgage.registrationDate ? formatDate(mortgage.registrationDate):'\\\\rule[0.5ex]{3em}{0.55pt}') + ' & ');" +
print((formatAmount(mortgage.amount) || '\\\\rule[0.5ex]{3em}{0.55pt}') + ' & ');" +
});
print('\\\\hline \\n');
print('SUM: &  &  &' + formatAmount(totalMortgageAmount) + ' & ');
print('\\\\end{tabular}');
}
%>`
}];


