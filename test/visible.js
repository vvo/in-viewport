describe('asking if a visible div scrolled', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var scrolled = false;
  var test;

  beforeEach(function(done) {
    test = h.createTest();
    h.insertTest(test);
    inViewport(test, function() {
      scrolled = true;
      done();
    });
  });

  it('callback called', function() {
    assert(scrolled === true);
  });
});