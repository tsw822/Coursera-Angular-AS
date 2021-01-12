(function  () {
    'use strict';

    angular.module('ShoppingListCheck',[])
    .controller('ToBuyListController',ToBuyListController)
    .controller('BoughtListController',BoughtListController)
    .service('CheckOffService',CheckOffService)
    // .provider('CheckOffService',CheckOffServiceProvider);

    ToBuyListController.$inject = ['CheckOffService'];
    function ToBuyListController(CheckOffService) {
        var ToBuyListC = this;
        // var ToBuyItems = [];
        // var boughtList = [];
        
        ToBuyListC.itemName = "Apple";
        ToBuyListC.itemQuantity = "1";
        ToBuyListC.items = CheckOffService.getItems();
        ToBuyListC.message = false;

        ToBuyListC.addItem  = function () {
            CheckOffService.addItem(ToBuyListC.itemName,ToBuyListC.itemQuantity);
        }

        ToBuyListC.buyItems = function (itemIndex) {
            CheckOffService.addBoughtItem(itemIndex);
            CheckOffService.removeItem(itemIndex);
            var updatedList = CheckOffService.getItems();
            if (updatedList.length === 0) {
                ToBuyListC.message = true;
            } 
            // console.log(boughtItems);
        }

    }

    BoughtListController.$inject = ['CheckOffService'];
    function BoughtListController(CheckOffService) {
        var BoughtList = this;
        
        BoughtList.items = CheckOffService.boughtItems();
    }

    function CheckOffService() {
        var service = this;
        var items = [];
        var boughtItems = [];
        
        service.addItem = function (itemName, itemQuantity) {
            var item ={
                name : itemName,
                quantity : itemQuantity
            };
            items.push(item);
        }

        service.getItems = function () {
            return items;
        }

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex,1);
            // items.pop();
            // console.log(items.filter(function (item) {return item!=itemIndex}));
            // console.log(items);           
        }

        service.addBoughtItem = function (itemIndex) {
            var boughtItem = items[itemIndex];
            console.log(itemIndex);
            // console.log(boughtItem);
            boughtItems.push(boughtItem);
            console.log(boughtItem);
        }

        service.boughtItems = function () {
            return boughtItems;
        }
    }

    // function CheckOffServiceProvider() {
    //     var provider = this;
    //     provider = function () {
    //         return new CheckOffService();
    //     }
    //     return provider;
    // }
})();