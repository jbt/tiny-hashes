CLOSURE_WHITESPACE=closure --compilation_level WHITESPACE_ONLY
CLOSURE_SIMPLE=closure --compilation_level SIMPLE_OPTIMIZATIONS
CLOSURE_ADVANCED=closure --compilation_level ADVANCED_OPTIMIZATIONS

CLOSURE=$(CLOSURE_ADVANCED)

TARGETS=md5-min.js sha1-min.js sha256-min.js

all: $(TARGETS)

md5-min.js: md5.js
	$(CLOSURE) --js $< --js_output_file $@

sha1-min.js: sha1.js
	$(CLOSURE) --js $< --js_output_file $@

sha256-min.js: sha256.js
	$(CLOSURE) --js $< --js_output_file $@

test: $(TARGETS)
	./test.js

clean:
	rm $(TARGETS) 2> /dev/null || true
