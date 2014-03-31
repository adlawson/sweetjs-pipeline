var assert = require('chai').assert;
var stub = require('sinon').stub;

suite('pipeline MACRO_OP', function () {

    var foo, bar, baz;

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

    test('`foo MACRO_OP bar(&, 123)` is `bar(foo, 123)`', function () {
        foo MACRO_OP bar(&, 123);

        assert.isTrue(bar.calledOnce);
        assert.isTrue(bar.calledWith(foo, 123));
    });

});
