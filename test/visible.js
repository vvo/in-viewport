describe('asking if a visible div scrolled', function() {
  var playground = getPlayground();
  var scrolled = false;

  before(function() {
    insert(playground, '<div id=test></div>');
    hasScrolled(document.getElementById('test'), function() {
      scrolled = true;
    })
  });

  it('should have called my callback', function() {
    assert(scrolled);
  });

  after(clean);

});