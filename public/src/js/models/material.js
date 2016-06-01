angular
  .module('SustainableApp')
  .factory('Material', Material);

Material.$inject = ['$resource', 'API'];
function Material($resource, API){

  return $resource(
    API+'/materials/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'search':    {
                     method: 'POST',
                     url: API + "/materials/search"
                   }
    }
  );
}
