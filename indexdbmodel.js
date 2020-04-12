
//replaced by autosave date model and autosave data model service


// 'use strict';//Indicating browser should run only in java script mode

// //*******PURPOSE        : This service holds the Data Functions of the EasyForm Index db Model service
// //*******CREATED BY     : Ajay.Nanduri
// //*******CREATED DATE   : 03-03-2020
// //*******MODIFIED DEVELOPER: DATE - NAME - WHAT IS MODIFIED; xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// EMRHTMLTemplates.service('EasyFormIndexDBModelService', function () {

//     // var self = this;

//     /**
//     * @type {Object} 
//     * this func object will hold the current index db connec key info with data
//     */
//     function autoSaveDataModelHandler(EasyFormInfo) {
//         // var self = this;
//         this._data = {};

//         this._data = {
//             key: EMRPracticeModel.PracticeID + "_" + EMRPracticeModel.LoggedUserID + "_" + EasyFormInfo.TemplateID + "_" + EasyFormInfo.PatientID + "_" + EasyFormInfo.IframeID, // key
//             EasyFormID: EasyFormInfo.TemplateID, // EasyForm id   
//             PatientID: EasyFormInfo.PatientID, // Patient id
//             PatientDataID: EasyFormInfo.PatientDataID, // EasyForm Instance ID
//             EasyFormTabMode: EasyFormInfo.EasyFormTabMode, // EasyForm Tab Mode
//             //EasyFormFormatType: EasyFormInfo.HTMLTemplateFormatType, // Easyform Format type 1 is ifrmae forms and 2 is div forms
//             isDataUploadedToServer: false, // flag to indicate the is current key data is already uploaded to server or not
//             IframeID: EasyFormInfo.IframeID, // ifrmae id which helps us the how many records is currently open easyform having
//             FieldedData: {} // Fielded Data     
//         };
//     }

//     // update the data of the current field event in the data model
//     // this will invoked whtn the data is changed in the form fields
//     autoSaveDataModelHandler.prototype.UpdateDataInModel = function (event) {

//         if (hasValue(event) && event.target) {

//             var element = angular.element(event.target) ? angular.element(event.target)[0] : undefined;

//             if (hasValue(element)) {
//                 // checking the current element id patient name or dob field then no need capture that one 
//                 // for the security reasons no need to save in index db
//                 if (hasValue(element.id)
//                     && (element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "taname"
//                         || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tapatient"
//                         || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tapatient_name"
//                         || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "txtptname"
//                         || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tadob"
//                         || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tapatientdob")) return;
                       
//                 //var fieldName = hasValue(element.getAttribute("displayname")) ? element.getAttribute("displayname").removeEhrGuidKeyFromString() : element.id.removeEhrGuidKeyFromString();
//                 var fieldName = hasValue(element.getAttribute("displayname")) ? element.getAttribute("displayname").removeEhrGuidKeyFromString() + "^" + element.id.removeEhrGuidKeyFromString() : element.id.removeEhrGuidKeyFromString();
//                 this._data.FieldedData[fieldName] = getFieldValueFromHTMLElement(element);
//                 this._data.isDataUploadedToServer = false;
//             }

//         }
//     };

//     // this func will initializes  or ot build model objetc to hold the currently loaded easyform fields info
//     this.initializeEasyFormIndexDBModel = function (EasyFormInfo) {

//         // creating the instance to the custom data model
//         var _initializeDataModel = new autoSaveDataModelHandler(EasyFormInfo);

//         // once the data model is initlized then then make a call to collect the all the easyform fields to datamodel instance objetc
//         this.assignAllFormFieldsToDataModel(_initializeDataModel, EasyFormInfo);

//         // finaly return the data model instance object to the parent func
//         return _initializeDataModel;
//     };

//     // this func will get all the easyform field details and assign it to the datamodel instance
//     this.assignAllFormFieldsToDataModel = function (_initializeDataModel, EasyFormInfo) {
//         // getting the all easyform fields which are having the following selectors
//         // select, textarea, input, div .emrdivcontent, span[contenteditable=true], img[emrsignaturetype]
//         var formLevelDataFieldsList = angular.element("#" + EasyFormInfo.IframeID).contents().find("select, textarea, input, div .emrdivcontent, span[contenteditable=true], img[emrsignaturetype]");

//         // if the any fields with those controls then assigning to the datamodel instance obejct
//         // iterating through each div field and assigning data in it
//         formLevelDataFieldsList.each(function (index, element) {
//             // checking the current element id patient name or dob field then no need capture that one 
//             // for the security reasons no need to save in index db
//             if (hasValue(element.id)
//                 && (element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "taname"
//                     || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tapatient"
//                     || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tapatient_name"
//                     || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "txtptname"
//                     || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tadob"
//                     || element.id.removeEhrGuidKeyFromString().toLocaleLowerCase() == "tapatientdob")) return;

//             // _initializeDataModel._data[angular.element(element).attr('id').removeEhrGuidKeyFromString()] = "";
//             //var fieldName = hasValue(element.getAttribute("displayname")) ? element.getAttribute("displayname").removeEhrGuidKeyFromString() : element.id.removeEhrGuidKeyFromString();
//             var fieldName = hasValue(element.getAttribute("displayname")) ? element.getAttribute("displayname").removeEhrGuidKeyFromString() + "^" + element.id.removeEhrGuidKeyFromString() : element.id.removeEhrGuidKeyFromString();
//             _initializeDataModel._data.FieldedData[fieldName] = getFieldValueFromHTMLElement(element);
//         });
//     };

// });
