var assert = require('chai').assert;
var stub = require('sinon').stub;
var foo, bar, baz;

suite('pipeline MACRO_OP', function () {

    setup(function () {
        foo = stub();
        bar = stub();
        baz = stub();
    });

    test('`123 MACRO_OP foo` is `foo(123)`', function () {
        123 MACRO_OP foo;

        assert.isTrue(foo.calledOnce);
        assert.isTrue(foo.calledWith(123));
    });

    test('`foo MACRO_OP bar` is `bar(foo)`', function () {
        foo MACRO_OP bar;

        assert.isTrue(0 === foo.callCount);
        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith(foo));
    });

    test('`123 MACRO_OP foo MACRO_OP bar MACRO_OP baz` is `baz(bar(foo(123)))`', function () {
        foo.onCall(0).returns('foo123');
        bar.onCall(0).returns('barfoo123');

        123 MACRO_OP foo MACRO_OP bar MACRO_OP baz;

        assert.isTrue(foo.calledOnce);
        assert.isTrue(foo.calledWith(123));
        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith('foo123'));
        assert.isTrue(bar.calledAfter(foo));
        assert.isTrue(baz.calledOnce);
        assert.isTrue(baz.calledWith('barfoo123'));
        assert.isTrue(baz.calledAfter(bar));
    });

    test('`123 MACRO_OP foo MACRO_OP bar MACRO_OP baz` over multiple lines is `baz(bar(foo(123)))`', function () {
        foo.onCall(0).returns('foo123');
        bar.onCall(0).returns('barfoo123');

        123
        MACRO_OP foo
        MACRO_OP bar
        MACRO_OP baz;

        assert.isTrue(foo.calledOnce);
        assert.isTrue(foo.calledWith(123));
        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith('foo123'));
        assert.isTrue(bar.calledAfter(foo));
        assert.isTrue(baz.calledOnce);
        assert.isTrue(baz.calledWith('barfoo123'));
        assert.isTrue(baz.calledAfter(bar));
    });

    test('`foo MACRO_OP bar MACRO_OP baz(123)` is `baz(123, bar(foo))`', function () {
        bar.onCall(0).returns('barfoo');

        foo MACRO_OP bar MACRO_OP baz(123);

        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith(foo));
        assert.isTrue(baz.calledOnce);
        assert.isTrue(baz.calledWith(123, 'barfoo'));
        assert.isTrue(baz.calledAfter(bar));
    });

    test('`foo MACRO_OP bar(1, 2, 3) MACRO_OP baz` is `baz(bar(1, 2, 3, foo))`', function () {
        bar.onCall(0).returns('bar123foo');

        foo MACRO_OP bar(1, 2, 3) MACRO_OP baz;

        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith(1, 2, 3, foo));
        assert.isTrue(baz.calledOnce);
        assert.isTrue(baz.calledWith('bar123foo'));
        assert.isTrue(baz.calledAfter(bar));
    });

});

suite('reference MACRO_REF', function () {

    setup(function () {
        foo = stub();
        bar = stub();
        baz = stub();
    });

    test('`foo MACRO_OP bar(MACRO_REF, 123)` is `bar(foo, 123)`', function () {
        foo MACRO_OP bar(MACRO_REF, 123);

        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith(foo, 123));
    });

    test('`foo MACRO_OP bar(MACRO_REF, 1, 2, 3)` is `bar(foo, 1, 2, 3)`', function () {
        foo MACRO_OP bar(MACRO_REF, 1, 2, 3);

        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith(foo, 1, 2, 3));
    });

    test('`foo MACRO_OP bar(1, MACRO_REF, 2, 3)` is `bar(1, foo, 2, 3)`', function () {
        foo MACRO_OP bar(1, MACRO_REF, 2, 3);

        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith(1, foo, 2, 3));
    });

    test('`foo MACRO_OP bar(1, 2, MACRO_REF, 3)` is `bar(1, 2, foo, 3)`', function () {
        foo MACRO_OP bar(1, 2, MACRO_REF, 3);

        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith(1, 2, foo, 3));
    });

    test('`foo MACRO_OP bar(1, 2, 3, MACRO_REF)` is `bar(1, 2, 3, foo)`', function () {
        foo MACRO_OP bar(1, 2, 3, MACRO_REF);

        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith(1, 2, 3, foo));
    });

});
