'use strict';
var templates = require('./templateModels');
var variables = require('./variableList.js');

var variableHandler = {
    //might not need to pass templateName to function, might want to just send all possible templates
    getVariable(variableName, templateName) {
        var variable = _.find(variables, {name:variableName});
        var variableTemplates =_.pluck(templates,variable.templateClass);
        return {variable, templates:variableTemplates}
    },

    getVariablePath(variableName) {
        var variable = _.find(variables, {name:variableName});
        return variable ? variable.dependencies : null;
    },

    getVariableDependencies(variableName) {
        var variable = _.find(variables, {name:variableName});
        return variable ? variable.dependencies : null;
    }

};

module.exports = variableHandler;