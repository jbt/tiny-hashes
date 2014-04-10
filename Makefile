CLOSURE = java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS

TARGETS=md5-min.js sha1-min.js sha256-min.js

all: $(TARGETS)

md5-min.js: md5.js compiler.jar Makefile
	$(CLOSURE) < $< | tr -d '\n' > $@

sha1-min.js: sha1.js compiler.jar Makefile
	$(CLOSURE) < $< | tr -d '\n' > $@

sha256-min.js: sha256.js compiler.jar Makefile
	$(CLOSURE) < $< | tr -d '\n' > $@

compiler.jar:
	wget -O- http://dl.google.com/closure-compiler/compiler-latest.tar.gz | tar -xz compiler.jar

test: $(TARGETS)
	./test.js

clean:
	@rm -f $(TARGETS)
