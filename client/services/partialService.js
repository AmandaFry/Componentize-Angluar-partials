var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'partials/customizeUsers.html',
            controller: "CustomizeUsersController"
        })
        .when('/list_users',{
            templateUrl: 'partials/userList.html',
            controller: "UserListsController"
        })
        .otherwise({
            redirectTo: '/'
        })
});

myApp.factory('UserFactory', function(){
    var users = [
        {first_name:"Yikihiro", last_name:"Matsumoto", lang:"Ruby"},
        {first_name:"Ryan", last_name:"Dahl", lang:"JavaScript"},
        {first_name:"Brendan", last_name:"Eich", lang:"JavaScript"},
    ];

    var factory = {};

    factory.getUsers = function(callback){callback(users)};

    factory.addUser = function(newUser){
        users.push(newUser);
    }

    factory.deleteUser = function(user){
        users.splice(users.indexOf(user),1);
    }

    return factory;
});

myApp.controller('CustomizeUsersController', function($scope,UserFactory){
    $scope.users = [];
    UserFactory.getUsers(function(data){
        $scope.users = data;
    });

    $scope.addUser = function(){
        UserFactory.addUser($scope.newUser)
        $scope.newUser = {};
    }

    $scope.deleteUser = function(user){
        UserFactory.deleteUser(user);
    }
});

myApp.controller('UserListsController', function($scope,UserFactory){
    $scope.users = [];
    UserFactory.getUsers(function(data){
        $scope.users = data;
    })
});

