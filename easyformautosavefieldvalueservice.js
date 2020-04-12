'use strict';//Indicating browser should run only in java script mode

EMRHTMLTemplates.service("EasyFormAutoSaveFieldValuesService", ['CommonAutoSaveIndexDBService', 'EasyFormIndexDBModelService', 'CommonService', 'EMRCommonFactory', '$base64', function (CommonAutoSaveIndexDBService, EasyFormIndexDBModelService, CommonService, EMRCommonFactory, $base64) {

    var self = this;
    function InitializeHandler() {
        this._bkpData = {};
    }

    // read data stored in the local indexeddb
    // InitializeHandler.prototype.BindEventsToEasyFormFields = function (iframeID, indexDBInstance, autoSaveDataModelInstance) {

    //     // function to handle the field events
    //     function eventHandler(event) {
    //         if (!hasValue(autoSaveDataModelInstance) || !hasValue(indexDBInstance))
    //             return;
    //         //autoSaveDataModelInstance.UpdateDataInModel(event); //sync the data model with the new changes
    //         //indexDBInstance.InsertDataToIndexDB(autoSaveDataModelInstance._data); // and udate the latest date in the index db
    //         setTimeout(function () {
    //             autoSaveDataModelInstance.UpdateDataInModel(event); //sync the data model with the new changes
    //             indexDBInstance.InsertDataToIndexDB(autoSaveDataModelInstance._data); // and udate the latest date in the index db
    //         }, 400);
    //     }
    //     // emrdivcontent  --- For Div Fields
    //     // emrsignaturetype --- for img signature fields
    //     // for span editable fields --- we are considering the contenteditable true 
    //     angular.element("#" + iframeID).contents().find('select, textarea, input, div .emrdivcontent, span[contenteditable=true], img[emrsignaturetype]').on('keyup change paste focus load', eventHandler);
    // };

    // This method is used to handle cross checking the index db data and previously uploaded data is same or not
    // InitializeHandler.prototype.IsDataChanged = function (oldData, newData) {
    //     return JSON.stringify(newData) !== JSON.stringify(oldData);
    // };

    // This func is responsible for the handling initialization of both indexdb initialization and EasyForm Data model class
    // And bindind the events to easyform fields
    // this.initializeAutoSaveFieldValues = function (EasyFormInfo) {

    //     var initializeHandler = new InitializeHandler();

    //     // get a reference to the index db service
    //     initializeHandler.indexDBInstance = CommonAutoSaveIndexDBService.initializeAutoSaveIndexDBService({
    //         IndexDBDatabaseName: IndexDBDatabaseNames.EHR,
    //         IndexDBObjectStoreName: IndexDBObjectStoreNames.EasyForm_Field_Values_AutoSave,
    //         IndexDBObjectStoreDescription: IndexDBObjectStoreDescriptions.EasyForm_Field_Values_Auto_Save_Desc
    //     });

    //     // initialize model service and data model
    //     initializeHandler.dataModelInstance = EasyFormIndexDBModelService.initializeEasyFormIndexDBModel(EasyFormInfo);

    //     // insert data entry fields info with default values to the index db
    //     initializeHandler.indexDBInstance.InsertDataToIndexDB(initializeHandler.dataModelInstance._data);

    //     // BindEvents to EasyForm Fields controls
    //     // make a function call to bind events
    //     initializeHandler.BindEventsToEasyFormFields(EasyFormInfo.IframeID, initializeHandler.indexDBInstance, initializeHandler.dataModelInstance);

    //     return initializeHandler;
    // };

    // Following func is to uploaded index db data to the database
    // by checking the flag is the current key data is already uploaded or not
    // this.autoUpdateIndexDBDataToDataBase = function (initializeHandler) {

    //     if (!hasValue(initializeHandler) || !hasValue(initializeHandler.indexDBInstance) || !hasValue(initializeHandler.dataModelInstance))
    //         return;

    //     // get data from the local storage
    //     initializeHandler.indexDBInstance.GetDataFromIndexDB(initializeHandler.dataModelInstance._data.key).then(function (responseFromIndexDB) {

    //         //// check if data data has been uploaded to server or not
    //         if (hasValue(responseFromIndexDB) && !responseFromIndexDB.isDataUploadedToServer && hasValue(responseFromIndexDB.FieldedData) && Object.keys(responseFromIndexDB.FieldedData).length > 0) {
    //             var dataToService = {
    //                 EasyFormFieldedDataSavingModel: {
    //                     EasyFormID: responseFromIndexDB.EasyFormID, // EasyForm id   
    //                     PatientID: responseFromIndexDB.PatientID, // Patient id
    //                     PatientDataID: responseFromIndexDB.PatientDataID, // EasyForm Instance ID
    //                     EasyFormTabMode: responseFromIndexDB.EasyFormTabMode, // EasyForm Tab Mode
    //                     EasyFormFormatType: responseFromIndexDB.EasyFormFormatType, // Easyform Format type 1 is ifrmae forms and 2 is div forms
    //                     EasyFormFieldedDataGuidKey: responseFromIndexDB.IframeID,
    //                     EasyFormFieldedDataString: EMRCommonFactory.compressLzString(JSON.stringify(responseFromIndexDB.FieldedData))
    //                     //EasyFormFieldedDataString: $base64.encode(JSON.stringify(responseFromIndexDB.FieldedData))
    //                     //EasyFormFieldedDataString: JSON.stringify(responseFromIndexDB.FieldedData)
    //                 }
    //             };

    //             // save in database server
    //             self.uploadIndexDBDataToDataBase(dataToService).then(function (response) {
    //                 // checking the is data is successfully uploaded or not
    //                 if (hasValue(response) && response.ResponseID >= 0)
    //                     //initializeHandler._bkpData = JSON.stringify(dataToSave.formData);
    //                     self.updateDataUploadedFlagInIndexDB(initializeHandler, responseFromIndexDB);
    //             });
    //         }
    //     });
    // };

    // Following func is to uploaded index db data to the gclod fire store
    // by comparing the bkp data with the latest index db data
    // this.updateDataUploadedFlagInIndexDB = function (initializeHandler, previouslyUploadedData) {
    //     if (!hasValue(initializeHandler) || !hasValue(initializeHandler.dataModelInstance) || !hasValue(initializeHandler.dataModelInstance._data))
    //         return;
    //     // get data from the local storage
    //     initializeHandler.indexDBInstance.GetDataFromIndexDB(initializeHandler.dataModelInstance._data.key).then(function (responseFromIndexDB) {

    //         //// check if data data has been uploaded to server or not
    //         if (hasValue(responseFromIndexDB) && !initializeHandler.IsDataChanged(previouslyUploadedData, responseFromIndexDB)) {
    //             responseFromIndexDB.isDataUploadedToServer = true;
    //             if (!hasValue(initializeHandler))
    //                 return;
    //             initializeHandler.indexDBInstance.InsertDataToIndexDB(responseFromIndexDB);
    //         }
    //     });
    // };

    //############# UPLOAD INDEX DB DATA TO DATA BASE BLOCK START  ##################
    ///*******PURPOSE       : this method is used to upload index db data to database
    ///*******CREATED BY    : Ajay.Nanduri
    ///*******CREATED DATE  : 04-03-2020
    ///*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; *************************
    this.uploadIndexDBDataToDataBase = function (dataToService) {

        dataToService.practicemodel = EMRPracticeModel;

        return CommonService.PostData('POST', CommonService.EMRClinicalManagement_HTMLTemplates() + "IndexDBEasyFormFieldedDataInsert", dataToService).then(
            function (result) {
                return result;
            });
    };
    //############# UPLOAD INDEX DB DATA TO DATA BASE BLOCK END ##################

    //################### GET AUTO SAVED EASY FORMS DATA BLOCK STARTS #############################
    //*******PURPOSE: THIS METHOD IS USED TO GET DYNAMIC QUERY DATA TO AUTO POPULATE
    ///*******CREATED BY: Venkatesh
    ///*******CREATED DATE: 09-03-2020
    //*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    this.GetEasyFromAutoSaveFieldsDataReport = function (postData) {
        //assigning the practice model to the input data
        //this practice model consists of current user login linked practice info
        postData.practicemodel = EMRPracticeModel;
        return CommonService.PostData('POST', CommonService.EMRClinicalManagement_HTMLTemplates() + "GetEasyFormSavedFieldedDataList", postData).then(
            function (result) {
                return result;
            });
    };
    //################### GET AUTO SAVED EASY FORMS DATA BLOCK ENDS #############################

    //################### GET AUTO SAVED EASY FORMS DATA JSON VIEW BLOCK STARTS #############################
    //*******PURPOSE: THIS METHOD IS USED TO GET DYNAMIC QUERY DATA TO AUTO POPULATE
    ///*******CREATED BY: Venkatesh
    ///*******CREATED DATE: 09-03-2020
    //*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    this.GetEasyFromAutoSaveFieldsDataJSONView = function (postData) {
        //assigning the practice model to the input data
        //this practice model consists of current user login linked practice info
        postData.practicemodel = EMRPracticeModel;
        return CommonService.PostData('POST', CommonService.EMRClinicalManagement_HTMLTemplates() + "GettingEasyFormSavedFieldedDataBinary", postData).then(
            function (result) {
                return result;
            });
    };
    //################### GET AUTO SAVED EASY FORMS DATA JSON VIEW BLOCK STARTS #############################

}]);



