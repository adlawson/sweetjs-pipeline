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

    rule infix { $l:expr | $r($args...) } => {
        $r($args..., $l)
    }

    rule infix { $l:expr | $r } => {
        $r($l)
    }

}

export MACRO_OP
