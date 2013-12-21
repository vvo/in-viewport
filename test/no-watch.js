describe('without using callbacks', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  describe('when element is visible', function() {
    var test;

    beforeEach(function() {
      test = h.createTest();
      h.insertTest(test);
    });

    it('gives a positive result', function() {
      assert.strictEqual(inViewport(test), true);
    });
  });

  describe('when element is not visible', function() {
    var test;

    beforeEach(function() {
      test = h.createTest({
        style: {
          position: 'relative',
          top: '15000px'
        }
      });
      h.insertTest(test);
    });

    it('gives a negative result', function() {
      assert.strictEqual(inViewport(test), false);
    });
  });

  describe('when is not in the DOM', function() {
    var test;

    beforeEach(function() {
      test = h.createTest();
    });

    it('gives a negative result', function() {
      assert.strictEqual(inViewport(test), false);
    });
  });
});