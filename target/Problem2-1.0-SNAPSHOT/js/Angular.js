var app = angular.module('CarApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
            .when("/home", {
                templateUrl: "view/carlist.html",
                controller: "CarController"
            })
            .when("/newcar", {
                templateUrl: "view/newcar.html",
                controller: "NewEditCarController"
            })
            .when("/newcar/edit/:index", {
                templateUrl: "view/newcar.html",
                controller: "NewEditCarController"
            })
            .otherwise({
                redirectTo: "/home"
            });
});
app.factory('CarId', function () {
    var newid = null;
    var getId = function () {
        return newid;
    };
    var setId = function (id) {
        return newid = id;
    };
});
app.factory('CarFactory', function () {
    var cars = [
        {id: 1, year: 1997, registered: new Date(1999, 3, 15), make: 'Ford', model: 'E350', description: 'ac, abs, moon', price: 3000}
        , {id: 2, year: 1999, registered: new Date(1996, 3, 12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900}
        , {id: 3, year: 2000, registered: new Date(199, 12, 22), make: 'Chevy', model: 'Venture', description: '', price: 5000}
        , {id: 4, year: 1996, registered: new Date(2002, 3, 15), make: 'Jeep', model: 'Grand Cherokee', description: 'Moon roof', price: 4799}]
    var nextId = 5;
    var getCars = function () {
        return cars;
    };
    var deleteCar = function (id) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                cars.splice(i, 1);
                return;
            }
        }
    };
    var addEditCar = function (newcar) {

        if (newcar.id == null) {

            newcar.id = nextId++;
            cars.push(newcar);
        } else {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === newcar.id) {
                    cars[i] = newcar;
                    break;
                }
            }
        }
    };
    return {
        getCars: getCars,
        deleteCar: deleteCar,
        addEditCar: addEditCar
    };
});
app.controller('CarController', function ($scope, $routeParams, CarFactory) {

    $scope.allcars = CarFactory.getCars();

    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.rmCar = function (id) {
        CarFactory.deleteCar(id);
        console.log("dead");
    };

});
app.controller('NewEditCarController', function ($scope, $routeParams, CarFactory) {

    $scope.saveCar = function () {

        var car = {year: $scope.newcar.year, registered: $scope.newcar.registered, make: $scope.newcar.make, model: $scope.newcar.model, description: $scope.newcar.description, price: $scope.newcar.price};

        CarFactory.addEditCar(car);
        console.log(CarFactory.getCars());
    };
    $scope.editCar = function (id) {
        $scope.allcars = CarFactory.getCars();
        for (var i = 0; i < $scope.allcars.length; i++) {
            if ($scope.allcars[i].id == id) {
                $scope.newcar = $scope.allcars[i];
                return;
            }
        }
    };
    if (angular.isDefined($routeParams.index)) {
        console.log($routeParams.index);
        console.log('beh');
        $scope.editCar($routeParams.index);
    }

});