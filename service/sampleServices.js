module.exports = (sampleRepository) => {
  // Have multiple functions separate by , after }
  return {

    someFunc: (input) => {
      sampleRepository.someOtherFunc(input) // <-- Passing the input from the routes throguh service to the repository
    }

  }
}