/**
 * Created by kevin on 7/16/2016.
 */
(function () {
    "use strict";

    angular.module("productManagement")
        .controller("ProductDetailCtrl",["product", "productService",ProductDetailCtrl]);

    function ProductDetailCtrl(product, productService){
        var vm = this;
        vm.product = product;
        vm.title = vm.product.productName;

        if(vm.product.tags)
            vm.product.tagList = vm.product.tags.toString();

        vm.marginPercent = productService.calculateMarginPercent (vm.product.price, vm.product.cost);
    }
})();