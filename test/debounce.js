describe('usage with high debounce', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var scrolled = false;
  var test;

  beforeEach(function(done) {
    test = h.createTest();
    h.insertTest(test);
    inViewport(
      test,
      {
        debounce: 500
      },
      function() {
        scrolled = true;
        done();
      }
    );
  });

  it('callback called', function() {
    assert(scrolled === true);
  });
});
