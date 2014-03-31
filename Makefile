MACRO_OP ?= >>
MACRO_REF ?= \&
build_dir = "macro/pipeline.sjs"
src_dir = "src/pipeline.sjs"

all: macro test/macro

macro:
	@mkdir -p macro
	@cat ${src_dir} | sed -e 's/MACRO_OP/${MACRO_OP}/g' -e 's/MACRO_REF/${MACRO_REF}/g' > ${build_dir}

test/macro:
	@mkdir -p test/macro test/build
	@cat test/${src_dir} | sed -e 's/MACRO_OP/${MACRO_OP}/g' -e 's/MACRO_REF/${MACRO_REF}/g' > test/${build_dir}
