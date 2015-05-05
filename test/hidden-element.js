describe('asking if a visible div scrolled', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var visible = false;
  var test;

  beforeEach(function(done) {
    test = h.createTest({
      style: {
        display: 'none'
      }
    });
    h.insertTest(test);
    inViewport(test, function() {
      visible = true;
      done();
    });
  });

  it('callback called', function() {
    assert(visible === false);
  });
});