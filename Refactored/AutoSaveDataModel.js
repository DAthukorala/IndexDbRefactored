//this is the data model of the indexDb records
function AutoSaveDataModel(EasyFormInfo) {
    this.key = EMRPracticeModel.PracticeID + "_" + EMRPracticeModel.LoggedUserID + "_" + EasyFormInfo.TemplateID + "_" + EasyFormInfo.PatientID + "_" + EasyFormInfo.IframeID; // key
    this.EasyFormID = EasyFormInfo.TemplateID;
    this.PatientID = EasyFormInfo.PatientID;
    this.PatientDataID = EasyFormInfo.PatientDataID; // EasyForm Instance ID
    this.EasyFormTabMode = EasyFormInfo.EasyFormTabMode;
    this.isDataUploadedToServer = false; // flag to indicate the is current key data is already uploaded to server or not
    this.IframeID = EasyFormInfo.IframeID; // ifrmae id which helps us the how many records is currently open easyform having
    this.FieldedData = {};
}