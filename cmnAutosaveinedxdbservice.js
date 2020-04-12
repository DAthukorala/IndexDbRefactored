//replaced by index deb service

// EMRAdmin.service("CommonAutoSaveIndexDBService", function () {

    /**
     * @type {function Object} 
     * this func object will hold the index db connection info
     * like db name ex : EHR and ObjectStoreName : PracticeID_LoggedUserID_TemplateID_PatiendID
     * handleds the indexdb get and set methods
     */
    // function indexDBHandler(ConnectionObject) {

    //     this._IndexDBDatabaseName = ConnectionObject.IndexDBDatabaseName;
    //     this._IndexDBObjectStoreName = ConnectionObject.IndexDBObjectStoreName;
    //     this._IndexDBObjectStoreDesc = ConnectionObject.IndexDBObjectStoreDescription;

    //     // initialized local indexeddb instance 
    //     localforage.config({
    //         driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE], //set the fall back strategy
    //         name: this._IndexDBDatabaseName,
    //         storeName: this._IndexDBObjectStoreName,
    //         description: this._IndexDBObjectStoreDesc
    //     });
    // }

    // this function is used to set the data tot insert db based key
    // like 999_6_1_1 : {jd:"dsdsd",dj:"sdsdsd"}
    // indexDBHandler.prototype.InsertDataToIndexDB = function (dataObject) {
    //     // there will always be a copy of the current data snapshot in the indexeddb
    //     return localforage.setItem(dataObject.key, dataObject);
    // };

    // // this function is used to read data from local indexeddb
    // indexDBHandler.prototype.GetDataFromIndexDB = function (key) {
    //     return localforage.getItem(key).then(function (savedData) {
    //         return savedData;
    //     });
    // };

    // // this function is used to read data from local indexeddb
    // indexDBHandler.prototype.RemoveKeyFromIndexDB = function (key) {
    //     return localforage.removeItem(key);
    // };

    //the persistenceService is responsible for managing all data saving tasks
    //both local and cloud
    //the service will watch for changes in inputs and trigger updates to the data model using modelService
    //it will persist those input changes in the local indexeddb as it happens 
    //it will also save data to the cloud in a set interval using backupService
    // this.initializeAutoSaveIndexDBService = function (ConnectionObject) {
    //     return new indexDBHandler(ConnectionObject);
    // };

    //the persistenceService is responsible for managing all data saving tasks
    //both local and cloud
    //the service will watch for changes in inputs and trigger updates to the data model using modelService
    //it will persist those input changes in the local indexeddb as it happens 
    //it will also save data to the cloud in a set interval using backupService
    // this.removeContentsFromIndexDBService = function (ConnectionObject) {

    //     // getting the index db conntion object
    //     var indexDBInsatnce = new indexDBHandler(ConnectionObject);

    //     if (!hasValue(indexDBInsatnce)) return false;

    //     localforage.clear();

    // };

// });







