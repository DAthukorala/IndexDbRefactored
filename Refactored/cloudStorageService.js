EMRHTMLTemplates.service("cloudStorageService", cloudStorageService);
cloudStorageService.$inject = ["$localForage"];

function cloudStorageService($localForage) {

    return {
        saveData: saveData
    }

    //extract the specified record from the indexDb and upload it to cloud storage
    function saveData(key) {
        $localForage.getItem(key).then(function (localData) {
            var dataForCloud = convertToCloudModel(localData);
            uploadToCloud(dataForCloud).then(function (response) {
                if (hasValue(response) && response.ResponseID >= 0) {
                    updateIsUploaded(localData);
                }
            });
        });
    }

    //convert the indexDB data object to a cloud storage data object
    function convertToCloudModel(localModel) {
        var cloudModel = {
            EasyFormFieldedDataSavingModel: {
                EasyFormID: localModel.EasyFormID,
                PatientID: localModel.PatientID,
                PatientDataID: localModel.PatientDataID,
                EasyFormTabMode: localModel.EasyFormTabMode,
                EasyFormFormatType: localModel.EasyFormFormatType,
                EasyFormFieldedDataGuidKey: localModel.IframeID,
                EasyFormFieldedDataString: EMRCommonFactory.compressLzString(JSON.stringify(localModel.FieldedData))
            },
            practicemodel: EMRPracticeModel//only assign the required information requred
        };
        return cloudModel;
    }

    //upload data to the cloud
    function uploadToCloud(data) {
        return CommonService.PostData('POST', CommonService.EMRClinicalManagement_HTMLTemplates() + "IndexDBEasyFormFieldedDataInsert", data).then(
            function (result) {
                return result;
            });
    }

    //set the isDataUploadedToServer flag after comparing cloud and local data
    function updateIsUploaded(uploadedData) {
        $localForage.getItem(uploadedData.key).then(function (currentData) {
            var isSame = JSON.stringify(uploadedData) === JSON.stringify(currentData);
            if (isSame) {
                currentData.isDataUploadedToServer = true;
                $localForage.setItem(currentData.key, currentData);
            }
        });
    }
}