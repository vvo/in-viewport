describe('asking if a hidden div is in the viewport', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var visible = false;
  var test;

  beforeEach(function() {
    test = h.createTest({
      style: {
        display: 'none'
      }
    });
    h.insertTest(test);
    inViewport(test, function() {
      visible = true;
    });
  });

  // scrolling down and up, should call the callback
  // but element is not visible
  beforeEach(h.scroller(0, 100));
  beforeEach(h.scroller(0, 0));

  it('callback called', function() {
    assert(visible === false);
  });
});
