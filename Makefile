CLOSURE_COMPILER = google-closure-compiler-js
TARGETS= google-closure md5-min sha1-min sha256-min
TARGET_FILES = md5-min.js sha1-min.js sha256-min.js

all: $(TARGETS)

google-closure:
	which google-closure-compiler-js 2>&1 1>/dev/null || npm install -g google-closure-compiler-js

md5-min: md5.js Makefile
	$(CLOSURE_COMPILER) md5.js > md5-min.js

sha1-min: sha1.js Makefile
	$(CLOSURE_COMPILER) sha1.js > sha1-min.js

sha256-min: sha256.js Makefile
	$(CLOSURE_COMPILER) sha256.js > sha256-min.js

test:
	./test.js

clean:
	@rm -f $(TARGET_FILES)
