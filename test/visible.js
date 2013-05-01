describe('asking if a visible div scrolled', function() {
  var playground = getPlayground();
  var scrolled = false;

  before(function() {
    insert(playground, '<div id=testVisible>am I visible or what?</div>');
    hasScrolled(document.getElementById('testVisible'), function() {
      scrolled = true;
    });
  });

  it('callback called', function() {
    assert(scrolled === true);
  });

  after(clean);
});