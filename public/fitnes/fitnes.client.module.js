angular.module('fitnes', ['ngRoute','ngSanitize','ngAnimate','mediaPlayer','ui.bootstrap','LocalStorageModule',
    'WorkoutBuilder','ngMessages']);
angular.module('fitnes').config(['$routeProvider','$sceDelegateProvider',
	function ($routeProvider,$sceDelegateProvider) {
	$routeProvider.when('/start', {
		templateUrl: 'fitnes/views/start.html'
	}).when('/fitness', {
		templateUrl: 'fitnes/views/fitness.html',
		controller: 'FitnesController'
	}).when('/finish', {
		templateUrl: 'fitnes/views/finish.html'
	}).when('/builder', {
        redirectTo: '/builder/workouts'
    }).when('/builder/workouts', {
        templateUrl: 'fitnes/views/workoutbuilder/workouts.html',
        leftNav: 'fitnes/views/workoutbuilder/left-nav-main.html',
        topNav: 'fitnes/views/workoutbuilder/top-nav.html',
        controller: 'WorkoutListController'
    }).when('/builder/exercises', {
        templateUrl: 'fitnes/views/workoutbuilder/exercises.html',
        leftNav: 'fitnes/views/workoutbuilder/left-nav-main.html',
        topNav: 'fitnes/views/workoutbuilder/top-nav.html',
        controller: 'ExerciseListController'
    }).when('/builder/workouts/new', {
        templateUrl: 'fitnes/views/workoutbuilder/workout.html',
        leftNav: 'fitnes/views/workoutbuilder/left-nav-exercises.html',
        topNav: 'fitnes/views/workoutbuilder/top-nav.html',
        controller: 'WorkoutDetailController',
        resolve: {
            selectedWorkout: ['WorkoutBuilderService', function (WorkoutBuilderService) {
                return WorkoutBuilderService.startBuilding();
            }]
        }
    }).when('/builder/workouts/:id', {
        templateUrl: 'fitnes/views/workoutbuilder/workout.html',
        leftNav: 'fitnes/views/workoutbuilder/left-nav-exercises.html',
        topNav: 'fitnes/views/workoutbuilder/top-nav.html',
        controller: 'WorkoutDetailController',
        resolve: {
            selectedWorkout: ['WorkoutBuilderService', '$route','$location',
            function (WorkoutBuilderService, $route, $location) {
                var workout = WorkoutBuilderService.startBuilding($route.current.params.id);
                if (!workout) {$location.path('builder/workouts')};
                return workout;
            }]
        }
    }).when('/builder/exercises/new', {
    	templateUrl: 'fitnes/views/workoutbuilder/exercise.html'
    }).when('/builder/exercises/:id', { 
    	templateUrl: 'fitnes/views/workoutbuilder/exercise.html'
    }).otherwise({
		redirectTo: '/start'
	});


	$sceDelegateProvider.resourceUrlWhitelist(['self','http://*.youtube.com/**']);

}]);