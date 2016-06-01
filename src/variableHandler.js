'use strict';

var templates = require('./templateModels');
var variables = require('./variableList.js');

//var _ = require('lodash');

var variableHandler = {
    //might not need to pass templateName to function, might want to just send all possible templates
    //getVariable(variableName, templateName) {
    //    var variable = _.find(variables, { name: variableName });
    //    // var variableTemplates = _.pluck(templates, variable.templateClasses);
    //    var templateClasses = _.pick(templates, variable.templateClasses);
    //    // get template lass that we need only
    //    var variableTemplate = _.find(templateClasses, function(templateClass) {
    //        return _.find(templateClass.getTemplateList(), {name: templateName});
    //    });
    //    return { variable: variable, templates: variableTemplate };
    //},
    //getTemplate(variableName, templateName) {
    //    var variable = _.find(variables, { name: variableName });
    //    // var variableTemplates = _.pluck(templates, variable.templateClasses);
    //    var templateClasses = _.pick(templates, variable.templateClasses);
    //    // get template that we need only
    //    return _.find(templateClasses, function(templateClass) {
    //        return _.find(templateClass.getTemplateList(), {name: templateName});
    //    });
    //},
    getHtmlTemplate(variableName, templateName, data) {
        var variable = _.find(variables, { name: variableName });
        // var variableTemplates = _.pluck(templates, variable.templateClasses);
        var templateClasses = _.pick(templates, variable.templateClasses);
        // get template that we need only
        var templateClass = _.find(templateClasses, function(templateClass) {
            return _.find(templateClass.getTemplateList(), {name: templateName});
        });

        return templateClass.getTemplateString(data, templateName, true);
    },
    getTemplateClasses(variableName) {
        var variable = _.find(variables, { name: variableName });
        // var variableTemplates = _.pluck(templates, variable.templateClasses);
        if (!variable) return;
        return _.pick(templates, variable.templateClasses);
    },
    getActiveTemplate(variableName, templateName) {
        var variable = _.find(variables, { name: variableName });
        // var variableTemplates = _.pluck(templates, variable.templateClasses);
        if (!variable) return;
        var templateClasses = _.pick(templates, variable.templateClasses);
        return _.find(templateClasses, function(templateClass) {
            return _.find(templateClass.getTemplateList(), {name: templateName});
        });
    },
    getTemplateList(variableName) {
        var variable = _.find(variables, {name: variableName});
        var templateClasses = _.pick(templates, variable.templateClasses);
        return _(templateClasses).map(function(templateClass) {
            return templateClass.getTemplateList();
        }).flatten().value();
    },
    getVariableDependencies(variableName) {
        var variable = _.find(variables, {name:variableName});
        return variable ? variable.dependencies : null;
    }

};

module.exports = variableHandler;