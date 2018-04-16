angular
    .module("ContactListApp")
    .controller("ListCtrl", function($scope,$http) {
        
        console.log("Controller initialized");
        
      
        	function refresh() {
			$http.get("api/v1/contacts")
				.then(function (response) {
					$scope.contacts = response.data;
					$scope.copyContacts = angular.copy($scope.contacts);
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorContactsModal').modal('show');
				});
		}
        $scope.addContact = function (){
            
            $http
                .post("/api/v1/contacts", $scope.newContact)
                .then(function (){
                    refresh();  
                });
        
        }
        
		// API functions

		$scope.getContacts = function () {
			$http.get("api/v1/contacts")
				.then(function (response) {
					$scope.contacts = response.data;
					$scope.copyContacts = angular.copy($scope.contacts);
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorContactsModal').modal('show');
				});
		}

		$scope.getContact = function () {
			$http.get("api/v1/contacts/"+$scope.currentUsername)
				.then(function (response) {
					$scope.contacts = [];
					$scope.contacts[0] = response.data;
					$scope.copyContacts = angular.copy($scope.contacts);
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorContactsModal').modal('show');
				});
		}

		$scope.addContact = function () {
			$http
				.post("/api/v1/contacts", $scope.newContact)
				.then(function () {
					refresh();
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorContactsModal').modal('show');
				});
		}

		$scope.modifyContact = function (username) {
			var contact = _.find(angular.copy($scope.contacts), {'USERNAME': username});
			delete contact.username;
			$http
				.put("/api/v1/contacts/"+username, contact)
				.then(function () {
					refresh();
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorContactsModal').modal('show');
				});
		}

		$scope.deleteContact = function (username) {
			var contact = _.find($scope.contacts, {'USERNAME': username});
			$http
				.delete("/api/v1/contacts/"+username)
				.then(function () {
					refresh();
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorContactsModal').modal('show');
				});
		}

		$scope.deleteAllContacts = function () {
			$http
				.delete("/api/v1/contacts")
				.then(function () {
					refresh();
				})
				.catch(function (error) {
					console.log(error);
					$scope.errorReturned = error;
					$('#errorContactsModal').modal('show');
				});
		}

        refresh();
        $scope.showEditFields = false;
		$scope.toggleEditFields = function () {
			$scope.showEditFields = !$scope.showEditFields;
		};
			$scope.hideEditFields = function () {
			$scope.showEditFields = false;
		};

  

        
    });
