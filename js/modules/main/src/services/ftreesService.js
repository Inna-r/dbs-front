angular.module('main').
	factory('ftrees', ['$http', '$q', 'apiClient', function($http, $q, apiClient) {
		var in_progress = false,
			parser = new GedcomParser(),
			viewer = new GedcomViewer();

		var ftrees = {
			search: function(params) {
				if (!in_progress) { 
					in_progress = true;
					var deferred = $q.defer();

					$http.get(apiClient.urls.ftrees_search, {params: params}).
						success(function(individuals) {
							deferred.resolve(individuals);
						}).
						error(function() {
							deferred.reject();
						}).
						finally(function() {
							in_progress = false;
						});

					return deferred.promise;
				}
			},

			get_data: function(tree_number) {
				if (!in_progress) {
					in_progress = true;
					var self = this,
						deferred = $q.defer();

					this.get_meta(tree_number).
						then(function(tree_meta) {
							self.load(tree_meta.tree_file).
								then(function(tree_data) {
									deferred.resolve(tree_data);
								}, function() {
									deferred.reject();
								}).
								finally(function() {
									in_progress = false;
								});
						}, function() {
							deferred.reject();
							in_progress = false;
						});
					
					return deferred.promise;
				}
			},

			get_meta: function(tree_number) {	
				var deferred = $q.defer();

				$http.get(apiClient.urls.ftrees_get + '/' + tree_number).
					success(function(tree_data) {
						deferred.resolve(tree_data);
					}).
					error(function() {
						deferred.reject();
					});

				return deferred.promise;
			},

			load: function(gedcom_url) {
				var deferred = $q.defer();

				$http.get(gedcom_url).
					success(function(gedcom_text) {
						deferred.resolve(parser.parse(gedcom_text));
					}).
					error(function() {
						deferred.reject();
					});

				return deferred.promise;
			},

			parse_individual: function(individual) {
				var subset = this.get_individuals_subset('@' + individual.II + '@');

				var parsed_individual = {
					_id: individual._id,
					id: individual.II,
					name: individual.FN + ' ' + individual.LN,
					sex: individual.G,
					parent_family: subset.parent_family,
					family: subset.family
				};

				return parsed_individual;
			},

			get_individuals_subset: function(individual_id) {
				var family, parent_family,
					individual_data = this.get_individual_data(individual_id);

				if (individual_data.parent_data) {
					parent_family = this.parse_parent(individual_data.parent_data);
				}
				else {
					parent_family = {};
				}

				if (individual_data.family_data) {
					family = this.parse_family(individual_data.family_data, individual_id);
				}
				else {
					family = {};
				}

				return {
					parent_family: parent_family,
					family: family
				};
			},

			parse_parent: function(parent_data) {
				var parsed_parent = {
					husband: {},
					wife: {},
					children: []
				};
				
				if (parent_data.husb) {
					parsed_parent.husband.id = parent_data.husb.id;
					parsed_parent.husband.name = parent_data.husb.getValue('name');
					parsed_parent.husband.sex = parent_data.husb.getValue('sexe');	
				}
				if(parent_data.wife) {
					parsed_parent.wife.id = parent_data.wife.id;
					parsed_parent.wife.name = parent_data.wife.getValue('name');
					parsed_parent.wife.sex = parent_data.wife.getValue('sexe');
				}

				parent_data.childs.forEach(function(child) {
					var child_obj = {
						id: child.id,
						name: child.getValue('name'),
						sex: child.getValue('sexe')
					};
					parsed_parent.children.push(child_obj);
				});

				return parsed_parent;
			},

			parse_family: function(family_data, individual_id) {
				var self = this;
				var parsed_family = {
					spouse: {},
					children: []
				};
				var spouse;
				if (family_data.husb && family_data.husb.id === individual_id) {
					spouse = family_data.wife; 
				}
				else if (family_data.wife && family_data.wife.id === individual_id) {
					spouse = family_data.husb;
				}

				if (spouse) {
					parsed_family.spouse.id = spouse.id;
					parsed_family.spouse.name = spouse.getValue('name');
					parsed_family.spouse.sex = spouse.getValue('sexe');	
				}
				
				family_data.childs.forEach(function(child) {
					var child_obj = {
						id: child.id,
						name: child.getValue('name'),
						sex: child.getValue('sexe')
					};
					var child_family_data = self.get_individual_data(child.id).family_data;
					if (child_family_data) {
						child_obj.family = self.parse_family(child_family_data);
					}
					else {
						child_obj.family = {};
					}
					parsed_family.children.push(child_obj);
				});

				return parsed_family;
			},

			get_individual_data: function(individual_id) {
				var raw_data = parser.getData(individual_id);

				if (raw_data) {
					var parent_data = raw_data.getValue('familleParent'),
						family_data = raw_data.getValue('familles')[0];
				}
				
				return {
					parent_data: parent_data,
					family_data: family_data
				};
			} 
		}

		return ftrees;
	}]);