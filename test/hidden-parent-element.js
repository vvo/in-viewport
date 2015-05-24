// this test checks that we have a
var supportsMutationObserver = typeof global.MutationObserver === 'function';
if (supportsMutationObserver) {
  describe('asking if a div inside a hidden div is in the viewport', function() {
    require('./fixtures/bootstrap.js');
    beforeEach(h.clean);
    afterEach(h.clean);

    var visible = false;
    var test;
    var parent;

    beforeEach(function() {
      parent = h.createTest({
        style: {
          display: 'none',
          width: '800px',
          height: '800px'
        }
      });
      test = h.createTest({
        style: {
          width: '500px',
          height: '500px'
        }
      });
      h.insertTest(test, parent);
      h.insertTest(parent);

      inViewport(test, function() {
        visible = true;
      });
    });

    // scrolling down and up, should not call the callback: parent is not visible
    beforeEach(h.scroller(0, 100));
    beforeEach(h.scroller(0, 0));

    it('callback not called', function() {
      assert(visible === false);
    });

    describe('when parent becomes visible, setInterval failsafe discovers the element', function(done) {
      beforeEach(function(done) {
        parent.style.display = 'block';
        setTimeout(done, 200);
      });

      it('callback called', function() {
        assert(visible === true);
      });
    });
  });
}
