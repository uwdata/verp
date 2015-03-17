GENERATED_FILES = \
	chopper.js \
	chopper.min.js \
	bower.json \
	component.json 

all: $(GENERATED_FILES)

.PHONY: clean all test

test:
	@npm test

src/start.js: package.json bin/start
	bin/start > $@

chopper.js: $(shell node_modules/.bin/smash --ignore-missing --list src/chopper.js) package.json
	@rm -f $@
	node_modules/.bin/smash src/chopper.js | node_modules/.bin/uglifyjs - -b indent-level=2 -o $@
	@cp $@ ~/Projects/verp/app/scripts/lib/
	@chmod a-w $@

chopper.min.js: chopper.js bin/uglify
	@rm -f $@
	bin/uglify $< > $@


%.json: bin/% package.json
	@rm -f $@
	bin/$* > $@
	@chmod a-w $@

publish:
	npm publish
	meteor publish && rm -- .versions


%.json: bin/% package.json
	@rm -f $@
	bin/$* > $@
	@chmod a-w $@


clean:
	rm -f -- $(GENERATED_FILES)
