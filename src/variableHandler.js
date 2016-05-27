'use strict';

var templates = require('./templateModels');
var variables = require('./variableList.js');

var variableHandler = {
    //might not need to pass templateName to function, might want to just send all possible templates
    getVariable(variableName, templateName) {
        var variable = _.find(variables, { name: variableName });
        // var variableTemplates = _.pluck(templates, variable.templateClasses);
        var templateClasses = _.pick(templates, variable.templateClasses);
        // get template lass that we need only
        var variableTemplate = _.find(templateClasses, function(templateClass) {
            return _.find(templateClass.getTemplateList(), {name: templateName});
        });
        return { variable: variable, templates: variableTemplate };
    },
    getTemplateList(variableName) {
        var variable = _.find(variables, {name: variableName});
        var templateClasses = _.pick(templates, variable.templateClasses);
        return _(templateClasses).map(function(templateClass) {
            templateClass.getTemplateList();
        }).flatten().value();
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