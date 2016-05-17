'use strict';
var templates = require('./templateModels');
var variables = require('./variableList.js');



/*
* TODO:window/global should only be used for frontend
*
*/

var variableHandler = {
    //might not need to pass templateName to function, might want to just send all possible templates
    getVariable(variableName, templateName) {
        var variable = _.find(variables, {name:variableName});
        var variableTemplates =_.pluck(templates,variable.templateClass);
        return {variable, templates:variableTemplates}
    }
};

module.exports = variableHandler;