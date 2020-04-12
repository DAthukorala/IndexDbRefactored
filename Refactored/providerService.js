//this is the entry point to the solution
//call providerService.initialize() to set up everything

EMRHTMLTemplates.service("providerService", providerService);
providerService.$inject = ["dataModelService", , "$localForage", "cloudStorageService", "$timeout", "$interval"];

function providerService(dataModelService, $localForage, cloudStorageService, $timeout) {

    return {
        initialize: initialize
    };

    function initialize(EasyFormInfo) {
        //create the data model
        var dataModelInstance = dataModelService.initialize(EasyFormInfo);
        //insert the data model to indexDB
        $localForage.setItem(dataModelInstance.key, dataModelInstance);
        //setup auto update of indexDB when data changes in the form
        angular.element("#" + EasyFormInfo.IframeID).contents().find('select, textarea, input, div .emrdivcontent, span[contenteditable=true], img[emrsignaturetype]')
            .on('keyup change paste focus load',
                function () {
                    if (!hasValue(dataModelInstance))
                        return;
                    $timeout(function () {
                        dataModelService.updateModel(dataModelInstance, event);
                        $localForage.setItem(dataModelInstance.key, dataModelInstance);
                    });
                });
        //backup the data in indexDB in cloud every 10 seconds
        $interval(function () {
            cloudStorageService.saveData(dataModelInstance.key);
        }, 10000);
    }
}