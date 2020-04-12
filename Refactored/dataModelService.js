EMRHTMLTemplates.service("dataModelService", dataModelService);
dataModelService.$inject = [];

function dataModelService() {
    return {
        initialize: initialize,
        updateModel: updateModel
    };

    //create a new data model instance and add data to it
    function initialize(EasyFormInfo) {
        var model = new AutoSaveDataModel(EasyFormInfo);
        var formLevelDataFieldsList = angular.element("#" + EasyFormInfo.IframeID).contents().find("select, textarea, input, div .emrdivcontent, span[contenteditable=true], img[emrsignaturetype]");
        formLevelDataFieldsList.each(function (index, element) {
            if (!(hasValue(element.id) && isExcludedField(element))) {
                populateModelField(model, element);
            }
        });
        return model;
    }

    //update provided data model instance with latest data from the form
    function updateModel(model, event) {
        if (hasValue(event) && event.target) {
            var element = angular.element(event.target) ? angular.element(event.target)[0] : undefined;
            if (!(hasValue(element) && isExcludedField(element))) {
                populateModelField(model, element);
                model.isDataUploadedToServer = false;
            }
        }
    }

    //check to see if the element need to be saved
    function isExcludedField(element) {
        var isExcluded = element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "taname"
            || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tapatient"
            || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tapatient_name"
            || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "txtptname"
            || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tadob"
            || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tapatientdob"
        return isExcluded;
    }
    
    //extract field value from the form and assign it to the data model field
    function populateModelField(model, element) {
        var fieldName = hasValue(element.getAttribute("displayname")) ? element.getAttribute("displayname").removeEhrGuidKeyFromString() + "^" + element.id.removeEhrGuidKeyFromString() : element.id.removeEhrGuidKeyFromString();
        model.FieldedData[fieldName] = getFieldValueFromHTMLElement(element);
    }

}