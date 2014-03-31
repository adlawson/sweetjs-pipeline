MACRO_OP ?= >>
build_dir = "macro/pipeline.sjs"
src_dir = "src/pipeline.sjs"

all: macro test/macro

macro:
	@mkdir -p macro
	@cat ${src_dir} | sed 's/MACRO_OP/${MACRO_OP}/g' > ${build_dir}

test/macro:
	@mkdir -p test/macro test/build
	@cat test/${src_dir} | sed 's/MACRO_OP/${MACRO_OP}/g' > test/${build_dir}
