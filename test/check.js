describe('when an element is detached', function() {
  var visible = false;
  var test = createTest();

  describe('and registered on body', function() {
    before(function() {
      inViewport(test, function() {
        visible = true;
      });
    });

    // image added asynchronously since detached
    before(wait(5));

    it('callback not called', function() {
      assert(visible === false);
    });

    describe('when we insert it into DOM', function() {
      before(function() {
        insertTest(test);
      });

      it('callback still not called', function() {
        // because no event triggered a watch
        assert(visible === false);
      });

    });

    describe('check method', function() {
      before(function() {
        inViewport.check();
      });

      // checkImages is asynchronous

      it('should force inViewport to check for elt visibility', function() {
        assert(visible === true);
      })

    })

  })

  after(clean(test));
});