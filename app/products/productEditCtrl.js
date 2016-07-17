/**
 * Created by kevin on 7/14/2016.
 */
(function () {
    "use strict";

    angular.module("productManagement")
        .controller("ProductEditCtrl", ["product","$state", "productService", ProductEditCtrl]);

    function ProductEditCtrl(product,$state,productService) {
        var vm=this;
        vm.product = product;
        if (vm.product && vm.product.productId){
            vm.title = vm.product.productName;
        }else{
            vm.title = "New Product";
        }

        vm.isOpen = false;
        vm.open=function($event){
          $event.preventDefault();
            $event.stopPropagation();

            vm.isOpen = !vm.isOpen;
        };

        vm.submit=function(isValid){
            if(isValid){
                vm.product.$save(function (data) {
                    toastr.success("data successfully saved!");
                });
            }else{
                alert("please enter valid data");
            }
        };

        vm.cancel = function(){
            $state.go("productList");
        };

        vm.addTags= function (tags){
            if(tags){
                var array = tags.split(',');

                vm.product.tags = vm.product.tags? vm.product.tags.concat(array):array;
            } else{
                alert('please enter new tags');
            }
            vm.newTags = "";
        };

        vm.removeTag = function (index){
            vm.product.tags.splice(index,1);
        };

        vm.priceOption="percent";

        vm.marginPercent = function(){
            return productService.calculateMarginPercent(vm.product.price,
                vm.product.cost)
        };

        /* Calculate the price based on a markup */
        vm.calculatePrice = function () {
            var price = 0;

            if (vm.priceOption == 'amount') {
                price = productService.calculatePriceFromMarkupAmount(
                    vm.product.cost, vm.markupAmount);
            }

            if (vm.priceOption == 'percent') {
                price = productService.calculatePriceFromMarkupPercent(
                    vm.product.cost, vm.markupPercent);
            }
            vm.product.price = price;
        };
    }
})();