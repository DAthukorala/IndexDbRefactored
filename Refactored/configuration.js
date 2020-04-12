//use the angularjs service for local forage
//refer https://github.com/scotttrinh/angular-localForage for more details

angular.module('EMRHTMLTemplates', ['LocalForageModule'])
    .config(['$localForageProvider', function ($localForageProvider) {
        //if you need to have multiple data bases, use localforage.createInstance method
        //but any data can be saved in one table in a single data base
        $localForageProvider.config({
            name: IndexDBDatabaseNames.EHR,
            storeName: IndexDBObjectStoreNames.EasyForm_Field_Values_AutoSave,
            description: IndexDBObjectStoreDescriptions.EasyForm_Field_Values_Auto_Save_DescFFD
        });
    }]);