/*
 * This file is part of pipeline.sjs
 *
 * Copyright (c) 2014 Andrew Lawson <http://adlawson.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see  https://github.com/adlawson/pipeline.sjs/blob/master/LICENSE
 * @link https://github.com/adlawson/pipeline.sjs
 */
let (MACRO_OP) = macro {

    case infix { $l:expr | _ $r($args (,) ...) } => {
        var referenced = false;
        var args = (function (list, refs) {
            var result = [];
            var length = list.length >>> 0;
            for (var i = 0; i < length; i++) {
                var item = list[i];
                if ('MACRO_REF' === item.token.value) {
                    referenced = true;
                    result.push.apply(result, refs);
                } else {
                    result.push(item);
                }
            }

            return result;
        })(#{$args...}, #{$l});

        letstx $args... = args;
        return referenced ? #{$r($args (,) ...)} : #{$r($args (,) ..., $l)};
    }

    case infix { $l:expr | _ $r } => {
        return #{$r($l)};
    }

}

export MACRO_OP
