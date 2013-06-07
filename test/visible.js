describe('asking if a visible div scrolled', function() {
  var scrolled = false;
  var test = createTest();

  before(function() {
    insertTest(test);
    inViewport(test, function() {
      scrolled = true;
    });
  });

  it('callback called', function() {
    assert(scrolled === true);
  });

  after(clean(test));
});