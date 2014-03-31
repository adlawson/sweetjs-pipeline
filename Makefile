MACRO_OP ?= >>
build_dir = "macro/pipeline.sjs"
src_dir = "src/pipeline.sjs"

all: macro/pipeline.sjs

macro/pipeline.sjs:
	@cat ${src_dir} | sed 's/MACRO_OP/${MACRO_OP}/g' > ${build_dir}
	@cat test/${src_dir} | sed 's/MACRO_OP/${MACRO_OP}/g' > test/${build_dir}
